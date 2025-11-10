export type BootcampWeekMeta = {
  number: number;
  title: string;
  summary: string;
  theme: 'orc' | 'business-5ps' | 'personal-5ps' | 'ai' | 'team' | 'process' | 'profit' | 'launch' | 'canvas';
  topics: string[];
};

export const BOOTCAMP_WEEKS: BootcampWeekMeta[] = [
  {
    number: 1,
    title: 'Welcome to Black Cardinal',
    summary: 'Understand what Black Cardinal is, the three revenue streams, and your role as a Founding 50 franchise owner.',
    theme: 'orc',
    topics: ['BC Story & Mission', 'Revenue Streams', 'Franchise Owner Role', 'Community Impact'],
  },
  {
    number: 2,
    title: 'Personal 5Ps: Foundation',
    summary: 'Master Proper, Preparation, and Prevents—the first three Personal 5Ps for individual success.',
    theme: 'personal-5ps',
    topics: ['Proper (Values)', 'Preparation (Planning)', 'Prevents (Warning Systems)', 'Personal Discipline'],
  },
  {
    number: 3,
    title: 'Personal 5Ps: Completion',
    summary: 'Learn Poor and Performance—spot decline early and deliver reliably. See how all 5Ps work together.',
    theme: 'personal-5ps',
    topics: ['Poor (Decline Signals)', 'Performance (Promises)', '5Ps Integration', 'Sustainable Success'],
  },
  {
    number: 4,
    title: 'Professional 5Ps: Purpose, Product, People',
    summary: 'Define your local BC mission, understand revenue streams and pricing, and map your customer ecosystem.',
    theme: 'business-5ps',
    topics: ['Purpose Statement', 'Product Catalog', 'BYOA Services', 'Customer Personas'],
  },
  {
    number: 5,
    title: 'Professional 5Ps: Process & Profit',
    summary: 'Build consistent operations processes and understand your financial model for sustainable growth.',
    theme: 'business-5ps',
    topics: ['Operations Rhythm', 'Money Math', 'Franchise Model', '12-Month Plan'],
  },
  {
    number: 6,
    title: 'AI & ORC Framework',
    summary: 'Learn what AI really is and master the ORC (Outcome, Role, Context) framework for reliable results.',
    theme: 'ai',
    topics: ['AI Fundamentals', 'ORC Framework', 'AI Configuration', 'Template Building'],
  },
  {
    number: 7,
    title: 'AI for Marketing',
    summary: 'Use AI to create social media ads and email campaigns that convert customers.',
    theme: 'ai',
    topics: ['Social Media Ads', 'Email Marketing', 'Prompt Library', 'Content Testing'],
  },
  {
    number: 8,
    title: 'AI for Sales',
    summary: 'Master AI for lead tracking, sales conversations, and objection handling.',
    theme: 'ai',
    topics: ['Lead Tracking', 'Sales Playbook', 'Objection Handling', 'Output Validation'],
  },
  {
    number: 9,
    title: 'Launch Preparation',
    summary: 'Build your go-to-market strategy, content calendar, and launch checklist.',
    theme: 'launch',
    topics: ['Go-to-Market', 'Content Calendar', 'Launch Checklist', '30-Day Plan'],
  },
  {
    number: 10,
    title: 'Capstone: Business Launch Kit',
    summary: 'Assemble your complete business canvas, financial projections, and downloadable launch kit.',
    theme: 'canvas',
    topics: ['Business Canvas', 'Financial Planner', 'Launch Commitment', 'Next Steps'],
  },
];

