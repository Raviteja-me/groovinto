export const siteConfig = {
  name: 'GROOVINTO',
  tagline: 'Guide. Gain. Grow.',
  url: 'https://www.groovinto.com',
  email: 'shenoy@groovinto.com',
  phone: '+91 87224 46168',
  phoneHref: 'tel:+918722446168',
  whatsapp: 'https://wa.me/918722446168',
  founder: 'Aamith Shenoy',
  location: 'Bengaluru, India',
  hours: 'Mon-Sat, 9am - 7pm IST',
  socials: [
    { label: 'Instagram', href: 'https://instagram.com/groovinto' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/groovinto' },
    { label: 'YouTube', href: 'https://youtube.com/@groovinto' },
    { label: 'X', href: 'https://twitter.com/groovinto' }
  ]
};

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/portfolio' },
  { label: 'Course', href: '/register' },
  { label: 'Contact', href: '/contact' }
];

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  deliverables: string[];
  icon: 'bot' | 'pen' | 'clapper' | 'compass' | 'megaphone' | 'trend' | 'graduation';
  accent: 'brand' | 'mint' | 'amber';
};

export const services: Service[] = [
  {
    slug: 'ai-content-production',
    title: 'AI Content Production',
    short: 'Next-gen AI videos, micro-dramas and visual stories engineered for engagement.',
    description:
      'We run an AI-native production pipeline that turns one idea into dozens of platform-ready assets. Generative video, voice, motion and editing, directed by humans who understand story.',
    deliverables: ['AI short films & micro-dramas', 'Product & explainer videos', 'AI avatars & voice', 'Weekly content drops'],
    icon: 'bot',
    accent: 'brand'
  },
  {
    slug: 'brand-content-creation',
    title: 'Brand Content Creation',
    short: 'Strategic content systems that build identity and visibility across every platform.',
    description:
      'Content that compounds. We design a content system for your brand: pillars, formats, cadence and distribution, then produce it week after week.',
    deliverables: ['Content strategy & calendars', 'Reels, Shorts & carousels', 'Founder-led content', 'Community playbooks'],
    icon: 'pen',
    accent: 'mint'
  },
  {
    slug: 'commercial-advertising-production',
    title: 'Commercial & Ad Production',
    short: 'Concept-driven commercials and cinematic brand films that tell powerful stories.',
    description:
      'From script to screen. Concept, casting, shoot, post and delivery for brand films, TVCs and digital ads that people actually remember.',
    deliverables: ['Brand films & TVCs', 'Product shoots', 'Performance ad creatives', 'Post-production & VFX'],
    icon: 'clapper',
    accent: 'amber'
  },
  {
    slug: 'branding-positioning',
    title: 'Branding & Positioning',
    short: 'Define the promise, clarify the message and own your category with confidence.',
    description:
      'A sharp position beats a loud budget. We help you find the space you can own, then build the identity, voice and story to hold it.',
    deliverables: ['Positioning & messaging', 'Visual identity systems', 'Brand voice & guidelines', 'Launch narratives'],
    icon: 'compass',
    accent: 'brand'
  },
  {
    slug: 'digital-advertising',
    title: 'Digital Advertising',
    short: 'Targeted campaigns that reach the right audience and maximise brand visibility.',
    description:
      'Meta, Google, YouTube and LinkedIn campaigns built on creative testing and clean measurement, so every rupee has a job.',
    deliverables: ['Paid social & search', 'Creative testing sprints', 'Funnel & landing pages', 'Attribution & reporting'],
    icon: 'megaphone',
    accent: 'mint'
  },
  {
    slug: 'performance-marketing',
    title: 'Performance Marketing',
    short: 'Data-driven growth with measurable outcomes, lead velocity and revenue impact.',
    description:
      'Growth loops, not one-off campaigns. We connect creative, media and conversion into a system that gets cheaper as it scales.',
    deliverables: ['Growth strategy & CRO', 'SEO & content marketing', 'Lifecycle & email', 'Dashboards & analytics'],
    icon: 'trend',
    accent: 'amber'
  },
  {
    slug: 'ai-creator-training',
    title: 'AI & Creator Skill Training',
    short: 'Hands-on programs for AI content creation, modern tools and creative production.',
    description:
      'Learn the exact workflows we use in the studio. Live cohorts, real projects and a community of creators building with AI.',
    deliverables: ['AI Video Creation Course', 'Team workshops', 'Creator bootcamps', 'Custom corporate training'],
    icon: 'graduation',
    accent: 'brand'
  }
];

export const stats = [
  { value: 40, suffix: '+', label: 'Brands partnered' },
  { value: 120, suffix: 'M+', label: 'Content views generated' },
  { value: 3.2, suffix: 'x', label: 'Average engagement lift', decimals: 1 },
  { value: 48, suffix: '%', label: 'Better lead quality' }
];

export const process = [
  {
    step: '01',
    title: 'Guide',
    subtitle: 'Strategy & positioning',
    description:
      'We start with the truth about your brand, audience and category. Then we map the story, channels and content system that will move people.'
  },
  {
    step: '02',
    title: 'Gain',
    subtitle: 'Production & launch',
    description:
      'Our AI-first studio ships fast: films, reels, ads and campaigns built for each platform, tested in market within weeks, not quarters.'
  },
  {
    step: '03',
    title: 'Grow',
    subtitle: 'Performance & scale',
    description:
      'Creative meets data. We double down on what works, cut what does not, and turn attention into revenue with measurable loops.'
  }
];

export type PortfolioItem = {
  title: string;
  client: string;
  category: 'Marketing campaigns' | 'Video ads' | 'Instagram reels' | 'Brand shoots';
  image: string;
  summary: string;
  result: string;
  tags: string[];
};

export const portfolioItems: PortfolioItem[] = [
  {
    title: 'Metapulse AI Launch',
    client: 'MetaPulse AI',
    category: 'Marketing campaigns',
    image: 'https://images.unsplash.com/photo-1522199777470-0a64f7f538f9?auto=format&fit=crop&w=1600&q=80',
    summary: 'Full-funnel go-to-market with AI-personalised ads and motion design.',
    result: '2.4x pipeline in 90 days',
    tags: ['AI', 'Product Launch', 'Paid Media']
  },
  {
    title: 'Nova Bank Rebrand',
    client: 'Nova Bank',
    category: 'Brand shoots',
    image: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=80',
    summary: 'Identity, campaign film and out-of-home takeovers for a digital bank.',
    result: '+61% brand recall',
    tags: ['Branding', 'Video', 'OOH']
  },
  {
    title: 'FlowFit Creator Push',
    client: 'FlowFit',
    category: 'Instagram reels',
    image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1600&q=80',
    summary: 'Creator-led UGC series across Reels and Shorts.',
    result: '3.2x engagement',
    tags: ['UGC', 'Social', 'Reels']
  },
  {
    title: 'Orbit SaaS Demand Gen',
    client: 'Orbit SaaS',
    category: 'Video ads',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80',
    summary: 'Segmented video ads with AI voice for four buyer personas.',
    result: '+48% MQL quality',
    tags: ['B2B', 'ABM', 'Video']
  },
  {
    title: 'Dr Talkies Channel Growth',
    client: 'Dr Talkies',
    category: 'Instagram reels',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1600&q=80',
    summary: 'Entertainment-first health content that converts across channels.',
    result: '1M+ organic reach',
    tags: ['Content', 'YouTube', 'Reels']
  },
  {
    title: 'LazyJobSeeker Story Reset',
    client: 'lazyjobseeker.com',
    category: 'Marketing campaigns',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1600&q=80',
    summary: 'Narrative rebuild plus AI-led content that doubled signups.',
    result: '2x signups, same spend',
    tags: ['Positioning', 'AI Content', 'Growth']
  }
];

export const portfolioFilters = ['All', 'Marketing campaigns', 'Video ads', 'Instagram reels', 'Brand shoots'] as const;

export const testimonials = [
  {
    name: 'Beere Ravi Teja',
    role: 'Founder, lazyjobseeker.com',
    quote: 'GROOVINTO rebuilt our narrative and shipped AI-led content that doubled signups without increasing ad spend.'
  },
  {
    name: 'Guru Murthy',
    role: 'CEO, OraiYan Groups',
    quote: 'From brand systems to performance, their team moves like an in-house squad. Fast, precise and obsessively measured.'
  },
  {
    name: 'Ram Gowda',
    role: 'CEO, Dr Talkies',
    quote: 'They blended storytelling with analytics, giving us campaigns that entertained and converted across every channel.'
  }
];

export const clients = ['lazyjobseeker.com', 'OraiYan Groups', 'Dr Talkies', 'MetaPulse AI', 'Nova Bank', 'FlowFit', 'Orbit SaaS', 'Prime City'];

export const values = [
  {
    title: 'Story first, always',
    description: 'Tools change every month. A story people care about does not. We start there.'
  },
  {
    title: 'AI-native, human-directed',
    description: 'We use AI to move ten times faster, and taste to make sure it is worth watching.'
  },
  {
    title: 'Measured, not guessed',
    description: 'Every campaign ships with a scoreboard. If it cannot be measured, we rethink it.'
  },
  {
    title: 'Ship weekly',
    description: 'Momentum beats perfection. We ship, learn and improve in weekly cycles.'
  }
];

export const milestones = [
  { year: '2021', title: 'Founded in Bengaluru', text: 'Aamith Shenoy starts GROOVINTO as a content studio for ambitious founders.' },
  { year: '2022', title: 'First brand films', text: 'Commercial production wing launches with cinematic brand films and TVCs.' },
  { year: '2023', title: 'Performance pod', text: 'Paid media and growth team joins so creative and data live under one roof.' },
  { year: '2024', title: 'AI-native studio', text: 'Generative video, voice and motion enter the pipeline. Output triples.' },
  { year: '2025', title: 'GROOVINTO Academy', text: 'The AI Video Creation Course opens to creators and teams across India.' }
];
