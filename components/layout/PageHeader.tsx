'use client';

import { motion } from 'framer-motion';
import TextReveal from '../fx/TextReveal';
import { EASE, cn } from '../../lib/utils';

export default function PageHeader({
  eyebrow,
  title,
  description,
  children,
  align = 'left',
  className
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
}) {
  return (
    <section className={cn('relative overflow-hidden pt-36 pb-16 sm:pt-44 sm:pb-24', className)}>
      <div className="glow-orb -top-32 right-[-10%] h-[520px] w-[520px] bg-brand/20" />
      <div className="glow-orb left-[-10%] top-40 h-[380px] w-[380px] bg-mint/10" />
      <div className="absolute inset-0 grid-bg opacity-[0.35] mask-fade-b" />
      <div className={cn('container-x relative', align === 'center' && 'text-center')}>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className={cn('eyebrow', align === 'center' && 'justify-center')}
        >
          {eyebrow}
        </motion.p>
        <TextReveal
          as="h1"
          text={title}
          animateOnMount
          delay={0.1}
          className={cn('mt-5 max-w-4xl text-display-lg font-bold text-cream', align === 'center' && 'mx-auto justify-center')}
        />
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.5 }}
            className={cn('mt-6 max-w-2xl text-lg text-muted', align === 'center' && 'mx-auto')}
          >
            {description}
          </motion.p>
        )}
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.65 }}
            className={cn('mt-8', align === 'center' && 'flex justify-center')}
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
