export const COURSE = {
  id: 'ai-video-creation',
  name: 'AI Video Creation Course',
  headline: 'Make AI videos that people actually watch.',
  subheadline:
    'A hands-on, live program from the GROOVINTO studio. Learn the exact tools, prompts and workflows we use to produce scroll-stopping AI videos for brands.',
  price: 4399,
  originalPrice: 9999,
  currency: 'INR',
  seats: 30,
  format: 'Live online cohort',
  duration: '4 weeks',
  sessions: '8 live sessions + recordings',
  level: 'Beginner to intermediate',
  language: 'English & Kannada',
  nextCohort: 'Starts October 2026',
  instructor: {
    name: 'Aamith Shenoy',
    role: 'Founder, GROOVINTO',
    bio: 'Creative technologist and growth strategist who has led AI-first content and campaigns for fintech, SaaS and consumer brands across India and APAC.'
  },
  audience: [
    'Content creators who want to add AI video to their toolkit',
    'Founders and marketers producing content for their own brand',
    'Video editors and designers moving into generative workflows',
    'Students and career switchers entering the creator economy'
  ],
  modules: [
    {
      week: 'Week 1',
      title: 'The AI video stack',
      topics: ['How AI video actually works in 2026', 'Choosing tools: Veo, Runway, Kling, Pika and more', 'Prompting for cinematic shots', 'Building your first 30-second film']
    },
    {
      week: 'Week 2',
      title: 'Story, script and voice',
      topics: ['Hooks that stop the scroll', 'Scripting with AI without sounding like AI', 'AI voice, dubbing and lip-sync', 'Shot lists and storyboards in minutes']
    },
    {
      week: 'Week 3',
      title: 'Edit, motion and polish',
      topics: ['Editing AI footage in CapCut and Premiere', 'Motion graphics, captions and sound design', 'Consistency: characters, products and brand style', 'Fixing the AI look']
    },
    {
      week: 'Week 4',
      title: 'Publish, grow and earn',
      topics: ['Formats for Reels, Shorts and YouTube', 'Turning one video into ten', 'Pricing and selling AI video to clients', 'Final project showcase and feedback']
    }
  ],
  includes: [
    { title: '8 live sessions', text: 'Two per week with Q&A, plus lifetime access to recordings.' },
    { title: 'Prompt & workflow library', text: 'The exact prompts, presets and templates our studio uses.' },
    { title: '3 real projects', text: 'Build a brand ad, a story reel and a product film for your portfolio.' },
    { title: 'Private community', text: 'A WhatsApp group with your cohort, mentors and alumni.' },
    { title: 'Certificate', text: 'A GROOVINTO Academy certificate on completing your final project.' },
    { title: 'Career support', text: 'Top projects get featured and referred to brands in our network.' }
  ],
  faqs: [
    {
      q: 'Do I need any prior editing or design experience?',
      a: 'No. We start from zero and build up. If you can use a laptop and a phone, you can take this course.'
    },
    {
      q: 'Which tools will I need, and are they free?',
      a: 'Most tools we teach have free tiers that are enough for the course. We will tell you exactly when a paid plan is worth it.'
    },
    {
      q: 'What if I miss a live session?',
      a: 'Every session is recorded and available the same day. You keep lifetime access to all recordings and materials.'
    },
    {
      q: 'Is the payment secure? Can I pay with UPI?',
      a: 'Yes. Payments are processed by Razorpay and you can pay with UPI, cards, net banking or wallets. You will get an instant confirmation.'
    },
    {
      q: 'Is there a refund policy?',
      a: 'If you attend the first two sessions and feel the course is not for you, email us within 7 days of the cohort start for a full refund.'
    }
  ]
} as const;

export type Course = typeof COURSE;
