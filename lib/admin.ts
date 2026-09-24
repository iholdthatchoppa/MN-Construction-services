// Google accounts allowed into /admin.
// Keep in sync with isAdmin() in firestore.rules — the rules are what actually enforce access.
export const ADMIN_EMAILS = ['abtin.norizadeh@gmail.com'];

export function isAdminEmail(email: string | null | undefined) {
  return !!email && ADMIN_EMAILS.includes(email.toLowerCase());
}
