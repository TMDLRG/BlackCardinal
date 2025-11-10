/**
 * BOOTCAMP CONTENT - REDESIGNED CURRICULUM
 * Now using content from content-redesign.ts
 * Aligned with book_v11.txt and Part 1-3 Manuscripts
 */

export type Lesson = {
  id: string;
  title: string;
  paragraphs: string[];
  keyTakeaways?: string[];
};

export type Exercise = {
  id: string;
  title: string;
  prompt: string;
  helper?: string;
  placeholder?: string;
  minWords?: number;
};

export type Reflection = {
  prompt: string;
  placeholder?: string;
  helper?: string;
};

export type WeekContent = {
  week: number;
  headline: string;
  objective: string;
  lessons: Lesson[];
  exercises: Exercise[];
  reflection: Reflection;
  readingTimeMinutes: number;
  estimatedWorkMinutes: number;
};

// REDESIGNED CONTENT - Week 1: Welcome to Black Cardinal
const week1Lessons: Lesson[] = [
  {
    id: 'lesson-1',
    title: 'The Black Cardinal Story',
    paragraphs: [
      "Black Cardinal is more than a clothing brand. It's a movement built on a simple idea: luxury that speaks volumes through quiet details and bold impact.",
      "Every piece we create carries meaning. The premium materials, the careful design, the attention to small details—these aren't just about looking good. They're about feeling confident in who you are and what you stand for.",
      "Here's what makes us different: 5% of every dollar we earn goes directly to autism nonprofits. When you wear Black Cardinal or sell our products, you're part of something bigger. You're supporting families and individuals who need it most.",
      "The Founding 50 program invites you to be one of the first 50 people to build a Black Cardinal business in your community. You'll have access to our products, our systems, and our support—everything you need to succeed.",
    ],
    keyTakeaways: [
      'Black Cardinal = luxury with purpose (5% to autism nonprofits)',
      'Quiet details, bold impact—premium quality that means something',
      'Founding 50 = exclusive group building BC businesses nationwide',
      "You're not just a customer—you're a franchise owner and brand ambassador",
    ],
  },
  {
    id: 'lesson-2',
    title: 'The Three Revenue Streams',
    paragraphs: [
      "As a Black Cardinal franchise owner, you'll make money in three ways. Think of these as three different doors customers can walk through to work with you.",
      "Revenue Stream 1: Black Cardinal Products. You'll sell our premium apparel and accessories—t-shirts, hoodies, hats, and more. Each item is designed with care and carries our brand promise. You buy wholesale from us and sell retail in your market. Your profit is the difference.",
      "Revenue Stream 2: BYOA (Bring Your Own Apparel) Printing Services. Many customers have their own clothing or items they want customized. You'll offer professional heat-press printing services. They bring the item, you add the design. This is high-margin work because you're selling your skill and equipment time.",
      "Revenue Stream 3: Founding 50 Referrals. When you find someone who would be a great Black Cardinal franchise owner, you refer them to the program. If they join the Founding 50, you earn a referral bonus. This builds the network and rewards you for growing the community.",
      'Most successful franchise owners focus on Products and BYOA services first, then add Referrals as they meet other entrepreneurs in their community.',
    ],
    keyTakeaways: [
      'Stream 1: Sell Black Cardinal products (buy wholesale, sell retail)',
      'Stream 2: BYOA printing services (customer brings item, you customize)',
      'Stream 3: Refer new Founding 50 members (grow network, earn bonus)',
      'Start with Products + BYOA, add Referrals as you build relationships',
    ],
  },
  {
    id: 'lesson-3',
    title: 'Your Role as a Founding Member',
    paragraphs: [
      "Being a Founding Member means you're building a real business. This isn't a side hobby—it's a franchise opportunity with three clear roles you'll play.",
      "Role 1: Franchise Owner. You run your own Black Cardinal business. You decide your hours, your marketing approach, your sales strategy. You're the boss. We provide the products, training, and support—but you build the business in your community.",
      "Role 2: Brand Ambassador. When you wear Black Cardinal, talk about our mission, and share our story, you represent the brand. People will associate you with our values: quality, purpose, and impact. Your reputation and ours are connected.",
      "Role 3: Network Builder. The Founding 50 is a community, not just 50 individual businesses. You'll learn from other members, share what works, and help grow the network by referring people who align with our mission.",
      "Over the next 10 weeks, you'll learn everything you need to launch and run your franchise successfully. By Week 10, you'll have a complete business plan, financial projections, and a launch kit ready to go.",
    ],
    keyTakeaways: [
      "You're building a real business—not a hobby or side gig",
      'Three roles: Franchise Owner, Brand Ambassador, Network Builder',
      'You control your business; we provide products, training, support',
      'This bootcamp gives you everything to launch in 90 days',
    ],
  },
];

const week1Exercises: Exercise[] = [
  {
    id: 'exercise-1',
    title: 'Your "Why Black Cardinal" Statement',
    prompt:
      'Write 3-5 sentences explaining why you want to build a Black Cardinal franchise. What drew you to this opportunity? What impact do you want to make in your community?',
    helper:
      'Be honest and specific. This statement will guide you when things get hard. Example: "I want to build a business I\'m proud of, one that supports autism families like mine. Black Cardinal gives me quality products and a proven system so I can focus on serving my community."',
    placeholder: 'I want to build a Black Cardinal franchise because...',
    minWords: 75,
  },
  {
    id: 'exercise-2',
    title: 'Revenue Stream Priority',
    prompt:
      'Rank the three revenue streams (Products, BYOA, Referrals) in order of which you\'ll focus on first. Explain your reasoning for each.',
    helper:
      'Think about your local market, your skills, and your network. Most people start with Products + BYOA.',
    placeholder: '1. [Stream] - because... 2. [Stream] - because... 3. [Stream] - because...',
  },
  {
    id: 'exercise-3',
    title: 'Your Community Snapshot',
    prompt:
      'Describe your local community in 5-7 sentences. Who lives there? What do they value? Where do they shop? What problems do they face that Black Cardinal could help solve?',
    helper:
      'Think about demographics, income levels, values, and shopping habits. This will help you understand your market.',
    placeholder: 'My community is... People here value... They typically shop at...',
    minWords: 100,
  },
];

// REDESIGNED CONTENT - Week 2: Personal 5Ps Foundation
const week2Lessons: Lesson[] = [
  {
    id: 'lesson-1',
    title: 'Proper: Your Values Under Pressure',
    paragraphs: [
      "Proper means doing the right thing—even when it's hard, even when no one is watching, even when it costs you money.",
      "In business, you'll face tough choices. A customer wants a refund you don't think they deserve. A competitor is cutting corners and winning sales. You're tempted to overpromise to close a deal. Proper is your compass in these moments.",
      'For Black Cardinal franchise owners, Proper shows up in how you treat customers, how you talk about competitors, how you handle mistakes, and how you represent the brand. When you act with integrity, customers notice. They trust you. They come back. They tell their friends.',
      "Your values aren't just nice words on a wall. They're the rules you follow when following them is expensive. That's when they matter most.",
    ],
    keyTakeaways: [
      'Proper = doing right even when it\'s hard or costly',
      'Your values guide decisions when money or pressure is involved',
      'Customers feel integrity—it builds trust that leads to loyalty',
      'Define your non-negotiables now, before you\'re tested',
    ],
  },
  {
    id: 'lesson-2',
    title: 'Preparation: Planning That Actually Works',
    paragraphs: [
      "Most people don't plan—they react. Something comes up, they handle it. Another fire starts, they put it out. By Friday, they're exhausted and can't remember what they accomplished.",
      "Preparation is different. It's deciding what matters before the week starts, so you're not making it up as you go. It's thinking through what could go wrong and having a backup ready. It's writing down the steps so you don't forget them under pressure.",
      'For your Black Cardinal business, preparation means: planning your week on Sunday night, ordering inventory before you run out, writing your social media posts in batches, and having answers ready for common customer questions.',
      "Good preparation feels boring. That's how you know it's working. When everything runs smoothly, it's because someone planned for it to run smoothly.",
    ],
    keyTakeaways: [
      'Preparation = deciding what matters before chaos hits',
      'Plan your week, your inventory, your marketing in advance',
      'Boring preparation prevents exciting emergencies',
      "Write it down—don't rely on memory under pressure",
    ],
  },
  {
    id: 'lesson-3',
    title: 'Prevents: Early Warning Systems',
    paragraphs: [
      "Prevents is about catching problems early, when they're still small and fixable. It's the difference between \"we're running low on inventory\" and \"we're sold out and customers are angry.\"",
      'Think of Prevents like the warning lights in your car. The oil light comes on before your engine dies. The gas light comes on before you\'re stranded. These warnings give you time to fix things before they break.',
      'In your Black Cardinal business, you need warning lights too: checking inventory levels weekly, tracking which products sell fastest, monitoring customer feedback, and watching your cash flow. These simple checks help you spot trouble before it becomes a crisis.',
      "Prevention isn't about being paranoid. It's about being smart. Five minutes of checking this week saves five hours of fixing next week.",
    ],
    keyTakeaways: [
      'Prevents = catching small problems before they become big ones',
      'Build "warning lights" for inventory, sales, cash, customer satisfaction',
      'Check your warnings weekly—5 minutes prevents 5 hours of crisis',
      'Prevention is smart, not paranoid',
    ],
  },
];

const week2Exercises: Exercise[] = [
  {
    id: 'exercise-1',
    title: 'Your Values List',
    prompt:
      'List 3-5 values that will guide your Black Cardinal business. For each value, write one example of how it will show up in your daily decisions.',
    helper:
      'Example: "Honesty - If I make a mistake on an order, I\'ll tell the customer immediately and fix it for free." Be specific about behaviors, not just words.',
    placeholder: 'Value 1: [Name] - Example: When [situation], I will [action]...',
    minWords: 100,
  },
  {
    id: 'exercise-2',
    title: 'Your Weekly Planning Ritual',
    prompt:
      'Design a simple weekly planning process. What day/time will you plan? What questions will you ask yourself? What will you write down?',
    helper:
      'Keep it simple. Example: "Every Sunday at 7pm, I\'ll review last week\'s sales, plan this week\'s priorities, and check inventory levels. I\'ll write my top 3 goals for the week."',
    placeholder: 'I will plan every [day] at [time]. I will review... I will plan... I will check...',
  },
  {
    id: 'exercise-3',
    title: 'Your Warning Lights',
    prompt:
      'Create a list of 5 "warning lights" you\'ll check weekly in your business. For each, write what you\'ll measure and what number means "time to take action."',
    helper:
      'Example: "Inventory - Count items in stock. If any product drops below 10 units, reorder immediately."',
    placeholder: 'Warning Light 1: [What to check] - Action trigger: [When to act]...',
  },
];

// REDESIGNED CONTENT - Week 3: Personal 5Ps Completion
const week3Lessons: Lesson[] = [
  {
    id: 'lesson-1',
    title: 'Poor: Reading the Decline Signals',
    paragraphs: [
      "Poor isn't about judging yourself or your business. It's about noticing when things are slipping—before they fall apart completely.",
      'Every business has ups and downs. Sales drop. Energy fades. Customers complain. The question isn\'t whether these things will happen—they will. The question is: will you notice early enough to fix them?',
      "Poor means paying attention to the signals: You're working more hours but making less money. Customers are taking longer to respond. You're dreading Monday mornings. Your inventory is piling up. These are all signs something needs to change.",
      "The goal isn't to panic when you see these signals. The goal is to notice them, name them, and take one small action to reverse the slide. Small corrections early prevent big disasters later.",
    ],
    keyTakeaways: [
      'Poor = noticing decline early, before it becomes a crisis',
      'Watch for signals: lower energy, slower sales, customer complaints',
      "Don't judge yourself—just notice and act",
      'Small corrections now prevent big disasters later',
    ],
  },
  {
    id: 'lesson-2',
    title: 'Performance: Reliable Execution',
    paragraphs: [
      "Performance is about keeping your promises. When you say you'll ship an order by Friday, you ship it by Friday. When you say you'll respond to emails within 24 hours, you do it. Consistency builds trust.",
      "You don't have to be perfect. You have to be reliable. Reliable means customers know what to expect from you. They know you'll show up. They know you'll deliver. They know if something goes wrong, you'll make it right.",
      'For your Black Cardinal business, performance means: shipping orders on time, responding to messages promptly, showing up when you say you will, and fixing mistakes quickly. These simple habits separate professionals from amateurs.',
      'Track your performance. Write down your promises and check them off when you deliver. This simple practice keeps you honest and shows you where you\'re strong and where you need help.',
    ],
    keyTakeaways: [
      'Performance = keeping promises consistently',
      'Reliable beats perfect—customers want to know what to expect',
      'Track your promises: write them down, check them off',
      "Fix mistakes fast—that's part of reliable performance",
    ],
  },
  {
    id: 'lesson-3',
    title: 'The 5Ps Working Together',
    paragraphs: [
      "The five Ps aren't separate—they work together like gears in a machine. When one gear slips, the whole machine struggles. When all five turn smoothly, your business runs with less stress and better results.",
      "Here's how they connect: Proper (your values) guides what you Prepare for. Preparation helps you Prevent problems. Prevention helps you notice Poor performance early. And all of this makes Performance more reliable.",
      "Example: You value honesty (Proper), so you prepare honest answers to tough customer questions (Preparation). This prevents surprises when customers ask hard questions (Prevents). You notice when you're avoiding a conversation (Poor), and you have the conversation anyway (Performance).",
      'Your job as a franchise owner is to keep all five Ps strong. Check in with yourself weekly: Am I acting on my values? Am I planning ahead? Am I watching for problems? Am I noticing decline? Am I keeping my promises? If any answer is "no," that\'s where you focus next.',
    ],
    keyTakeaways: [
      "The 5Ps work together—each one supports the others",
      'Proper guides Preparation, which enables Prevention, which catches Poor, which improves Performance',
      'Check all 5Ps weekly—find your weak spot and strengthen it',
      'Strong 5Ps = less stress, better results, sustainable business',
    ],
  },
];

const week3Exercises: Exercise[] = [
  {
    id: 'exercise-1',
    title: 'Your Decline Signals',
    prompt:
      'List 5 warning signs that tell you your business or your energy is declining. For each signal, write one action you\'ll take immediately when you notice it.',
    helper:
      'Example: "Signal: I\'m dreading customer calls. Action: Take a day off to recharge, then review why I\'m dreading them—is it a specific customer? A process problem?"',
    placeholder: 'Signal 1: [What you notice] - Action: [What you\'ll do]...',
  },
  {
    id: 'exercise-2',
    title: 'Your Performance Tracker',
    prompt:
      'Create a simple weekly checklist of promises you\'ll track. Include customer commitments, inventory tasks, and personal goals. Aim for 5-7 items you\'ll check off each week.',
    helper:
      'Keep it simple. Example: "Ship all orders by promised date, Respond to all messages within 24 hours, Post 3x on social media, Review sales numbers, Check inventory levels, Plan next week."',
    placeholder: 'Weekly Promise 1: [What I\'ll deliver]... Weekly Promise 2:...',
  },
  {
    id: 'exercise-3',
    title: '5Ps Health Check',
    prompt:
      'Rate yourself 1-10 on each of the 5Ps right now. Then write one specific action you\'ll take this week to improve your lowest-scoring P.',
    helper:
      'Be honest. Low scores aren\'t failures—they\'re opportunities. Example: "Proper: 8, Preparation: 5, Prevents: 6, Poor: 4, Performance: 7. Lowest = Poor. Action: Set up a weekly review every Friday to check my energy and sales trends."',
    placeholder: 'Proper: [score]/10 - Preparation: [score]/10 - Prevents: [score]/10 - Poor: [score]/10 - Performance: [score]/10. My focus this week: [action]',
  },
];

// BUILD WEEK CONTENT FROM REDESIGNED LESSONS
export const BOOTCAMP_WEEK_CONTENT: Record<number, WeekContent> = {
  1: {
    week: 1,
    headline: 'Welcome to Black Cardinal—learn what we stand for and what you\'ll build.',
    objective:
      'Understand the Black Cardinal mission, the three revenue streams, and your role as a Founding 50 franchise owner.',
    lessons: week1Lessons,
    exercises: week1Exercises,
    reflection: {
      prompt:
        'What excites you most about building a Black Cardinal franchise? What worries you? Write honestly about both.',
      placeholder:
        'I\'m excited about... I\'m worried about... My biggest question right now is...',
      helper:
        'There are no wrong answers. This reflection helps you understand your starting point.',
    },
    readingTimeMinutes: 20,
    estimatedWorkMinutes: 60,
  },
  2: {
    week: 2,
    headline: 'Master Proper, Preparation, and Prevents—the foundation of personal success.',
    objective:
      'Build your personal operating system with the first three Ps: values that guide you, planning that works, and early warning systems.',
    lessons: week2Lessons,
    exercises: week2Exercises,
    reflection: {
      prompt:
        'Of the three Ps you learned this week (Proper, Preparation, Prevents), which one is hardest for you? Why? What will you do to get better at it?',
      placeholder: 'The hardest P for me is... because... To improve, I will...',
      helper: 'Be honest. Everyone has a weak spot. Naming it is the first step to fixing it.',
    },
    readingTimeMinutes: 25,
    estimatedWorkMinutes: 90,
  },
  3: {
    week: 3,
    headline: 'Complete the Personal 5Ps with Poor and Performance—notice decline and deliver reliably.',
    objective:
      'Learn to spot problems early and keep your promises consistently. See how all 5Ps work together to create sustainable success.',
    lessons: week3Lessons,
    exercises: week3Exercises,
    reflection: {
      prompt:
        'Which of the 5Ps is your natural strength? Which one will require the most discipline? How will you build that discipline?',
      placeholder: 'My strength is... My challenge is... I\'ll build discipline by...',
      helper:
        'Everyone has different strengths. The goal is to know yours and work on the gaps.',
    },
    readingTimeMinutes: 25,
    estimatedWorkMinutes: 75,
  },
  4: {
    week: 4,
    headline: 'Master Purpose, Product, and People—the first three Professional 5Ps for your franchise.',
    objective:
      'Define your local Black Cardinal mission, understand your revenue streams and pricing, and map your customer ecosystem.',
    lessons: [
      {
        id: 'lesson-1',
        title: 'Purpose: Your Black Cardinal Mission',
        paragraphs: [
          "Every successful business starts with a clear purpose—a reason for existing that goes beyond \"making money.\" Your purpose answers three questions: Who do you serve? What problem do you solve for them? Why does it matter?",
          "For your Black Cardinal franchise, your purpose builds on the brand's foundation: luxury that speaks volumes, quiet details with bold impact, and supporting autism nonprofits. But you'll make it local and personal.",
          'Example: "I help professionals in [your city] express their values through premium apparel while supporting autism families in our community." This purpose is specific (professionals, your city), clear (premium apparel), and meaningful (autism support).',
          'Your purpose guides every decision: which customers to focus on, how to talk about your business, what products to stock, and how to spend your marketing time. When your purpose is clear, decisions become easier.',
        ],
        keyTakeaways: [
          'Purpose = who you serve + problem you solve + why it matters',
          'Your BC franchise purpose: brand foundation + your local community',
          'Clear purpose makes decisions easier and marketing more focused',
          "Write it in simple language you'd use in conversation",
        ],
      },
      {
        id: 'lesson-2',
        title: 'Product: What You Sell and How You Make Money',
        paragraphs: [
          'As a Black Cardinal franchise owner, you have three product categories to sell: premium apparel (t-shirts, hoodies, hats), BYOA printing services (custom heat-press work), and Founding 50 referrals.',
          "Let's break down the money: Black Cardinal products have wholesale and retail prices. You buy at wholesale (example: $20), sell at retail (example: $40), and keep the difference ($20 profit). Your profit margin is 50% on products.",
          "BYOA services are even better margins. A customer brings their own item, you charge $15-30 per print depending on complexity, and your cost is minimal (ink, time, electricity). Your profit margin is 70-80% on BYOA work.",
          'Referrals pay a one-time bonus when someone you refer joins the Founding 50 program. This is passive income that builds as your network grows.',
          "Smart franchise owners start by selling products to build customer relationships, then offer BYOA services to those same customers, then refer people they meet who want to start their own business. This progression builds naturally.",
        ],
        keyTakeaways: [
          'Products: Buy wholesale, sell retail, 50% profit margin',
          "BYOA services: Customer's item + your printing = 70-80% margin",
          'Referrals: One-time bonus for new Founding 50 members',
          'Strategy: Start with products, add BYOA, grow referrals naturally',
        ],
      },
      {
        id: 'lesson-3',
        title: 'People: Your Customer Ecosystem',
        paragraphs: [
          "Your business needs three types of people: customers who buy from you, partners who support you, and team members who help you grow (even if it's just you at first).",
          'Start by defining your ideal customer. Who are they? What do they care about? Where do they spend time? For Black Cardinal, your ideal customers value quality, appreciate meaningful brands, and have disposable income for premium products.',
          'Think about your local market: Are there professionals who dress well for work? Parents who want quality clothes for their kids? People who care about supporting good causes? These are your potential customers.',
          'Your partners might include: local businesses where you can display products, event organizers who need custom printing, social media influencers who align with your values, and other Founding 50 members who can share advice.',
          "As you grow, you might hire help—someone to handle printing while you focus on sales, or someone to manage social media. But start by mapping the people ecosystem you need, even if it's just you and your customers at first.",
        ],
        keyTakeaways: [
          'Three people groups: customers (who buy), partners (who support), team (who help)',
          'Define your ideal customer: values quality, has income, cares about purpose',
          'Map your local market: professionals, parents, cause-conscious buyers',
          'Build partnerships: local businesses, events, influencers, other F50 members',
        ],
      },
    ],
    exercises: [
      {
        id: 'exercise-1',
        title: 'Your Local Purpose Statement',
        prompt:
          'Write your Black Cardinal franchise purpose statement using this template: "I help [who] in [your area] [achieve what] through [Black Cardinal products/services] while [impact statement]."',
        helper:
          'Example: "I help young professionals in Austin express their values through premium Black Cardinal apparel while supporting autism families in Central Texas."',
        placeholder: 'I help [target customer] in [your city/region]...',
        minWords: 50,
      },
      {
        id: 'exercise-2',
        title: 'Product & Pricing Plan',
        prompt:
          'List 5-7 Black Cardinal products you\'ll focus on selling first. For each, note the wholesale price, retail price, and your profit per item. Then list 3 BYOA services you\'ll offer with pricing.',
        helper:
          'Start with bestsellers: classic tees, hoodies, hats. For BYOA, offer simple (1-color print), standard (2-3 colors), and premium (full design). Research local competitors to price competitively.',
        placeholder: 'Product 1: [Name] - Wholesale: $X, Retail: $Y, Profit: $Z...',
      },
      {
        id: 'exercise-3',
        title: 'Customer Persona Cards',
        prompt:
          'Create 2-3 customer personas—descriptions of your ideal customers. For each, include: name (fictional), age range, job/lifestyle, values, shopping habits, and why they\'d choose Black Cardinal.',
        helper:
          'Example: "Professional Paula, 28-35, marketing manager, values sustainability and quality, shops online and at boutiques, wants brands that stand for something."',
        placeholder: 'Persona 1: [Name], [age], [job], values [what], shops [where], chooses BC because...',
        minWords: 150,
      },
      {
        id: 'exercise-4',
        title: 'Local Market Map',
        prompt:
          'List 10 places in your area where your ideal customers spend time. Include: businesses, events, online groups, and physical locations. These are potential partnership or marketing opportunities.',
        helper:
          'Think: coffee shops, gyms, coworking spaces, farmers markets, local Facebook groups, networking events, charity fundraisers.',
        placeholder: '1. [Place/Event] - Why my customers are there... 2. [Place/Event]...',
      },
    ],
    reflection: {
      prompt:
        'Who is your ideal customer? Describe them like you\'re telling a friend. What do they care about? Why would they choose your Black Cardinal business over other options?',
      placeholder: 'My ideal customer is... They care about... They\'d choose me because...',
      helper: 'The clearer your picture of your customer, the easier marketing becomes.',
    },
    readingTimeMinutes: 25,
    estimatedWorkMinutes: 90,
  },
  5: {
    week: 5,
    headline: "Complete the Professional 5Ps with Process and Profit—build operations and money systems.",
    objective: "Create consistent processes for your business operations and understand your financial model for sustainable growth.",
    lessons: [
      {
        id: 'lesson-1',
        title: 'Process: Your Operations Rhythm',
        paragraphs: [
          "Process is how you deliver on your promises consistently. It's the steps you follow every time so customers get the same great experience whether it's Monday or Friday, whether you're energized or tired.",
          "For your Black Cardinal business, you need simple processes for: taking orders, fulfilling orders, handling BYOA requests, managing inventory, responding to customer questions, and posting on social media. These don't have to be complicated—just written down.",
          'Example process for product orders: (1) Customer orders online or in person, (2) You confirm payment, (3) You pack the item carefully with BC tissue paper, (4) You ship within 24 hours, (5) You send tracking info and a thank-you message. Five steps. Every time.',
          "When you write down your processes, three good things happen: You don't forget steps when you're busy. New team members (if you hire help) know exactly what to do. You can spot where things slow down and fix those bottlenecks.",
        ],
        keyTakeaways: [
          'Process = the steps you follow every time to deliver consistently',
          'Write down processes for: orders, BYOA, inventory, customer service, marketing',
          'Simple is better—5-7 steps per process, written in plain language',
          'Consistent processes = reliable quality + easier to train help later',
        ],
      },
      {
        id: 'lesson-2',
        title: 'Profit: Your Money Math',
        paragraphs: [
          "Profit isn't what's left over at the end of the month—it's what you plan for from the beginning. Every business needs to understand its money math: what comes in, what goes out, and what you keep.",
          "Your Black Cardinal business has three types of costs: (1) Product costs (what you pay wholesale), (2) Operating costs (shipping, supplies, equipment, marketing), and (3) Your time (yes, your time has value even if you're not paying yourself yet).",
          "Let's do simple math: If you sell a $40 t-shirt that cost you $20 wholesale, you made $20 gross profit. If shipping cost $5 and packaging cost $1, your net profit is $14. If it took you 15 minutes total (order processing, packing, shipping), you earned $56/hour. That's good money.",
          'Your goal is to track these numbers weekly: How much did I sell? What did it cost me? How much time did it take? What\'s my profit per hour? These four numbers tell you if your business is healthy.',
        ],
        keyTakeaways: [
          "Profit = what you plan for, not what's left over",
          'Track 4 numbers weekly: sales, costs, time, profit per hour',
          'Target margins: 50% on products, 75% on BYOA services',
          'Your time has value—track it and price accordingly',
        ],
      },
      {
        id: 'lesson-3',
        title: 'Building Your Franchise Business Model',
        paragraphs: [
          'A business model is your plan for making money consistently. For your Black Cardinal franchise, your model combines products, services, and referrals into a system that grows over time.',
          'Phase 1 (Months 1-3): Focus on selling Black Cardinal products. Build your customer base. Learn what sells best in your market. Goal: 10-20 sales per month, $500-1000 profit.',
          'Phase 2 (Months 4-6): Add BYOA services. Offer printing to your existing customers first. Post examples on social media. Partner with local businesses or events. Goal: 5-10 BYOA jobs per month, $300-600 profit.',
          'By Month 12, a successful franchise owner is earning $2000-3000/month profit from all three streams combined. Some earn more, some less—it depends on your market, your effort, and your skills. But this model is proven and repeatable.',
        ],
        keyTakeaways: [
          'Phase 1 (Mo 1-3): Sell products, build customer base',
          'Phase 2 (Mo 4-6): Add BYOA services to existing customers',
          'Phase 3 (Mo 7-12): Grow referral network naturally',
          'Year 1 goal: $2000-3000/month profit from all three streams',
        ],
      },
    ],
    exercises: [
      {
        id: 'exercise-1',
        title: 'Your Core Processes',
        prompt: 'Write out your process for fulfilling a Black Cardinal product order. List every step from "customer orders" to "customer receives item and is happy." Aim for 5-10 steps.',
        helper: 'Include: order confirmation, payment processing, packing, shipping, tracking notification, follow-up. Be specific enough that someone else could follow these steps.',
        placeholder: 'Step 1: Customer places order via [method]... Step 2: I confirm payment by...',
      },
      {
        id: 'exercise-2',
        title: 'Your Money Math Tracker',
        prompt: 'Create a simple weekly tracking sheet with these columns: Week, Total Sales, Product Costs, Operating Costs, Hours Worked, Net Profit, Profit Per Hour. Fill in your targets for Month 1.',
        helper: 'Month 1 realistic targets: $800 sales, $400 product costs, $100 operating costs, 20 hours, $300 profit, $15/hour. Adjust based on your situation.',
        placeholder: 'Week 1: Sales $X, Costs $Y, Hours Z, Profit $A, Per Hour $B...',
      },
      {
        id: 'exercise-3',
        title: 'Your 12-Month Revenue Plan',
        prompt: 'Map out your revenue goals by quarter. Q1: Products only. Q2: Products + BYOA. Q3-Q4: All three streams. For each quarter, write your target monthly profit and how you\'ll achieve it.',
        helper: 'Be realistic. Example: "Q1 - $500/mo profit from 15 product sales. Q2 - $900/mo profit from 12 products + 8 BYOA jobs. Q3 - $1500/mo from 10 products + 10 BYOA + 1 referral."',
        placeholder: 'Q1 (Mo 1-3): Target $X/mo from [revenue streams]. Strategy: [how]...',
        minWords: 150,
      },
    ],
    reflection: {
      prompt: 'What part of running a business feels most challenging to you: the operations (processes), the money (profit tracking), or the growth (scaling up)? Why? What will you do to get better at it?',
      placeholder: 'The most challenging part is... because... I\'ll improve by...',
      helper: 'Everyone finds different parts hard. Name yours so you can focus your learning.',
    },
    readingTimeMinutes: 25,
    estimatedWorkMinutes: 90,
  },
  6: {
    week: 6,
    headline: "Understand AI and master the ORC framework—your system for reliable results.",
    objective: "Learn what AI really is, how the ORC (Outcome, Role, Context) framework works, and how to configure AI for your business needs.",
    lessons: [
      {
        id: 'lesson-1',
        title: 'What AI Is (and Isn\'t)',
        paragraphs: [
          "Most people think AI is like a smart person who understands what you want. That's wrong. AI is more like a very talented librarian who has read millions of books and can find patterns in them—but can't read your mind.",
          'Here\'s a better way to think about it: AI is like a jukebox with every song ever made. If you say "play something good," it will pick something random. But if you say "play 1980s rock with a strong beat," you\'ll get exactly what you want.',
          "AI doesn't \"think\" or \"understand\" like humans do. It recognizes patterns in language and predicts what words should come next based on millions of examples it learned from. The clearer your instructions, the better the results.",
          "This is important for your Black Cardinal business: AI can help you write social media posts, create email campaigns, and track customer conversations—but only if you tell it exactly what you need. Vague requests get vague results. Specific requests get great results.",
        ],
        keyTakeaways: [
          'AI = pattern-matching librarian, not a mind reader',
          'The jukebox analogy: specific requests get specific results',
          'AI predicts words based on patterns, doesn\'t truly "understand"',
          'For your business: clear instructions = useful output',
        ],
      },
      {
        id: 'lesson-2',
        title: 'The ORC Framework: Outcome, Role, Context',
        paragraphs: [
          "ORC is a simple three-part system for getting reliable results from AI every time. Think of it as a recipe: if you include all three ingredients, the dish turns out right. Miss one, and it doesn't.",
          'Outcome: What do you want AI to create? Be specific. Not "write a social media post" but "write a 100-word Instagram post announcing our new hoodie collection that makes people want to click the link."',
          'Role: Who should AI act like? A friendly brand ambassador? A professional salesperson? A helpful customer service rep? The role changes the tone and style of what AI creates.',
          'Context: What information does AI need to do this right? Your brand voice, product details, customer concerns, pricing—any facts that make the output accurate and on-brand.',
        ],
        keyTakeaways: [
          'ORC = Outcome (what you want) + Role (who AI acts like) + Context (info it needs)',
          'Outcome must be specific and measurable',
          'Role sets the tone and style of the output',
          'Context provides facts that make output accurate',
        ],
      },
      {
        id: 'lesson-3',
        title: 'Configuring AI for Your Business',
        paragraphs: [
          "Configuration means setting up AI once so you don't have to explain everything every time. It's like programming your coffee maker: set it up once, then just press \"start\" each morning.",
          "For your Black Cardinal business, you'll create templates (pre-written ORC prompts) for your most common tasks: social media posts, customer emails, product descriptions, and follow-up messages.",
          'Once you have this template, you just fill in the [product/topic] part each time. The rest stays the same. This saves you time and keeps your brand voice consistent.',
        ],
        keyTakeaways: [
          'Configuration = set up AI once, use it many times',
          'Build templates for common tasks: social posts, emails, descriptions',
          'Templates include your brand voice and business details',
          'Fill in the blanks each time—saves time, keeps quality consistent',
        ],
      },
    ],
    exercises: [
      {
        id: 'exercise-1',
        title: 'Your First ORC Prompt',
        prompt: 'Write an ORC prompt for creating a Facebook post about Black Cardinal products. Include: Outcome (what you want), Role (who AI should be), and Context (key facts about BC).',
        helper: 'Outcome example: "Write a 75-word Facebook post that makes people curious about our premium t-shirts." Role: "You\'re a friendly local business owner." Context: "Black Cardinal = luxury apparel, 5% to autism nonprofits, quiet details/bold impact."',
        placeholder: 'OUTCOME: [What I want AI to create]... ROLE: [Who AI should act like]... CONTEXT: [Key facts AI needs]...',
        minWords: 100,
      },
      {
        id: 'exercise-2',
        title: 'Test Your ORC Prompt',
        prompt: 'Use your ORC prompt with ChatGPT or Claude. Paste the result here. Then rate it 1-10 and explain what worked and what you\'d improve.',
        helper: 'Be critical. If the output is generic or off-brand, identify which part of ORC needs to be more specific. Usually it\'s Context.',
        placeholder: '[Paste AI output here]... Rating: X/10. What worked: ... What to improve: ...',
      },
      {
        id: 'exercise-3',
        title: 'Your Top 5 AI Tasks',
        prompt: 'List the 5 tasks you\'ll use AI for most in your Black Cardinal business. For each, note whether you\'ll need a template (recurring task) or one-time prompts.',
        helper: 'Common tasks: social media posts, customer emails, product descriptions, ad copy, follow-up messages, event announcements.',
        placeholder: '1. [Task] - Frequency: [how often] - Template needed: [yes/no]...',
      },
    ],
    reflection: {
      prompt: 'Before this week, how were you using AI (if at all)? What\'s different about the ORC approach? Where will you use it first in your business?',
      placeholder: 'Before: I was... Now with ORC: I\'ll... First use: ...',
      helper: 'The shift from vague prompts to ORC is the key to reliable AI results.',
    },
    readingTimeMinutes: 25,
    estimatedWorkMinutes: 90,
  },
  7: {
    week: 7,
    headline: "Use AI to create social media ads and email campaigns that convert.",
    objective: "Build your marketing content library using ORC templates for Facebook, Instagram, and email outreach.",
    lessons: [
      {
        id: 'lesson-1',
        title: 'AI for Social Media Ads',
        paragraphs: [
          'Social media is where most of your customers will discover you. Facebook and Instagram ads let you reach people in your local area who match your ideal customer profile. AI can help you create these ads faster and test different versions.',
          'You\'ll want to create 3-5 variations of each ad to test what works. Change the opening line, the benefit you highlight, or the call to action. Run all versions for a week and see which gets the most clicks. Keep the winner, drop the losers.',
        ],
        keyTakeaways: [
          'Social ads reach local customers who match your ideal profile',
          'Use ORC to create ad copy: specific outcome, clear role, key facts',
          'Test 3-5 variations—keep what works, drop what doesn\'t',
          'Combine AI copy with BC product photos for best results',
        ],
      },
      {
        id: 'lesson-2',
        title: 'AI for Email Marketing',
        paragraphs: [
          'Email is your direct line to customers. Unlike social media (where algorithms decide who sees your posts), email goes straight to their inbox. You control when they hear from you.',
          'You\'ll use email for: welcome messages (when someone first buys), product announcements (new items in stock), special offers (sales or promotions), and follow-ups (checking if they\'re happy with their purchase).',
          'Keep emails short and personal. People get too many emails already. Make yours worth opening: use their name, reference what they bought, and give them a reason to take action (discount, new product, helpful tip).',
        ],
        keyTakeaways: [
          'Email = direct line to customers, you control the timing',
          'Four email types: welcome, announcements, offers, follow-ups',
          'Use ORC for each type—personalize with customer details',
          'Keep emails short, personal, and action-focused',
        ],
      },
      {
        id: 'lesson-3',
        title: 'Building Your Prompt Library',
        paragraphs: [
          'A prompt library is your collection of ORC templates for every marketing task you do regularly. Instead of writing prompts from scratch each time, you copy a template and fill in the blanks.',
          'Store your library somewhere easy to access: a Google Doc, a Notes app, or a simple text file. Each template should have clear labels: [PRODUCT NAME], [BENEFIT], [PRICE], [CALL TO ACTION].',
        ],
        keyTakeaways: [
          'Prompt library = collection of ORC templates for common tasks',
          'Include templates for: social posts, ads, emails, descriptions',
          'Store in Google Doc or Notes—easy to copy and fill in blanks',
          'Improve templates over time based on what works',
        ],
      },
    ],
    exercises: [
      {
        id: 'exercise-1',
        title: 'Create 3 Social Ad Variations',
        prompt: 'Pick one Black Cardinal product. Use ORC to create 3 different Facebook ad variations (50-75 words each). Change the opening hook or the benefit you highlight in each version.',
        helper: 'Variation 1: Focus on quality. Variation 2: Focus on autism mission. Variation 3: Focus on local pride. Test which resonates most with your audience.',
        placeholder: 'Product: [Name]... Ad 1: [Copy]... Ad 2: [Copy]... Ad 3: [Copy]...',
        minWords: 150,
      },
      {
        id: 'exercise-2',
        title: 'Your Email Templates',
        prompt: 'Create ORC templates for 3 email types: (1) Welcome email for new customers, (2) Product announcement email, (3) Follow-up email after purchase. Include [BLANKS] for details you\'ll fill in each time.',
        helper: 'Template structure: OUTCOME: [what this email achieves], ROLE: [your voice], CONTEXT: [customer name], [product], [specific details].',
        placeholder: 'Template 1 - Welcome Email: OUTCOME: ... ROLE: ... CONTEXT: [CUSTOMER], [PRODUCT]...',
        minWords: 200,
      },
      {
        id: 'exercise-3',
        title: 'Your Prompt Library Setup',
        prompt: 'Choose where you\'ll store your prompt library (Google Doc, Notes app, etc.) and create the document. Add the 3 email templates from Exercise 2 and your social ad template from Exercise 1.',
        helper: 'Title it "Black Cardinal Prompt Library" and organize by category: Social Media, Email, Product Descriptions. You\'ll add more templates in coming weeks.',
        placeholder: 'I\'m storing my library in: [location]... Categories: [list]... Templates added: [count]...',
      },
    ],
    reflection: {
      prompt: 'Which marketing channel feels most natural to you: social media or email? Why? How will you use AI to make that channel even stronger?',
      placeholder: 'I prefer [channel] because... AI will help me by...',
      helper: 'Focus on your strength first, then expand to other channels later.',
    },
    readingTimeMinutes: 25,
    estimatedWorkMinutes: 90,
  },
  8: {
    week: 8,
    headline: "Master AI for sales—track leads, handle objections, and close deals confidently.",
    objective: "Create your lead tracking system, sales playbook, and validation checklist for all AI-generated content.",
    lessons: [
      {
        id: 'lesson-1',
        title: 'AI for Lead Tracking',
        paragraphs: [
          'A lead is someone who might become a customer. They asked a question on social media, they visited your website, they stopped by your booth at an event. Your job is to follow up and turn interest into a sale.',
          'Lead tracking means writing down: who they are, how they found you, what they\'re interested in, when you last contacted them, and what the next step is.',
          'AI can help you track leads in a simple spreadsheet or CRM. You can use AI to: write follow-up messages, remind you when to check in, and suggest what to say based on where the customer is in the buying process.',
        ],
        keyTakeaways: [
          'Lead = potential customer who showed interest',
          'Track: name, contact, interest, last contact, next step',
          'AI helps: write follow-ups, set reminders, suggest next actions',
          'Be consistent: log all leads, follow up fast, keep notes',
        ],
      },
      {
        id: 'lesson-2',
        title: 'AI for Sales Conversations',
        paragraphs: [
          'Sales conversations follow a pattern: the customer has a question or concern, you address it, and you guide them toward a purchase. Common concerns for Black Cardinal: "Is the quality really worth the price?" "How long does shipping take?" "What if it doesn\'t fit?"',
          'You\'ll build a "Sales Playbook"—a document with pre-written responses to the 10 most common questions or concerns. When a customer asks, you don\'t have to think on the spot. You reference your playbook, personalize the response, and deliver it confidently.',
        ],
        keyTakeaways: [
          'Sales conversations = address concerns, guide toward purchase',
          'Common objections: price, shipping, fit, quality',
          'Use ORC to prepare responses before conversations happen',
          'Build a Sales Playbook with answers to top 10 questions',
        ],
      },
      {
        id: 'lesson-3',
        title: 'Validation: Checking AI Output',
        paragraphs: [
          "AI is fast and helpful, but it's not perfect. Sometimes it makes mistakes: wrong prices, off-brand tone, or facts that aren't quite right. Your job is to check AI's work before you use it.",
          'Validation means asking three questions: (1) Is this accurate? Check facts, prices, dates. (2) Is this on-brand? Does it sound like Black Cardinal? (3) Is this helpful? Would a customer find this useful and clear?',
          'Create a simple checklist you run through for every AI-generated piece before you publish it. This takes 60 seconds and prevents embarrassing mistakes.',
        ],
        keyTakeaways: [
          'Always check AI output before using it—AI makes mistakes',
          'Three validation questions: Accurate? On-brand? Helpful?',
          'Use a simple checklist—takes 60 seconds, prevents errors',
          'You\'re the boss—AI assists, you decide what\'s good enough',
        ],
      },
    ],
    exercises: [
      {
        id: 'exercise-1',
        title: 'Your Lead Tracking System',
        prompt: 'Create a simple lead tracking template with these columns: Name, Contact (phone/email), Source (how they found you), Interest (what they asked about), Last Contact Date, Next Step, Status (new/contacted/sold/lost).',
        helper: 'You can use a Google Sheet, Excel, or a simple notebook. The tool doesn\'t matter—the discipline of logging every lead does.',
        placeholder: 'Lead 1: Name | Contact | Source | Interest | Last Contact | Next Step | Status...',
      },
      {
        id: 'exercise-2',
        title: 'Your Sales Playbook',
        prompt: 'List the 5 most common questions or concerns customers might have about Black Cardinal products or BYOA services. For each, use ORC to write a confident, friendly response (3-5 sentences).',
        helper: 'Common concerns: "Why is it more expensive than [competitor]?" "How long does shipping take?" "What if I don\'t like it?" "Do you really donate to autism nonprofits?" "Can you print on any item?"',
        placeholder: 'Question 1: [Customer concern]... My response: [Using ORC]...',
        minWords: 200,
      },
      {
        id: 'exercise-3',
        title: 'Your Validation Checklist',
        prompt: 'Create a 5-point checklist you\'ll use to review every piece of AI-generated content before you publish or send it. Make it specific to your business.',
        helper: 'Include checks for: accuracy (facts/prices), brand voice, clarity, call to action, and your personal "would I be proud of this?" standard.',
        placeholder: '✓ Check 1: [What I verify]... ✓ Check 2: [What I verify]...',
      },
    ],
    reflection: {
      prompt: 'What surprised you most about using AI for your business this week? Where did it help the most? Where did you still need to do the thinking yourself?',
      placeholder: 'Biggest surprise: ... Most helpful: ... Where I still lead: ...',
      helper: 'AI is a tool, not a replacement for your judgment. Notice where each adds value.',
    },
    readingTimeMinutes: 25,
    estimatedWorkMinutes: 90,
  },
  9: {
    week: 9,
    headline: "Prepare your launch—build your 30-day plan and marketing calendar.",
    objective: "Create your go-to-market strategy, content calendar, and launch checklist so you're ready to open for business.",
    lessons: [
      {
        id: 'lesson-1',
        title: 'Your Go-to-Market Strategy',
        paragraphs: [
          'Go-to-market means your plan for reaching customers and making your first sales. It answers: Where will customers find you? How will they hear about you? What will make them choose you over competitors?',
          'For your Black Cardinal franchise, your go-to-market has three channels: (1) Online—social media, website, email. (2) Local—events, partnerships, word of mouth. (3) Network—friends, family, professional contacts.',
          'Start with your network. These are people who already know and trust you. Tell them about your new business. Offer them a "friends and family" discount for being your first customers.',
        ],
        keyTakeaways: [
          'Go-to-market = your plan for reaching customers and making sales',
          'Three channels: Online (social/email), Local (events/partnerships), Network (people you know)',
          'Start with network—people who already trust you',
          'First 90 days: focus on network + local, build online presence gradually',
        ],
      },
      {
        id: 'lesson-2',
        title: 'Your Content Calendar',
        paragraphs: [
          'A content calendar is your schedule for what you\'ll post and when. Without a calendar, you\'re making it up every day. With a calendar, you plan once and execute all week.',
          'Plan your content weekly: every Sunday, decide what you\'ll post Monday through Friday. Write the posts (using your AI templates), schedule them in advance if possible, and prepare the images.',
          'Consistency matters more than perfection. Posting 3 times per week every week beats posting 10 times one week and zero the next.',
        ],
        keyTakeaways: [
          'Content calendar = your schedule for what to post and when',
          'Four content types: products, behind-the-scenes, mission, customers',
          'Plan weekly on Sunday, execute Monday-Friday',
          'Consistency beats perfection—3x/week every week is the goal',
        ],
      },
      {
        id: 'lesson-3',
        title: 'Your Launch Checklist',
        paragraphs: [
          'A launch checklist ensures you don\'t forget critical steps when you\'re excited and nervous about starting. It\'s your pre-flight check before takeoff.',
          'Your Black Cardinal launch checklist: ✓ Inventory ordered and received, ✓ BYOA equipment set up and tested, ✓ Online presence ready, ✓ Pricing confirmed, ✓ Marketing materials prepared, ✓ Legal basics handled, ✓ First 10 people identified to tell about your business.',
          'Work through this checklist in your final week before launch. Don\'t launch until everything is checked off.',
        ],
        keyTakeaways: [
          'Launch checklist = pre-flight check before you open for business',
          'Must-haves: inventory, equipment, online presence, pricing, marketing, legal, first contacts',
          'Complete checklist before you launch—better to delay than scramble',
          'Launch day: announce, make first sale, celebrate',
        ],
      },
    ],
    exercises: [
      {
        id: 'exercise-1',
        title: 'Your 30-Day Launch Plan',
        prompt: 'Create a week-by-week plan for your first 30 days in business. For each week, list: your sales goal, your marketing activities, your key tasks, and one thing you\'ll learn or improve.',
        helper: 'Week 1 example: "Goal: 3 sales. Marketing: Tell 20 people in my network, post daily on Instagram. Tasks: Fulfill first orders, collect feedback. Learn: Which products get the most interest."',
        placeholder: 'Week 1: Goal [X sales], Marketing [activities], Tasks [priorities], Learn [focus]...',
        minWords: 150,
      },
      {
        id: 'exercise-2',
        title: 'Your First Month Content Calendar',
        prompt: 'Plan your social media content for your first 4 weeks (3 posts per week = 12 posts total). For each post, note: date, platform, topic, and key message.',
        helper: 'Mix it up: Week 1 focus on introduction, Week 2 on products, Week 3 on mission, Week 4 on customer stories or behind-the-scenes.',
        placeholder: 'Week 1, Post 1: [Date] - [Platform] - [Topic] - [Message]...',
      },
      {
        id: 'exercise-3',
        title: 'Complete Your Launch Checklist',
        prompt: 'Go through the launch checklist from Lesson 3. For each item, mark it as: ✓ Done, ⧖ In Progress, or ☐ Not Started. For items not done, write your deadline to complete them.',
        helper: 'Be honest. If you\'re not ready, that\'s okay—now you know what to focus on. Don\'t launch until everything is checked off.',
        placeholder: '✓/⧖/☐ Inventory: [status] - Deadline: [date]... ✓/⧖/☐ Equipment: [status]...',
      },
    ],
    reflection: {
      prompt: 'What\'s your biggest fear about launching your business? What\'s your biggest excitement? What will you do in the first 24 hours after you launch?',
      placeholder: 'My fear: ... My excitement: ... First 24 hours: ...',
      helper: 'Both fear and excitement are normal. Name them both. Then focus on the actions.',
    },
    readingTimeMinutes: 30,
    estimatedWorkMinutes: 120,
  },
  10: {
    week: 10,
    headline: "Capstone: Assemble your Business Launch Kit and commit to Day 1.",
    objective: "Synthesize everything you've built into a complete business plan, financial projections, and downloadable launch kit.",
    lessons: [
      {
        id: 'lesson-1',
        title: 'Assembling Your Business Canvas',
        paragraphs: [
          'Over the past 9 weeks, you\'ve built the pieces of your business: your purpose, your customer personas, your revenue model, your processes, your AI templates, your marketing plan. Now you\'ll put them all together into one complete picture.',
          'Your Business Canvas is a one-page overview of your entire business. It includes: (1) Your purpose statement, (2) Your three revenue streams with pricing, (3) Your ideal customer description, (4) Your key processes, (5) Your marketing channels, (6) Your financial targets.',
          'This canvas becomes your reference document. When you\'re making a decision and not sure what to do, you look at your canvas.',
        ],
        keyTakeaways: [
          'Business Canvas = one-page overview of your entire business',
          'Includes: purpose, revenue streams, customers, processes, marketing, finances',
          'Use it as your decision-making reference and explanation tool',
          'All your work from Weeks 1-9 comes together here',
        ],
      },
      {
        id: 'lesson-2',
        title: 'Your Financial Planner',
        paragraphs: [
          'Your Financial Planner is a simple spreadsheet that projects your first 90 days of business. It shows: what you expect to earn, what you expect to spend, and what profit you expect to make each month.',
          'Month 1 is usually the hardest—you\'re spending money on inventory and equipment but haven\'t made many sales yet. That\'s normal. Month 2 gets better. Month 3 is where most franchise owners start seeing consistent profit.',
          'The goal isn\'t to predict the future perfectly—it\'s to have a plan you can measure against.',
        ],
        keyTakeaways: [
          'Financial Planner = 90-day projection of revenue, costs, and profit',
          'Month 1 is hard (spending > earning), Month 2-3 improve',
          'Track: revenue, COGS, expenses, profit, cash flow',
          'Compare actual vs. plan weekly—adjust when needed',
        ],
      },
      {
        id: 'lesson-3',
        title: 'Your Commitment & Next Steps',
        paragraphs: [
          'You\'ve completed the bootcamp. You have everything you need: the knowledge, the tools, the templates, the plans. Now comes the most important part: actually starting.',
          'Your commitment is simple: pick a launch date within the next 30 days. Write it down. Tell three people. Put it on your calendar.',
          'Remember: every successful Black Cardinal franchise owner started exactly where you are now—with a plan, some nerves, and a commitment to begin. The difference between people who succeed and people who don\'t isn\'t talent or luck. It\'s starting, learning, and not quitting.',
        ],
        keyTakeaways: [
          'You have everything you need—now you must start',
          'Pick a launch date within 30 days, write it down, tell people',
          'First 90 days: learn, adjust, improve, build on what works',
          'Success = start + learn + don\'t quit',
        ],
      },
    ],
    exercises: [
      {
        id: 'exercise-1',
        title: 'Complete Your Business Canvas',
        prompt: 'Fill in your one-page Business Canvas with all the key elements from Weeks 1-9: Purpose, Revenue Streams, Customer Personas, Processes, Marketing Channels, Financial Targets. This becomes your master reference document.',
        helper: 'Use bullet points and keep it to one page. This should be something you can print and reference daily.',
        placeholder: 'PURPOSE: [Your statement]... REVENUE: [Three streams with pricing]... CUSTOMERS: [Personas]... PROCESSES: [Key workflows]... MARKETING: [Channels]... TARGETS: [Financial goals]...',
        minWords: 200,
      },
      {
        id: 'exercise-2',
        title: 'Build Your 90-Day Financial Projection',
        prompt: 'Create a month-by-month financial projection for your first 90 days. For each month, estimate: number of sales, revenue, costs, and net profit. Be realistic—Month 1 is usually break-even or small loss.',
        helper: 'Month 1 example: "10 product sales = $400 revenue, $200 COGS, $150 expenses = $50 profit." Month 2: "15 sales + 5 BYOA = $800 revenue, $300 COGS, $150 expenses = $350 profit."',
        placeholder: 'Month 1: [X] sales, $[Y] revenue, $[Z] costs, $[A] profit... Month 2: ... Month 3: ...',
        minWords: 100,
      },
      {
        id: 'exercise-3',
        title: 'Your Launch Date Commitment',
        prompt: 'Write your launch date and your Day 1 action plan. What will you do in the first 24 hours after you officially launch? Who will you tell? What will you post? What\'s your first goal?',
        helper: 'Example: "Launch Date: March 15. Day 1: Post launch announcement on Instagram and Facebook, email 25 people in my network, set goal of 3 sales in first week."',
        placeholder: 'LAUNCH DATE: [Specific date]... DAY 1 PLAN: [Actions]... FIRST WEEK GOAL: [Target]...',
        minWords: 75,
      },
    ],
    reflection: {
      prompt: 'Looking back at Week 1, how has your understanding of building a Black Cardinal franchise changed? What\'s the most important thing you learned? What will you do differently because of this bootcamp?',
      placeholder: 'Week 1 vs now: ... Most important lesson: ... I\'ll do differently: ...',
      helper: 'This is your capstone reflection. Be proud of how far you\'ve come.',
    },
    readingTimeMinutes: 30,
    estimatedWorkMinutes: 150,
  },
};

// Utility function to get week content with deep copy to prevent mutations
export function getBootcampWeekContent(week: number): WeekContent | null {
  const content = BOOTCAMP_WEEK_CONTENT[week];
  if (!content) return null;
  return JSON.parse(JSON.stringify(content));
}

// OLD CONTENT BELOW - ARCHIVED FOR REFERENCE
/*
const OLD_BOOTCAMP_WEEK_CONTENT: Record<number, WeekContent> = {
  1: {
    week: 1,
    headline: 'Think like a conductor—configure AI with Outcome, Role, Context.',
    objective:
      'Adopt the ORC discipline so every AI workflow you run is precise, reliable, and aligned to your venture goals.',
    lessons: week1Lessons,
    exercises: week1Exercises,
    reflection: {
      prompt:
        'What surprised you about the ORC framework? Where will it immediately change how you work with AI?',
      placeholder: 'Capture your realizations, concerns, and first ORC applications.',
    },
    readingTimeMinutes: 35,
    estimatedWorkMinutes: 120,
  },
  2: {
    week: 2,
    headline: 'Engineer the business 5Ps so AI can execute the company you envision.',
    objective:
      'Define Purpose, Product, People, Process, and Profit so your venture has strategic clarity and operational momentum.',
    lessons: week2Lessons,
    exercises: week2Exercises,
    reflection: {
      prompt:
        'Which of the business 5Ps currently needs the most focus? Why, and what will you do about it?',
      placeholder: 'Be honest about strengths and friction points.',
    },
    readingTimeMinutes: 40,
    estimatedWorkMinutes: 180,
  },
  3: {
    week: 3,
    headline: 'Align your personal operating system with the business machine you are building.',
    objective:
      'Solidify the Personal 5Ps so your leadership decisions reinforce the venture instead of eroding it.',
    lessons: week3Lessons,
    exercises: week3Exercises,
    reflection: {
      prompt:
        'Where are your personal priorities out of alignment with the business priorities? What adjustments will you make immediately?',
      placeholder: 'Define commitments you will hold yourself to.',
    },
    readingTimeMinutes: 45,
    estimatedWorkMinutes: 180,
  },
  4: {
    week: 4,
    headline: 'Use AI configuration to stress-test, refine, and validate your purpose narrative.',
    objective:
      'Translate purpose into prompt-ready assets, automate validation, and build comparison intelligence that keeps your brand differentiated.',
    lessons: [
      {
        id: 'lesson-1',
        title: 'From Prompt to Configuration',
        paragraphs: [
          'Long prompts are brittle. Configurations are dependable. You will convert your purpose statement into modular prompt components ready for reuse.',
          'You will also learn how to inject purpose into every AI workflow without rewriting it each time.',
        ],
      },
      {
        id: 'lesson-2',
        title: 'AI Purpose Statement Generator',
        paragraphs: [
          'Purpose statements gain power when you can generate variations on demand. You will use configured prompts to test tone, audience focus, and positioning.',
          'The goal is not to let AI decide; it is to rapidly explore the edges of your narrative so you can choose deliberately.',
        ],
      },
      {
        id: 'lesson-3',
        title: 'Purpose Testing Sandbox',
        paragraphs: [
          'Feedback loops determine whether purpose resonates. You will build a sandbox that scores a statement against clarity, urgency, and proof.',
          'This turns subjective debates into objective refinement.',
        ],
      },
      {
        id: 'lesson-4',
        title: 'Competitive Narrative Scan',
        paragraphs: [
          'Knowing how competitors describe themselves helps you avoid sounding generic. You will configure AI to audit their messaging and expose gaps.',
        ],
      },
      {
        id: 'lesson-5',
        title: 'Anchoring Purpose in Offers',
        paragraphs: [
          'Purpose must be visible in pricing pages, pitch decks, SOPs, and marketing sequences. You will define how the statement cascades into your assets.',
        ],
      },
      {
        id: 'lesson-6',
        title: 'Quality Assurance for Purpose',
        paragraphs: [
          'You will craft validation rules so any AI-generated output can be reviewed against your purpose without guesswork.',
        ],
      },
    ],
    exercises: [
      {
        id: 'exercise-1',
        title: 'Purpose Variations',
        prompt: 'Generate three purpose statements using the AI modules. Paste your favorite variation here and explain why it wins.',
      },
      {
        id: 'exercise-2',
        title: 'Purpose QA Checklist',
        prompt: 'Document the validation checklist you will run on every asset to ensure the purpose is evident.',
      },
      {
        id: 'exercise-3',
        title: 'Competitive Narrative Notes',
        prompt: 'List three competitor purpose statements (or positioning lines) and identify the narrative gap you will own.',
      },
    ],
    reflection: {
      prompt: 'How did AI accelerate clarity for your purpose? Where will humans continue to make the final call?',
      placeholder: 'Document which prompts/configurations delivered the most insight.',
    },
    readingTimeMinutes: 35,
    estimatedWorkMinutes: 150,
  },
  5: {
    week: 5,
    headline: 'Design product systems and pricing strategies with AI-assisted ideation and validation.',
    objective:
      'Leverage configuration to brainstorm offers, analyze competitors, prioritize features, and model pricing scenarios that sustain margin.',
    lessons: [
      {
        id: 'lesson-1',
        title: 'From Ideas to Offers',
        paragraphs: [
          'AI can help you ideate, but you must direct it with sharp parameters. You will design input templates for offer brainstorming so outputs stay relevant.',
        ],
      },
      {
        id: 'lesson-2',
        title: 'Feature Matrix Strategy',
        paragraphs: [
          'The feature matrix prevents scope creep. You will categorize must-have, should-have, and delight features for your MVP.',
        ],
      },
      {
        id: 'lesson-3',
        title: 'Competitive Offer Analysis',
        paragraphs: [
          'You will configure AI to dissect competitor offers—pricing, bonuses, delivery model—and identify differentiation angles.',
        ],
      },
      {
        id: 'lesson-4',
        title: 'Pricing & Packaging Sandbox',
        paragraphs: [
          'Margins matter. You will build a sandbox that lets you tweak cost, time, and desired margin to output price recommendations.',
        ],
      },
      {
        id: 'lesson-5',
        title: 'Offer Storytelling',
        paragraphs: [
          'You will use configured prompts to generate positioning statements, FAQ responses, and risk reversals.',
        ],
      },
      {
        id: 'lesson-6',
        title: 'Experiment Roadmap',
        paragraphs: [
          'You will design a 90-day experiment plan to validate the offer using customer interviews, pilots, and conversions.',
        ],
      },
    ],
    exercises: [
      {
        id: 'exercise-1',
        title: 'Offer Blueprint',
        prompt: 'Summarize your refined offer after running it through the AI modules. Include promise, deliverables, and proof.',
      },
      {
        id: 'exercise-2',
        title: 'Feature Matrix Snapshot',
        prompt: 'Paste the top ten features categorized by Must / Should / Could.',
      },
      {
        id: 'exercise-3',
        title: 'Pricing Scenario',
        prompt:
          'Document the price you selected, the cost/time assumptions behind it, and what would trigger a price increase.',
      },
    ],
    reflection: {
      prompt: 'Which part of offer design felt most uncertain before this week? How confident are you now?',
      placeholder: 'Be candid about remaining unknowns—you will refine them in future weeks.',
    },
    readingTimeMinutes: 40,
    estimatedWorkMinutes: 180,
  },
  6: {
    week: 6,
    headline: 'Engineer people systems—team, partners, and customers—that reinforce your venture’s purpose.',
    objective:
      'Create AI-assisted tools to draft role definitions, job descriptions, onboarding flows, and customer personas that align with your culture.',
    lessons: [
      {
        id: 'lesson-1',
        title: 'Role Design Architecture',
        paragraphs: [
          'You will design roles based on outcomes, not titles. Each role will tie back to your purpose and offer delivery model.',
        ],
      },
      {
        id: 'lesson-2',
        title: 'Job Description Automation',
        paragraphs: [
          'You will use configurable prompts to generate job descriptions that communicate expectations, success metrics, and culture signals.',
        ],
      },
      {
        id: 'lesson-3',
        title: 'Onboarding Process Playbook',
        paragraphs: [
          'You will map a 30-60-90 onboarding plan for each key role so new teammates can plug into your systems quickly.',
        ],
      },
      {
        id: 'lesson-4',
        title: 'Culture & Rituals',
        paragraphs: [
          'Culture is engineered. You will define rituals, feedback cadences, and decision rights that keep people aligned.',
        ],
      },
      {
        id: 'lesson-5',
        title: 'Customer Persona Builder',
        paragraphs: [
          'Personas go beyond demographics. You will capture jobs-to-be-done, emotional triggers, and buying objections.',
        ],
      },
      {
        id: 'lesson-6',
        title: 'Support Partnerships',
        paragraphs: [
          'Document the external experts and tools that extend your team without adding headcount.',
        ],
      },
    ],
    exercises: [
      {
        id: 'exercise-1',
        title: 'Role Scorecard',
        prompt: 'Select one critical role and create a scorecard (outcomes, competencies, experience, success metrics).',
      },
      {
        id: 'exercise-2',
        title: 'Onboarding Checklist',
        prompt: 'Design the onboarding milestones for the first 30 days. Include training, assets, and feedback loops.',
      },
      {
        id: 'exercise-3',
        title: 'Customer Persona Profile',
        prompt: 'Document one primary customer persona including pains, desired outcomes, objections, and success triggers.',
      },
    ],
    reflection: {
      prompt: 'Where do you need human expertise next? Which roles or partners will you prioritize and why?',
    },
    readingTimeMinutes: 45,
    estimatedWorkMinutes: 200,
  },
  7: {
    week: 7,
    headline: 'Operationalize your venture by mapping processes, codifying SOPs, and identifying automation opportunities.',
    objective:
      'Document the critical pathways of your business, highlight failure points, and design quality controls that scale.',
    lessons: [
      {
        id: 'lesson-1',
        title: 'Process Mapping Fundamentals',
        paragraphs: [
          'You will map every high-stakes process (sales, onboarding, fulfillment, customer success) using start-to-finish swimlanes.',
        ],
      },
      {
        id: 'lesson-2',
        title: 'Leveraging AI for SOP Drafting',
        paragraphs: [
          'AI accelerates SOP creation when given clear steps. You will learn to feed process maps into prompt templates that output first drafts.',
        ],
      },
      {
        id: 'lesson-3',
        title: 'Automation Opportunity Finder',
        paragraphs: [
          'Automation begins with identifying repetitive, rule-based steps. You will score tasks for automation potential and ROI.',
        ],
      },
      {
        id: 'lesson-4',
        title: 'Quality Control Systems',
        paragraphs: [
          'QC checklists and audits keep trust high. You will define control points, owners, and measurement cadences.',
        ],
      },
      {
        id: 'lesson-5',
        title: 'Runbooks & Incident Response',
        paragraphs: [
          'When things break, clarity wins. You will document how to escalate and recover without improvisation.',
        ],
      },
      {
        id: 'lesson-6',
        title: 'Process Health Reviews',
        paragraphs: [
          'You will establish monthly and quarterly reviews to keep processes tuned as the business evolves.',
        ],
      },
    ],
    exercises: [
      {
        id: 'exercise-1',
        title: 'Process Flow Snapshot',
        prompt: 'Document one high-stakes process using a numbered list (or attach your map). Identify the hand-offs and tools involved.',
      },
      {
        id: 'exercise-2',
        title: 'Automation Shortlist',
        prompt:
          'List 3-5 tasks that should be automated. Include estimated time saved per instance and the tool you will evaluate first.',
      },
      {
        id: 'exercise-3',
        title: 'Quality Control Checklist',
        prompt: 'Draft a QC checklist for the process above. Include trigger frequency, reviewer, and what “pass” looks like.',
      },
    ],
    reflection: {
      prompt: 'Which process has been the biggest drag on momentum? What will you do this month to improve or automate it?',
    },
    readingTimeMinutes: 40,
    estimatedWorkMinutes: 180,
  },
  8: {
    week: 8,
    headline: 'Engineer your revenue engine with pricing strategy, financial projections, and funding runway visibility.',
    objective:
      'Model revenue, cost, and margin scenarios so you can make informed decisions about growth, hiring, and capital.',
    lessons: [
      {
        id: 'lesson-1',
        title: 'Revenue Model Selection',
        paragraphs: [
          'Subscription, hybrid, and project-based revenue affect cash flow differently. You will compare models and pick your default.',
        ],
      },
      {
        id: 'lesson-2',
        title: 'Pricing Psychology & Packaging',
        paragraphs: [
          'You will connect pricing to perceived value, anchoring, and risk. AI-assisted experiments help you test positioning quickly.',
        ],
      },
      {
        id: 'lesson-3',
        title: 'Financial Model Builder',
        paragraphs: [
          'You will assemble a 12-month projection for revenue, costs, and margin using scenario toggles.',
        ],
      },
      {
        id: 'lesson-4',
        title: 'Break-even & Cash Flow',
        paragraphs: [
          'Understanding break-even points guides launch decisions. You will compute unit economics and cash runway.',
        ],
      },
      {
        id: 'lesson-5',
        title: 'Funding Strategy',
        paragraphs: [
          'You will outline if/when to raise capital, partner, or self-fund, with decision triggers to keep control.',
        ],
      },
      {
        id: 'lesson-6',
        title: 'Financial Review Cadence',
        paragraphs: [
          'You will schedule weekly money reviews and monthly deep dives so finances never become a surprise.',
        ],
      },
    ],
    exercises: [
      {
        id: 'exercise-1',
        title: 'Revenue Model Canvas',
        prompt: 'Describe your primary revenue model, pricing tiers, and how revenue scales with customer usage.',
      },
      {
        id: 'exercise-2',
        title: '12-Month Projection Snapshot',
        prompt:
          'Summarize your projection: top-line revenue, direct costs, operating costs, and expected net margin per quarter.',
      },
      {
        id: 'exercise-3',
        title: 'Break-even Summary',
        prompt:
          'Capture your break-even revenue, contribution margin, and the levers that reduce the break-even threshold.',
      },
    ],
    reflection: {
      prompt: 'What financial assumptions feel riskiest? How will you validate them in the next 30 days?',
    },
    readingTimeMinutes: 45,
    estimatedWorkMinutes: 210,
  },
  9: {
    week: 9,
    headline: 'Design and launch your go-to-market plan with channel strategy, content rhythm, and acquisition loops.',
    objective:
      'Produce a launch blueprint that integrates marketing channels, messaging, and milestone tracking for the first 90 days.',
    lessons: [
      {
        id: 'lesson-1',
        title: 'Go-to-Market Architecture',
        paragraphs: [
          'You will map stages of awareness, consideration, and conversion with AI-assisted messaging support.',
        ],
      },
      {
        id: 'lesson-2',
        title: 'Channel Selection Matrix',
        paragraphs: [
          'Pick channels based on audience concentration, cost, and founder advantage. The matrix helps you justify each channel.',
        ],
      },
      {
        id: 'lesson-3',
        title: 'Content Calendar Generator',
        paragraphs: [
          'Consistent storytelling converts. You will generate a 4-week content calendar aligned to launch milestones.',
        ],
      },
      {
        id: 'lesson-4',
        title: 'Launch Timeline Planning',
        paragraphs: [
          'Set pre-launch, launch week, and post-launch actions. Use AI to uncover dependencies you might miss.',
        ],
      },
      {
        id: 'lesson-5',
        title: 'Early Customer Acquisition',
        paragraphs: [
          'You will design offers, demos, or events to secure the first 10 paying customers.',
        ],
      },
      {
        id: 'lesson-6',
        title: 'Measuring Marketing Success',
        paragraphs: [
          'Define lagging and leading indicators for each channel. Set up scorecards that inform future experiments.',
        ],
      },
    ],
    exercises: [
      {
        id: 'exercise-1',
        title: 'Channel Priority Stack',
        prompt:
          'List your top three channels, why they win, and the KPIs you will monitor in the first 90 days.',
      },
      {
        id: 'exercise-2',
        title: 'Content Calendar Snapshot',
        prompt: 'Paste your 4-week content plan or outline key themes for each week.',
      },
      {
        id: 'exercise-3',
        title: 'Launch Checklist',
        prompt: 'List the specific tasks, owners, and deadlines for pre-launch, launch, and post-launch phases.',
      },
    ],
    reflection: {
      prompt: 'Where do you feel most confident about launch? Where do you still need proof or help?',
    },
    readingTimeMinutes: 40,
    estimatedWorkMinutes: 200,
  },
  10: {
    week: 10,
    headline: 'Synthesize every asset into your Business Canvas and launch plan.',
    objective:
      'Assemble purpose, offers, personas, processes, and financial insights into a white-label canvas ready to publish and sell.',
    lessons: [
      {
        id: 'lesson-1',
        title: 'Capstone Overview',
        paragraphs: [
          'Week 10 brings every artifact together. You will review the canvas structure and how each previous week feeds into it.',
        ],
      },
      {
        id: 'lesson-2',
        title: 'White-Label Model Explained',
        paragraphs: [
          'Understand how your venture plugs into BlackCardinal’s production hub while retaining your brand identity.',
        ],
      },
      {
        id: 'lesson-3',
        title: 'Canvas Assembly Walkthrough',
        paragraphs: [
          'You will assemble the canvas section by section, pulling data directly from stored exercises and reflections.',
        ],
      },
      {
        id: 'lesson-4',
        title: 'Revenue Sharing & Support',
        paragraphs: [
          'Define how revenue flows, what support you receive, and which metrics unlock additional resources.',
        ],
      },
      {
        id: 'lesson-5',
        title: 'Quality Assurance & Publication',
        paragraphs: [
          'You will run validation checks and publish a PDF/print-ready version for clients or partners.',
        ],
      },
      {
        id: 'lesson-6',
        title: 'Next 90-Day Plan',
        paragraphs: [
          'Close the week by locking in the first action steps post-bootcamp and any support you require from HQ.',
        ],
      },
    ],
    exercises: [
      {
        id: 'exercise-1',
        title: 'Canvas Summary',
        prompt: 'Write a 1-paragraph summary of your business that will appear at the top of your canvas.',
      },
      {
        id: 'exercise-2',
        title: 'Launch Commitments',
        prompt: 'List three actions you will complete in the next 14 days to operationalize the canvas.',
      },
      {
        id: 'exercise-3',
        title: 'Support Requests',
        prompt: 'Document any support, approvals, or assets you need from BlackCardinal to move forward.',
      },
    ],
    reflection: {
      prompt: 'What momentum are you carrying into the next 90 days? What could derail it and how will you respond?',
    },
    readingTimeMinutes: 30,
    estimatedWorkMinutes: 180,
  },
};
*/
