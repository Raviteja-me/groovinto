'use client';

import { useEffect, useState } from 'react';

export default function FloatingWhatsApp() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 200);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <a
      href="https://wa.me/910000000000"
      className={`fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-brand text-white shadow-glow transition hover:scale-110 ${
        show ? 'opacity-100' : 'opacity-0'
      }`}
      aria-label="WhatsApp chat"
    >
      ✦
    </a>
  );
}
