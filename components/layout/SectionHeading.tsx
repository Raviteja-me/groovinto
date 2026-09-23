import TextReveal from '../fx/TextReveal';
import Reveal from '../fx/Reveal';
import { cn } from '../../lib/utils';

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
  titleClassName
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  titleClassName?: string;
}) {
  return (
    <div className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
      <Reveal>
        <p className={cn('eyebrow', align === 'center' && 'justify-center')}>{eyebrow}</p>
      </Reveal>
      <TextReveal
        as="h2"
        text={title}
        className={cn('mt-4 text-display-md font-bold text-cream', align === 'center' && 'justify-center', titleClassName)}
      />
      {description && (
        <Reveal delay={0.2}>
          <p className="mt-5 text-base text-muted sm:text-lg">{description}</p>
        </Reveal>
      )}
    </div>
  );
}
