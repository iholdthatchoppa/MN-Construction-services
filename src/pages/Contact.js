import ContactForm from '../components/ContactForm';

const Contact = () => {
  return (
    <section style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Contact Us</h1>
      <p>We'd love to hear from you. Please fill out the form below to get in touch with us.</p>
      <ContactForm />
    </section>
  );
};

export default Contact;
