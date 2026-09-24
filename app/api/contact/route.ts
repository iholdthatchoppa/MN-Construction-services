import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { COLLECTIONS } from '@/lib/content';
import { EMAIL } from '@/lib/data';

const resend = new Resend(process.env.RESEND_API_KEY);

// Must match isValidNewLead() in firestore.rules
const LIMITS = { name: 100, email: 200, phone: 40, service: 60, message: 5000 };

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const raw = body as {
      name: string;
      phone?: string;
      email: string;
      service?: string;
      message: string;
    };
    const name = raw.name?.trim() ?? '';
    const email = raw.email?.trim() ?? '';
    const phone = raw.phone?.trim() ?? '';
    const service = raw.service?.trim() ?? '';
    const message = raw.message?.trim() ?? '';

    // Basic server-side validation
    if (!name) return NextResponse.json({ error: 'Name is required.' }, { status: 400 });
    if (!email || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) return NextResponse.json({ error: 'Valid email is required.' }, { status: 400 });
    if (!message) return NextResponse.json({ error: 'Message is required.' }, { status: 400 });
    if (
      name.length > LIMITS.name || email.length > LIMITS.email || phone.length > LIMITS.phone ||
      service.length > LIMITS.service || message.length > LIMITS.message
    ) {
      return NextResponse.json({ error: 'One of the fields is too long.' }, { status: 400 });
    }

    // Save to Firestore (shown in /admin) and email the team. Either one succeeding is enough
    // for the lead not to be lost, so only fail the request if both do.
    const [saved, emailed] = await Promise.allSettled([
      addDoc(collection(db, COLLECTIONS.leads), {
        name,
        email,
        ...(phone && { phone }),
        ...(service && { service }),
        message,
        status: 'new',
        createdAt: serverTimestamp(),
      }),
      sendEmail({ name, email, phone, service, message }),
    ]);

    if (saved.status === 'rejected') console.error('[contact/route] Firestore save failed:', saved.reason);
    if (emailed.status === 'rejected') console.error('[contact/route] Email failed:', emailed.reason);
    if (saved.status === 'rejected' && emailed.status === 'rejected') throw new Error('Lead not delivered');

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[contact/route] Error:', err);
    return NextResponse.json({ error: 'Failed to send message. Please try again.' }, { status: 500 });
  }
}

async function sendEmail(lead: { name: string; email: string; phone: string; service: string; message: string }) {
  const name = escapeHtml(lead.name);
  const email = escapeHtml(lead.email);
  const phone = escapeHtml(lead.phone);
  const service = escapeHtml(lead.service);
  const message = escapeHtml(lead.message);

  const { error } = await resend.emails.send({
    from: 'MN Construction Website <onboarding@resend.dev>',
    to: [EMAIL],
    replyTo: lead.email,
    subject: `New Quote Request from ${lead.name}${lead.service ? ` — ${lead.service}` : ''}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #5a6347; margin-bottom: 24px;">New Quote Request</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #a09880; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; width: 130px;">Name</td>
            <td style="padding: 8px 0; color: #1c1c1a; font-weight: 600;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #a09880; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Email</td>
            <td style="padding: 8px 0; color: #1c1c1a;"><a href="mailto:${email}" style="color: #5a6347;">${email}</a></td>
          </tr>
          ${phone ? `<tr>
            <td style="padding: 8px 0; color: #a09880; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Phone</td>
            <td style="padding: 8px 0; color: #1c1c1a;"><a href="tel:${phone}" style="color: #5a6347;">${phone}</a></td>
          </tr>` : ''}
          ${service ? `<tr>
            <td style="padding: 8px 0; color: #a09880; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Service</td>
            <td style="padding: 8px 0; color: #1c1c1a;">${service}</td>
          </tr>` : ''}
        </table>
        <div style="margin-top: 24px; padding: 20px; background: #f5f2ed; border-radius: 8px;">
          <p style="color: #a09880; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 8px;">Message</p>
          <p style="color: #1c1c1a; margin: 0; line-height: 1.7;">${message.replace(/\n/g, '<br/>')}</p>
        </div>
        <p style="margin-top: 24px; color: #a09880; font-size: 12px;">
          Sent via mnconstructionservicesllc.com contact form
        </p>
      </div>
    `,
  });
  if (error) throw error;
}
