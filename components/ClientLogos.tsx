'use client';

import React from 'react';

// Premium SVG Logo Components
const LazyJobSeekerLogo = () => (
  <svg className="h-8 w-8 text-neutral-400 group-hover:text-purple transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    <path d="M12 12v4" />
    <path d="M9 14h6" />
  </svg>
);

const OraiYanLogo = () => (
  <svg className="h-8 w-8 text-neutral-400 group-hover:text-neon transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="4" strokeDasharray="3 3" />
    <path d="M12 2v20M2 12h20" strokeWidth="1" opacity="0.5" />
  </svg>
);

const DrTalkiesLogo = () => (
  <svg className="h-8 w-8 text-neutral-400 group-hover:text-accent transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    <path d="M10 8h4M12 6v4" strokeWidth="2.5" />
  </svg>
);

const MetaPulseLogo = () => (
  <svg className="h-8 w-8 text-neutral-400 group-hover:text-purple transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    <circle cx="12" cy="12" r="3" fill="currentColor" className="opacity-20" />
  </svg>
);

const NovaBankLogo = () => (
  <svg className="h-8 w-8 text-neutral-400 group-hover:text-neon transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2L2 12h3v8h14v-8h3L12 2z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 20V12h6v8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const FlowFitLogo = () => (
  <svg className="h-8 w-8 text-neutral-400 group-hover:text-accent transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 15c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5z" />
    <path d="M12 9v6M9 12h6" />
  </svg>
);

const OrbitSaaSLogo = () => (
  <svg className="h-8 w-8 text-neutral-400 group-hover:text-purple transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-30 12 12)" />
    <circle cx="12" cy="12" r="3" fill="currentColor" />
    <circle cx="6" cy="9" r="1.5" fill="currentColor" />
  </svg>
);

const PrimeCityLogo = () => (
  <svg className="h-8 w-8 text-neutral-400 group-hover:text-neon transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21h18M5 21V8l7-4 7 4v13M9 9h0M15 9h0M9 13h0M15 13h0M9 17h0M15 17h0" />
  </svg>
);

const clients = [
  { name: 'lazyjobseeker.com', icon: <LazyJobSeekerLogo /> },
  { name: 'OraiYan Groups', icon: <OraiYanLogo /> },
  { name: 'Dr Talkies', icon: <DrTalkiesLogo /> },
  { name: 'MetaPulse AI', icon: <MetaPulseLogo /> },
  { name: 'Nova Bank', icon: <NovaBankLogo /> },
  { name: 'FlowFit', icon: <FlowFitLogo /> },
  { name: 'Orbit SaaS', icon: <OrbitSaaSLogo /> },
  { name: 'Prime City', icon: <PrimeCityLogo /> }
];

export default function ClientLogos() {
  return (
    <section className="py-20 border-y border-white/5 bg-midnight/40 overflow-hidden relative">
      {/* Visual Accent */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-purple/20 to-transparent" />
      
      <div className="mx-auto max-w-6xl px-6 mb-12 text-center space-y-3">
        <p className="text-xs uppercase tracking-[0.3em] text-neutral font-semibold">
          Trusted Partners & Clients
        </p>
        <h2 className="text-3xl font-bold text-light tracking-tight sm:text-4xl">
          Powering growth for modern brands
        </h2>
        <p className="text-sm text-neutral max-w-2xl mx-auto">
          We collaborate with visionaries, creators, and high-growth companies to shape the future of digital content.
        </p>
      </div>

      {/* Marquee Slider Wrapper */}
      <div className="relative w-full overflow-hidden py-4 select-none">
        {/* Soft edge gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-midnight via-midnight/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-midnight via-midnight/80 to-transparent z-10 pointer-events-none" />

        {/* Scrolling flex row */}
        <div className="pause-hover flex w-max gap-0">
          {/* Logo Group 1 */}
          <div className="flex shrink-0 items-center justify-around gap-16 md:gap-24 px-8 md:px-12">
            {clients.map((client) => (
              <div
                key={client.name}
                className="group flex items-center gap-3 cursor-pointer"
              >
                {client.icon}
                <span className="text-neutral font-medium tracking-wide text-sm sm:text-base group-hover:text-light transition-colors duration-300">
                  {client.name}
                </span>
              </div>
            ))}
          </div>

          {/* Logo Group 2 (Duplicate for infinite seamless scroll) */}
          <div className="flex shrink-0 items-center justify-around gap-16 md:gap-24 px-8 md:px-12" aria-hidden="true">
            {clients.map((client) => (
              <div
                key={`${client.name}-dup`}
                className="group flex items-center gap-3 cursor-pointer"
              >
                {client.icon}
                <span className="text-neutral font-medium tracking-wide text-sm sm:text-base group-hover:text-light transition-colors duration-300">
                  {client.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
