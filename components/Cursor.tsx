'use client';

import { useEffect } from 'react';

export default function Cursor() {
  useEffect(() => {
    const dot = document.querySelector<HTMLElement>('.cursor-dot');
    const outline = document.querySelector<HTMLElement>('.cursor-outline');
    if (!dot || !outline) return;

    const move = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      dot.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
      outline.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
    };
    const hide = () => {
      dot.style.opacity = '0';
      outline.style.opacity = '0';
    };
    const show = () => {
      dot.style.opacity = '1';
      outline.style.opacity = '1';
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseleave', hide);
    window.addEventListener('mouseenter', show);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseleave', hide);
      window.removeEventListener('mouseenter', show);
    };
  }, []);

  return null;
}
