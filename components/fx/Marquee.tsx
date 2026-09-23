import { cn } from '../../lib/utils';

export default function Marquee({
  children,
  className,
  innerClassName,
  reverse = false,
  fast = false,
  pauseOnHover = true
}: {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  reverse?: boolean;
  fast?: boolean;
  pauseOnHover?: boolean;
}) {
  const anim = reverse ? 'animate-marquee-reverse' : fast ? 'animate-marquee-fast' : 'animate-marquee';
  return (
    <div className={cn('relative flex w-full overflow-hidden', pauseOnHover && 'pause-on-hover', className)}>
      <div className={cn('flex w-max shrink-0 items-center', anim, innerClassName)}>
        {children}
        {children}
      </div>
    </div>
  );
}
