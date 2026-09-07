import ContactForm from '../../components/ContactForm';

export const metadata = {
  title: 'Register - AI Video Creation Course'
};

export default function RegisterPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold">AI Video Creation Course — Registration</h1>
        <p className="mt-2 text-neutral">Sign up to reserve your spot — limited seats available.</p>
      </header>

      <section className="bg-gradient-to-br from-white/3 to-white/5 rounded-2xl p-8 shadow-lg">
        <ContactForm />
      </section>
    </main>
  );
}
