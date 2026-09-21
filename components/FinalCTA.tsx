import Link from 'next/link';

export default function FinalCTA() {
  return (
    <section className="section-padding">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-brand p-[1px] shadow-glow">
        <div className="glass rounded-3xl px-10 py-12 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-neutral">Let&apos;s build</p>
          <h2 className="mt-4 text-3xl font-semibold text-light sm:text-4xl">Ready To Grow Your Brand?</h2>
          <p className="mt-4 text-neutral">
            We blend AI, storytelling, and performance to create unfair advantages for brands.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link
              href="/contact"
              className="button-glow rounded-full bg-midnight px-6 py-3 text-sm font-semibold text-light shadow-glow transition hover:scale-105"
            >
              Start Your Project
            </Link>
            <a
              href="https://wa.me/910000000000"
              className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-light transition hover:scale-105"
            >
              WhatsApp Us
            </a>
            {/* Razorpay Checkout Button */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <div>
              {/* Importing dynamically to keep server/client boundaries clear */}
              <script type="module">
                // Placeholder to ensure CheckoutButton is included by bundler
              </script>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
