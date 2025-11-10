/**
 * Script to seed bootcamp completion data for testing
 * This populates all 10 weeks with sample exercise responses and reflections
 */

import { PrismaClient } from '@prisma/client';
import { TEST_USER_ID } from '../src/lib/test-mode';

const prisma = new PrismaClient();

const WEEK_EXERCISES = {
  2: [
    {
      id: 'exercise-1',
      response: `My core values as a Black Cardinal franchise owner are:

1. Integrity - I will always be honest with customers about product quality, pricing, and delivery timelines. I won't overpromise or cut corners.

2. Excellence - Every product I sell and every BYOA service I deliver will meet Black Cardinal's high standards. Quality is non-negotiable.

3. Community Impact - The 5% donation to autism nonprofits is central to why I'm doing this. I'll actively communicate this mission to customers.

4. Growth Mindset - I'm committed to learning, adapting, and improving my business skills throughout this journey.

These values guide every decision I make, from how I price products to how I treat customers to how I represent the brand in my community.`,
    },
    {
      id: 'exercise-2',
      response: `My 90-day preparation plan:

**Month 1 (Weeks 1-4): Foundation**
- Complete bootcamp Weeks 1-4
- Set up business entity and bank account
- Order initial inventory ($2,000 starter kit)
- Set up heat press equipment and workspace
- Create social media accounts

**Month 2 (Weeks 5-8): Build Systems**
- Complete bootcamp Weeks 5-8
- Develop pricing sheets and order forms
- Create AI prompt library for marketing
- Build email list of 50 potential customers
- Practice BYOA printing techniques

**Month 3 (Weeks 9-10): Launch Prep**
- Complete bootcamp Weeks 9-10
- Finalize business canvas and financial projections
- Schedule launch event for Week 12
- Prepare marketing materials
- Line up first 10 customers

**Weekly Rituals:**
- Monday: Review week goals and bootcamp lessons
- Wednesday: Practice AI tools and refine prompts
- Friday: Customer outreach and relationship building
- Sunday: Reflection and planning for next week`,
    },
    {
      id: 'exercise-3',
      response: `Top 5 Risks and Mitigation Strategies:

**Risk 1: Slow Initial Sales**
- Likelihood: High | Impact: Medium
- Mitigation: Start with friends/family network, offer launch discounts, focus on BYOA services for quick wins

**Risk 2: Cash Flow Challenges**
- Likelihood: Medium | Impact: High
- Mitigation: Maintain 3-month emergency fund, start part-time while keeping day job, track expenses meticulously

**Risk 3: Equipment Failure**
- Likelihood: Low | Impact: High
- Mitigation: Buy quality heat press with warranty, have backup plan (local print shop partnership), maintain equipment properly

**Risk 4: Inventory Management**
- Likelihood: Medium | Impact: Medium
- Mitigation: Start with small inventory, track sales data, reorder based on demand patterns, avoid overstocking

**Risk 5: Brand Reputation Damage**
- Likelihood: Low | Impact: Very High
- Mitigation: Quality control on every order, clear communication with customers, handle complaints professionally, follow BC brand guidelines strictly`,
    },
  ],
  3: [
    {
      id: 'exercise-1',
      response: `Personal Performance Scorecard:

**Weekly Metrics:**
- Customer conversations: Target 10/week
- Products sold: Target 3/week
- BYOA services completed: Target 2/week
- Social media posts: Target 5/week
- Revenue generated: Target $500/week (Month 3+)

**Monthly Review Questions:**
1. Did I follow through on commitments to customers?
2. Did I maintain product quality standards?
3. Did I communicate the BC mission effectively?
4. Did I invest time in learning and improvement?
5. Did I support other Founding 50 members?

**Quarterly Goals:**
- Q1: Launch business, complete 20 sales, establish local presence
- Q2: Build to $2K/month revenue, add 3 BYOA regulars
- Q3: Reach $4K/month, refer first Founding 50 member
- Q4: Hit $6K/month, expand product line

I'll review these metrics every Sunday and adjust strategies based on what's working.`,
    },
    {
      id: 'exercise-2',
      response: `Integration of Personal 5Ps in my Black Cardinal business:

**Proper (Values)**: I'll never compromise on product quality or misrepresent the brand. If a customer asks for something that doesn't align with BC standards, I'll politely decline. My reputation and BC's reputation are linked.

**Preparation (Planning)**: Every Sunday I'll plan the week ahead - which customers to contact, which products to promote, which BYOA jobs to complete. I'll prepare my workspace, check inventory, and review my AI prompts before each work session.

**Prevents (Warning Systems)**: I'll track three warning signs: (1) Declining customer satisfaction, (2) Cash flow getting tight, (3) Feeling burned out. If any of these appear, I'll pause and address them before they become crises.

**Poor (Decline Signals)**: I'll watch for: late deliveries, sloppy work quality, avoiding customer calls, skipping my weekly planning ritual. These signal I'm slipping and need to reset.

**Performance (Promises)**: I'll only promise what I can deliver. If I say a BYOA job will be ready Friday, it will be ready Friday. If I commit to a customer meeting, I'll show up prepared. My word is my bond.

All five Ps work together: my values guide my planning, my planning prevents problems, I catch decline early, and I deliver on promises consistently. This is how I build trust and grow sustainably.`,
    },
  ],
  4: [
    {
      id: 'exercise-1',
      response: `My Black Cardinal Purpose Statement:

"I help my local community express their identity and values through premium apparel that makes a difference. By offering Black Cardinal's luxury products and custom BYOA printing services, I give people clothing they're proud to wear while supporting autism families through our 5% donation commitment. I exist to prove that business can be both profitable and purposeful, and that quality and impact can go hand in hand."

This purpose guides everything: my marketing messages emphasize quality + impact, my sales conversations focus on how customers can look good and do good, and my hiring (when I grow) will prioritize people who share these values.`,
    },
    {
      id: 'exercise-2',
      response: `Product Catalog & Pricing Strategy:

**Black Cardinal Products (Wholesale → Retail):**
- Premium T-Shirts: $15 → $35 (57% margin)
- Hoodies: $30 → $65 (54% margin)
- Hats: $12 → $28 (57% margin)
- Accessories: $8 → $20 (60% margin)

**BYOA Printing Services:**
- Single item: $25 (15 min work, ~80% margin)
- 5-item batch: $100 ($20/item, volume discount)
- 10+ items: $15/item (bulk pricing)
- Rush service: +$10 (24-hour turnaround)

**Pricing Philosophy:**
- BC products priced at premium level (not discount brand)
- BYOA services priced competitively but emphasize quality
- Volume discounts encourage larger orders
- Rush fees reward planning ahead

**Target Customer Willingness to Pay:**
- BC products: $30-70 per item (quality-conscious buyers)
- BYOA services: $20-30 per item (convenience + customization value)

Revenue goal: 60% from BC products, 35% from BYOA, 5% from referrals (Year 1)`,
    },
    {
      id: 'exercise-3',
      response: `Customer Ecosystem Map:

**Primary Customers (Direct Buyers):**
- Young professionals (25-40) who value quality and purpose
- Parents of school-age kids (custom team/event apparel via BYOA)
- Local business owners (branded apparel for their teams)
- Socially-conscious consumers (drawn to autism nonprofit mission)

**Secondary Customers (Referral Sources):**
- Existing customers who love the brand (word-of-mouth)
- Local boutique owners (potential wholesale partnerships)
- Event planners (bulk BYOA orders for weddings, reunions, corporate events)
- School PTAs and sports teams (fundraising opportunities)

**Tertiary Network (Community Amplifiers):**
- Local autism nonprofit leaders (mission alignment, cross-promotion)
- Chamber of Commerce members (business networking)
- Social media influencers in my area (brand awareness)
- Other Founding 50 members (peer support, best practices)

**Engagement Strategy:**
- Primary: Direct sales, personalized service, loyalty program
- Secondary: Partnership agreements, referral bonuses
- Tertiary: Community involvement, event sponsorships, content sharing

I'll focus 80% of effort on Primary customers, 15% on Secondary, 5% on Tertiary in Year 1.`,
    },
  ],
  5: [
    {
      id: 'exercise-1',
      response: `Standard Operating Procedures:

**Order Fulfillment Process:**
1. Customer places order (in-person, phone, email, or online)
2. Confirm order details and payment within 24 hours
3. Check inventory - if in stock, proceed; if not, order from BC (3-5 day lead time)
4. Package order with BC branded materials
5. Deliver or ship within promised timeframe
6. Follow up 48 hours after delivery for feedback

**BYOA Service Process:**
1. Customer brings item and describes desired design
2. Review design options and show samples
3. Quote price and turnaround time
4. Get approval and 50% deposit
5. Complete printing (quality check before customer pickup)
6. Customer picks up, pays balance, signs satisfaction waiver
7. Follow up 1 week later for feedback and referrals

**Weekly Business Rhythm:**
- Monday AM: Review week goals, check inventory, plan outreach
- Tuesday-Thursday: Customer meetings, order fulfillment, BYOA services
- Friday: Financial review, restock inventory, plan next week
- Saturday: Marketing content creation, social media engagement
- Sunday: Bootcamp learning, reflection, strategic planning

**Monthly Business Rhythm:**
- Week 1: Financial close (reconcile accounts, review P&L)
- Week 2: Marketing planning (content calendar, campaigns)
- Week 3: Customer appreciation (thank you notes, loyalty rewards)
- Week 4: Strategic review (what's working, what to change)

These processes ensure consistency, quality, and continuous improvement.`,
    },
    {
      id: 'exercise-2',
      response: `12-Month Financial Projections:

**Startup Costs (Month 0):**
- Initial inventory: $2,000
- Heat press equipment: $800
- Business registration/licenses: $500
- Marketing materials: $300
- Website/e-commerce: $200
- **Total Startup: $3,800**

**Monthly Operating Costs:**
- Inventory replenishment: $500-1,500 (scales with sales)
- Marketing/advertising: $200
- Website hosting: $30
- Supplies (packaging, etc.): $100
- **Total Monthly: $830 + inventory**

**Revenue Projections:**
- **Months 1-3**: $1,000/month (learning phase, building customer base)
- **Months 4-6**: $3,000/month (momentum building, repeat customers)
- **Months 7-9**: $5,000/month (established presence, referrals flowing)
- **Months 10-12**: $7,000/month (hitting stride, scaling up)

**Profitability Timeline:**
- Break-even: Month 5 (cumulative)
- Sustainable profit: Month 7+ ($2,000+/month take-home)
- Year 1 total revenue: $48,000
- Year 1 total profit: $18,000 (after all costs)

**Key Assumptions:**
- 55% average margin on BC products
- 75% average margin on BYOA services
- 60/35/5 revenue split (Products/BYOA/Referrals)
- Customer acquisition cost: $20/customer
- Repeat customer rate: 40% by Month 6

**Sensitivity Analysis:**
- Best case (fast growth): $60K revenue, $25K profit
- Base case (steady growth): $48K revenue, $18K profit
- Worst case (slow start): $30K revenue, $8K profit

I'm planning for base case but preparing for worst case with my emergency fund.`,
    },
  ],
  6: [
    {
      id: 'exercise-1',
      response: `ORC Template: Social Media Ad for Black Cardinal Products

**Outcome:**
Create a Facebook ad that generates 50+ clicks to my online store and 5+ product sales within 7 days. The ad should attract quality-conscious buyers aged 25-45 in my local area who value purpose-driven brands.

**Role:**
You are an expert social media copywriter specializing in luxury apparel brands with social impact missions. You understand how to write compelling ad copy that balances aspiration (premium quality) with purpose (autism nonprofit support). You know Facebook ad best practices: hook in first 3 words, emotional connection, clear call-to-action.

**Context:**
- Brand: Black Cardinal (luxury apparel, 5% to autism nonprofits)
- Target audience: Local community members (25-45, middle to upper income)
- Products: Premium t-shirts ($35), hoodies ($65), hats ($28)
- Unique value: "Quiet details, bold impact" - understated luxury with purpose
- Ad format: Facebook single image ad (1200x628px)
- Budget: $50 for 7-day campaign
- Goal: Drive traffic to online store, generate sales
- Tone: Sophisticated but accessible, aspirational but authentic

**Output Format:**
Provide:
1. Headline (5 words max, attention-grabbing)
2. Primary text (3 short paragraphs, 100-150 words total)
3. Call-to-action button text
4. Image description (what visual would work best)

This ORC template gives AI everything it needs to write effective ad copy without me having to explain the brand every time.`,
    },
    {
      id: 'exercise-2',
      response: `AI Prompt Library - Marketing Templates:

**Template 1: Instagram Caption for Product Launch**
Outcome: Engaging Instagram caption that gets 50+ likes and 10+ comments
Role: Social media content creator for luxury lifestyle brands
Context: New Black Cardinal product drop, target audience is style-conscious millennials, emphasize quality and mission, include 3-5 relevant hashtags, conversational tone
Output: Caption (150 words max) + hashtags

**Template 2: Email Subject Lines**
Outcome: Subject line with 30%+ open rate
Role: Email marketing specialist for e-commerce brands
Context: Sending to email list of 200 subscribers, announcing new products or promotions, avoid spam triggers, create curiosity or urgency
Output: 5 subject line options with rationale for each

**Template 3: Customer Testimonial Request**
Outcome: Message that gets 50%+ response rate from happy customers
Role: Customer success manager focused on gathering authentic reviews
Context: Sent 48 hours after successful purchase, personalized with customer name and product, makes it easy to respond, emphasizes how testimonials help the mission
Output: Email or text message (100 words max)

**Template 4: Local Partnership Pitch**
Outcome: Meeting booked with local boutique or business owner
Role: Business development professional for premium brands
Context: Reaching out to complementary local businesses for cross-promotion or wholesale opportunities, emphasize mutual benefit, professional but friendly tone
Output: Initial outreach email (150 words max)

**Template 5: Event Promotion Post**
Outcome: 20+ RSVPs for local pop-up or trunk show
Role: Event marketing specialist
Context: Promoting in-person shopping event, target local community, create FOMO, make RSVP easy, mention exclusive deals or experiences
Output: Facebook event description (200 words max)

I'll use these templates consistently, just updating the specific details for each campaign.`,
    },
  ],
  7: [
    {
      id: 'exercise-1',
      response: `Social Media Ad Campaign Plan:

**Campaign 1: Brand Awareness (Weeks 1-2)**
- Platform: Facebook + Instagram
- Audience: Local area, 25-50, interests in fashion/luxury/nonprofits
- Content: Brand story video + carousel of products
- Message: "Luxury with purpose - 5% to autism nonprofits"
- Budget: $100
- Goal: 1,000 impressions, 50 profile visits

**Campaign 2: Product Launch (Weeks 3-4)**
- Platform: Instagram
- Audience: Engaged followers + lookalike audience
- Content: Professional product photography, lifestyle shots
- Message: "New arrivals - premium quality, bold impact"
- Budget: $150
- Goal: 500 clicks to store, 10 sales

**Campaign 3: BYOA Services (Weeks 5-6)**
- Platform: Facebook (local targeting)
- Audience: Parents, small business owners, event planners
- Content: Before/after photos of BYOA work
- Message: "Bring your apparel, we'll make it amazing"
- Budget: $100
- Goal: 20 inquiries, 5 bookings

**Content Calendar (8 weeks):**
- Monday: Motivational quote + product feature
- Wednesday: Customer spotlight or testimonial
- Friday: Behind-the-scenes or process video
- Sunday: Mission moment (autism nonprofit impact)

**Success Metrics:**
- Engagement rate: 5%+
- Click-through rate: 2%+
- Conversion rate: 3%+
- Cost per acquisition: <$30
- Return on ad spend: 3x+

I'll test different ad creative, copy, and audiences, then double down on what works best.`,
    },
    {
      id: 'exercise-2',
      response: `Email Marketing Campaign Plan:

**Email Sequence 1: Welcome Series (New Subscribers)**
- Email 1 (Day 0): Welcome + brand story + 10% off first order
- Email 2 (Day 3): Product catalog + customer testimonials
- Email 3 (Day 7): BYOA services explanation + examples
- Email 4 (Day 14): Mission impact (autism nonprofit stories)
- Goal: 40% open rate, 15% click rate, 20% conversion

**Email Sequence 2: Product Launch**
- Email 1: Teaser (3 days before launch)
- Email 2: Launch announcement (launch day)
- Email 3: Social proof (3 days after, share early customer photos)
- Email 4: Last chance (7 days after, limited inventory reminder)
- Goal: 35% open rate, 20% click rate, 10% conversion

**Email Sequence 3: Re-engagement (Inactive Customers)**
- Email 1: "We miss you" + new products showcase
- Email 2: Exclusive offer (20% off, 48-hour window)
- Email 3: Final reminder before removing from list
- Goal: 25% open rate, 30% re-engagement

**Monthly Newsletter:**
- Section 1: New products and restocks
- Section 2: Customer spotlight
- Section 3: BYOA project showcase
- Section 4: Mission update (autism nonprofit impact)
- Section 5: Upcoming events or promotions

**List Building Strategy:**
- Collect emails at every customer interaction
- Offer lead magnet (style guide or sizing chart PDF)
- Run giveaway contest (share + tag to enter)
- Partner with local businesses for co-marketing
- Goal: Grow list by 50 subscribers/month

I'll use AI to draft all email copy using my ORC templates, then personalize and refine before sending.`,
    },
  ],
  8: [
    {
      id: 'exercise-1',
      response: `Lead Tracking System:

**Lead Sources:**
- Social media (Facebook, Instagram)
- Referrals (existing customers)
- Local events (pop-ups, markets)
- Website inquiries
- Walk-ins (if I have physical location)

**Lead Stages:**
1. **New Lead**: Just expressed interest, no conversation yet
2. **Contacted**: Initial outreach made, waiting for response
3. **Qualified**: Confirmed interest and budget fit
4. **Proposal Sent**: Provided pricing and options
5. **Negotiating**: Discussing details, addressing concerns
6. **Closed-Won**: Sale completed
7. **Closed-Lost**: Decided not to buy (track reason)

**Tracking Method:**
- Simple spreadsheet with columns: Name, Source, Stage, Product Interest, Budget, Next Action, Notes
- Update after every interaction
- Review weekly to prioritize follow-ups

**Follow-up Cadence:**
- Day 1: Initial contact within 24 hours
- Day 3: Follow up if no response
- Day 7: Final follow up with special offer
- Day 30: Move to nurture list (monthly check-ins)

**Key Metrics:**
- Lead-to-customer conversion rate (target: 30%)
- Average time to close (target: 7 days)
- Average order value (target: $75)
- Lead source ROI (which sources convert best)

This system keeps me organized and ensures no leads fall through the cracks.`,
    },
    {
      id: 'exercise-2',
      response: `Sales Objection Handling Guide:

**Objection 1: "That's expensive"**
- Response: "I understand - quality does cost more upfront. Let me show you why BC products last 3x longer than typical apparel. When you factor in cost-per-wear and the fact that 5% goes to autism families, the value is clear. Plus, how you feel wearing something you're proud of? That's priceless."
- AI Prompt: "Generate 3 variations of this value-based response to price objections, maintaining professional tone"

**Objection 2: "I need to think about it"**
- Response: "Absolutely - this is an investment and you should feel confident. What specific questions can I answer to help you decide? Is it the fit, the style, or the price point you're considering?"
- AI Prompt: "Create follow-up questions that uncover the real objection without being pushy"

**Objection 3: "I can get something similar cheaper online"**
- Response: "You definitely can find cheaper options - but here's what makes BC different: premium materials that last, local service and support from me personally, and 5% of your purchase supporting autism families right here in our community. You're not just buying a shirt, you're investing in quality and impact."
- AI Prompt: "Reframe this differentiation message for different customer personas (value-driven, quality-focused, mission-oriented)"

**Objection 4: "I don't know if this style is for me"**
- Response: "Let's figure that out together. What styles do you typically wear? What do you love about your favorite pieces? I can show you how BC fits into your existing wardrobe and elevates your look."
- AI Prompt: "Generate consultative questions to understand customer style preferences and recommend appropriate BC products"

**Objection 5: "I'll wait for a sale"**
- Response: "BC doesn't do traditional sales because we price fairly from the start. However, I do offer a first-time customer discount (10% off) and a referral program where you earn credit for future purchases. Would either of those work for you?"
- AI Prompt: "Create scarcity and exclusivity messaging that encourages immediate purchase without being aggressive"

**General Objection Handling Framework:**
1. Listen and acknowledge (don't interrupt or dismiss)
2. Ask clarifying questions (understand the real concern)
3. Provide relevant information (address specific worry)
4. Offer alternatives (different product, payment plan, etc.)
5. Close or nurture (either get the sale or stay in touch)

I'll practice these responses until they feel natural, and use AI to generate variations for different situations.`,
    },
  ],
  9: [
    {
      id: 'exercise-1',
      response: `30-Day Launch Plan:

**Week 1: Pre-Launch Prep**
- Finalize business canvas and financial projections
- Complete all bootcamp content and exercises
- Order initial inventory ($2,000 starter kit)
- Set up heat press and test BYOA process
- Create social media accounts and post 5 pieces of content
- Build email list of 50 friends/family/contacts

**Week 2: Soft Launch (Friends & Family)**
- Announce launch to personal network via email and social media
- Offer exclusive "Founding Customer" discount (15% off)
- Goal: 10 sales, 5 BYOA services, collect testimonials
- Refine processes based on feedback
- Start building content library (photos, videos, testimonials)

**Week 3: Public Launch**
- Host launch event (pop-up shop, trunk show, or online launch party)
- Run Facebook/Instagram ad campaign ($150 budget)
- Send launch email to full list
- Partner with local business for cross-promotion
- Goal: 15 sales, 5 BYOA services, 20 new email subscribers

**Week 4: Momentum Building**
- Follow up with all customers for testimonials and referrals
- Post customer success stories on social media
- Run second ad campaign targeting BYOA services
- Attend local networking event (Chamber, BNI, etc.)
- Goal: 20 sales, 8 BYOA services, 2 wholesale inquiries

**Launch Day Checklist:**
✅ Inventory received and organized
✅ Heat press tested and calibrated
✅ Website/online store functional
✅ Social media accounts active with 10+ posts
✅ Email list of 100+ contacts
✅ Marketing materials printed (business cards, flyers)
✅ Pricing sheets and order forms ready
✅ Payment processing set up
✅ Customer service process documented
✅ Launch event scheduled and promoted

**Success Metrics (30 Days):**
- Total sales: 45+ orders
- Revenue: $3,000+
- BYOA services: 18+ completed
- Email list growth: 50+ new subscribers
- Social media followers: 200+
- Customer satisfaction: 90%+ positive feedback
- Referrals generated: 5+ new leads

This plan balances ambition with realism, focusing on building momentum and learning in the first month.`,
    },
  ],
  10: [
    {
      id: 'exercise-1',
      response: `Launch Commitment Statement:

I, [Test User], commit to launching my Black Cardinal franchise by [90 days from now].

**I commit to:**

1. **Completing this bootcamp** - I will finish all 10 weeks, complete every exercise thoughtfully, and apply the lessons to my business planning.

2. **Investing in my success** - I will allocate $4,000 for startup costs (inventory, equipment, marketing) and dedicate 15-20 hours per week to building this business.

3. **Following the system** - I will use the ORC framework, implement the 5Ps, leverage AI tools, and follow the processes taught in this bootcamp rather than trying to reinvent everything.

4. **Serving with excellence** - I will maintain Black Cardinal's quality standards, deliver on my promises to customers, and represent the brand with integrity.

5. **Supporting the mission** - I will actively communicate the autism nonprofit impact to customers and take pride in the 5% contribution from every sale.

6. **Building community** - I will engage with other Founding 50 members, share what I learn, and refer qualified candidates to the program.

7. **Measuring and adapting** - I will track my key metrics weekly, review my progress monthly, and adjust my strategies based on what the data shows.

8. **Persisting through challenges** - I know the first 90 days will be hard. I commit to pushing through obstacles, asking for help when needed, and not quitting when things get difficult.

**My "why" that will sustain me:**
I'm building this business to create financial freedom for my family while making a meaningful impact in my community. The combination of entrepreneurship and supporting autism families aligns perfectly with my values. I want to prove that business can be both profitable and purposeful.

**Accountability:**
- I will share my launch date with 3 people who will hold me accountable
- I will post weekly progress updates in the Founding 50 community
- I will schedule monthly check-ins with my BC mentor

**Signature**: [Test User]
**Date**: [Today's Date]
**Launch Date Target**: [90 days from today]

I'm all in. Let's build this.`,
    },
  ],
};

const WEEK_REFLECTIONS = {
  2: `This week's focus on Proper, Preparation, and Prevents really hit home. I realized I've been winging a lot of things in my life, and that won't work for building a successful business. The preparation exercises forced me to think 90 days ahead, which feels both exciting and overwhelming. I'm worried about whether I can maintain these disciplines when things get busy, but I'm committed to the weekly rituals. The risk radar exercise was eye-opening - I hadn't thought about some of these risks before, and now I have mitigation plans. I feel more prepared and less anxious about launching.`,
  3: `The Poor and Performance lessons were tough but necessary. I had to confront some areas where I've let standards slip in the past - being late to meetings, not following through on commitments. I can't do that with customers or I'll destroy my reputation and BC's reputation. The performance scorecard exercise gave me concrete metrics to track, which makes me feel more in control. I'm excited about the integration of all 5Ps - it's a complete system, not just random advice. My biggest takeaway: success isn't about being perfect, it's about catching decline early and getting back on track quickly.`,
  4: `This week brought everything together into a real business plan. Writing my purpose statement was powerful - it clarified WHY I'm doing this beyond just making money. The product catalog and pricing exercise was intimidating at first, but breaking down the margins and understanding the economics gave me confidence. I now know exactly how much I need to sell to hit my income goals. The customer ecosystem map helped me see that I have more potential customers than I thought - I just need to systematically reach them. I'm starting to believe this can really work.`,
  5: `Process and Profit week was all about the nuts and bolts of running the business. Creating standard operating procedures felt tedious, but I know it will save me time and prevent mistakes once I'm busy. The financial projections exercise was sobering - it will take 5 months to break even, which means I need to be patient and not panic if growth is slow at first. But seeing the path to $18K profit in Year 1 is motivating. I'm glad I did the sensitivity analysis (best/base/worst case) because now I'm mentally prepared for different scenarios. The key insight: consistent execution of simple processes beats sporadic bursts of heroic effort.`,
  6: `AI week completely changed how I think about technology. I used to think AI was magic or that it would replace me. Now I understand it's a tool that amplifies my thinking if I configure it correctly. The ORC framework is brilliant - it gives me a repeatable system for getting good results. The exercise of building my first ORC template for social media ads was challenging but rewarding. I can already see how this will save me hours of work and help me create better marketing content. My biggest worry is becoming too dependent on AI and losing my own creative voice, but I think the key is using it as a collaborator, not a replacement.`,
  7: `This week was all about putting AI to work for marketing. I built 5 ORC templates for different marketing needs and actually used them to generate real content. Some of the AI output was great, some needed heavy editing, but all of it was faster than starting from scratch. The social media ad campaign plan exercise forced me to think strategically about budget allocation and success metrics. I'm excited to test these campaigns and see what works. The content calendar gives me a sustainable rhythm instead of posting randomly. I feel much more confident about marketing now - it's not mysterious anymore, it's just a system I can execute consistently.`,
  8: `Sales week pushed me out of my comfort zone. I'm not a natural salesperson, so the objection handling exercises were uncomfortable but necessary. Practicing responses to common objections helped me feel more prepared. The lead tracking system is simple but powerful - I can see exactly where leads are in the pipeline and what actions I need to take. The AI prompts for sales conversations will help me when I freeze up or don't know what to say. My biggest insight: sales isn't about being pushy or manipulative, it's about understanding what people need and showing them how BC solves their problem. I can do that authentically.`,
  9: `Launch week! The 30-day launch plan exercise made everything feel real and urgent. I have a specific timeline, specific goals, and specific actions for each week. The launch checklist is comprehensive - I won't forget critical steps. I'm nervous about the public launch (Week 3 of the plan) because that's when I'll be visible and accountable. But the soft launch with friends and family (Week 2) will give me practice and build confidence. I'm excited to finally put everything I've learned into action. The hardest part will be balancing execution with continued learning, but I have my weekly rituals to keep me on track.`,
  10: `Capstone week - I can't believe I've made it through all 10 weeks! Looking back at Week 1, I had no idea how much I would learn and how prepared I would feel. My business canvas is complete, my financial projections are solid, my AI tools are ready, and my launch plan is detailed. I have everything I need to succeed. The launch commitment exercise was emotional - signing my name to this commitment made it real. I'm scared and excited in equal measure. My biggest fear is still whether I can actually execute at the level I've planned, but I trust the system. If I follow the 5Ps, use my AI tools, and execute my processes consistently, I will succeed. Time to launch.`,
};

async function main() {
  console.log('🌱 Starting bootcamp completion seed...');

  // Find or create test user
  const testUser = await prisma.user.upsert({
    where: { id: TEST_USER_ID },
    update: {},
    create: {
      id: TEST_USER_ID,
      email: 'test@blackcardinal.com',
      name: 'Test Founder',
      role: 'FOUNDER',
    },
  });

  console.log('✅ Test user ready:', testUser.email);

  // Find or create bootcamp enrollment
  const enrollment = await prisma.bootcampEnrollment.upsert({
    where: { userId: testUser.id },
    update: {
      currentWeek: 2, // Week 1 is complete, now on Week 2
    },
    create: {
      userId: testUser.id,
      currentWeek: 2,
      startedAt: new Date(),
    },
  });

  console.log('✅ Bootcamp enrollment ready, currentWeek:', enrollment.currentWeek);

  // Seed weeks 2-10
  for (let weekNum = 2; weekNum <= 10; weekNum++) {
    console.log(`\n📝 Seeding Week ${weekNum}...`);

    // Create week progress
    const weekProgress = await prisma.weekProgress.upsert({
      where: {
        enrollmentId_weekNumber: {
          enrollmentId: enrollment.id,
          weekNumber: weekNum,
        },
      },
      update: {},
      create: {
        enrollmentId: enrollment.id,
        weekNumber: weekNum,
        lessonProgress: JSON.stringify({ 'lesson-1': true, 'lesson-2': true, 'lesson-3': true }),
        exercisesComplete: JSON.stringify(
          WEEK_EXERCISES[weekNum as keyof typeof WEEK_EXERCISES]?.reduce(
            (acc, ex) => {
              acc[ex.id] = { response: ex.response, completedAt: new Date().toISOString() };
              return acc;
            },
            {} as Record<string, { response: string; completedAt: string }>,
          ) || {},
        ),
        completedAt: new Date(),
      },
    });

    console.log(`  ✅ Week ${weekNum} progress created`);

    // Create reflection
    if (WEEK_REFLECTIONS[weekNum as keyof typeof WEEK_REFLECTIONS]) {
      await prisma.reflection.upsert({
        where: {
          enrollmentId_weekNumber: {
            enrollmentId: enrollment.id,
            weekNumber: weekNum,
          },
        },
        update: {},
        create: {
          enrollmentId: enrollment.id,
          weekNumber: weekNum,
          content: WEEK_REFLECTIONS[weekNum as keyof typeof WEEK_REFLECTIONS],
        },
      });

      console.log(`  ✅ Week ${weekNum} reflection created`);
    }
  }

  // Update enrollment to show all weeks complete
  await prisma.bootcampEnrollment.update({
    where: { id: enrollment.id },
    data: {
      currentWeek: 11, // All 10 weeks complete
      completedAt: new Date(),
    },
  });

  console.log('\n✅ All weeks seeded successfully!');
  console.log('📊 Bootcamp Status: 10/10 weeks complete (100%)');
  console.log('🎓 Test user can now access Business Canvas Builder');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding bootcamp:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

