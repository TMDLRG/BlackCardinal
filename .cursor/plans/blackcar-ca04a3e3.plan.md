<!-- ca04a3e3-7839-4abb-b458-ea36944f2243 60a6ac6f-91a1-4312-bfff-99ac0150502a -->
# Bootcamp Content Redesign Plan

## Overview

Restructure the 10-week bootcamp to flow logically from "What is Black Cardinal" → Personal 5Ps → Professional 5Ps/Franchise Model → ORC/AI Application → Capstone Launch Kit, ensuring each lesson is standalone yet builds toward a complete learning arc for first-time business owners.

## Current State Analysis

- Existing bootcamp has 10 weeks but content is disjointed
- Current Week 1 focuses on ORCHESTRATE/ORC but lacks Black Cardinal context
- Weeks 2-3 cover 5Ps but don't connect to franchise model
- No clear teaching on Black Cardinal products, BYOA services, or referral network
- Missing practical AI application for social ads, emails, lead tracking
- Capstone exists but doesn't deliver downloadable business launch kit

## New 10-Week Flow

### Week 1: Welcome to Black Cardinal

**Goal:** Understand what Black Cardinal is, the Founding 50 mission, and what you'll be selling

**Content:**

- Lesson 1: The Black Cardinal Story (luxury that speaks volumes, autism nonprofit mission, quiet details/bold impact)
- Lesson 2: The Three Revenue Streams (products, BYOA printing services, Founding 50 referrals)
- Lesson 3: Your Role as a Founding Member (franchise owner, brand ambassador, network builder)
- Exercise: Write your "Why Black Cardinal" statement
- Reflection: What drew you to this opportunity?

### Week 2-3: Personal 5Ps Foundation

**Goal:** Master the Personal 5Ps framework for individual success

**Week 2 Content:**

- Lesson 1: Proper - Your Values Under Pressure (from Part 1, Ch 1-2)
- Lesson 2: Preparation - Planning That Works (from Part 1, Ch 2)
- Lesson 3: Prevents - Early Warning Systems (from Part 1, Ch 3)
- Exercise: Values manifesto, 90-day plan, risk radar
- Reflection: Where do you need more discipline?

**Week 3 Content:**

- Lesson 1: Poor - Reading Decline Signals (from Part 1, Ch 4)
- Lesson 2: Performance - Reliable Execution (from Part 1, Ch 5)
- Lesson 3: The 5Ps Working Together (from Part 1, Ch 6)
- Exercise: Performance dashboard, weekly rhythm design
- Reflection: Which P is your weakest link?

### Week 4-5: Professional 5Ps & Franchise Model

**Goal:** Learn the Business 5Ps and how to build your Black Cardinal franchise

**Week 4 Content:**

- Lesson 1: Purpose - Your Black Cardinal Mission (who you serve locally)
- Lesson 2: Product - BC Product Catalog + BYOA Services (what you sell, pricing, margins)
- Lesson 3: People - Your Customer Ecosystem (target personas, referral network)
- Exercise: Local market analysis, customer persona cards
- Reflection: Who needs Black Cardinal in your community?

**Week 5 Content:**

- Lesson 1: Process - Your Operations Rhythm (from Part 3, Ch 11)
- Lesson 2: Profit - Unit Economics & Financial Planning (from Part 1, Ch 10)
- Lesson 3: Building Your Franchise Business Model
- Exercise: Revenue model, cost structure, break-even calculation
- Reflection: What's your 90-day revenue goal?

### Week 6-8: ORC & AI for Business Operations

**Goal:** Master ORCHESTRATE framework and apply AI to run your franchise

**Week 6 Content:**

- Lesson 1: What AI Is (and Isn't) - The Jukebox Analogy (from book_v11 Ch 1)
- Lesson 2: ORC Framework - Outcome, Role, Context (from book_v11 Ch 4-6)
- Lesson 3: Configuring AI for Your Business
- Exercise: Define outcomes for your top 3 business tasks
- Reflection: Where can AI save you 10 hours/week?

**Week 7 Content:**

- Lesson 1: AI for Social Media Ads (ORC template for Facebook/Instagram)
- Lesson 2: AI for Email Marketing (ORC template for customer outreach)
- Lesson 3: Prompt Libraries & Templates
- Exercise: Create 3 social ad variations using ORC
- Reflection: Which marketing channel will you own?

**Week 8 Content:**

- Lesson 1: AI for Lead Tracking (CRM setup, follow-up sequences)
- Lesson 2: AI for Sales Conversations (objection handling, closing scripts)
- Lesson 3: Validation & Quality Control (from book_v11 Ch 6)
- Exercise: Build your lead tracking system
- Reflection: How will you measure sales success?

### Week 9: Launch Preparation

**Goal:** Prepare for your franchise launch with marketing and operations plans

**Content:**

- Lesson 1: Go-to-Market Strategy (from Part 3, Ch 9)
- Lesson 2: Content Calendar & Acquisition Loops
- Lesson 3: Launch Checklist & First 30 Days
- Exercise: 30-day launch plan, content calendar
- Reflection: What's your biggest launch fear?

### Week 10: Capstone - Your Business Launch Kit

**Goal:** Assemble and download your complete business launch kit

**Content:**

- Lesson 1: Business Canvas Assembly (synthesize all previous work)
- Lesson 2: Financial Planner & Budget (90-day cash flow projection)
- Lesson 3: Your Commitment & Next Steps
- Exercise: Complete business canvas, download launch kit PDF
- Final Reflection: What's your Day 1 action?

## Implementation Approach

### Phase 1: Content Architecture

1. Create new content structure in `src/lib/bootcamp/content-v2.ts`
2. Extract key concepts from manuscripts and simplify to 7th grade reading level
3. Build lesson templates that follow consistent structure:

- Hook story (relatable scenario)
- Core concept (simple explanation with analogy)
- Black Cardinal application (how this applies to their franchise)
- Key takeaways (3-5 bullet points)

### Phase 2: Exercise Design

1. Redesign exercises to be practical and actionable
2. Each exercise builds an artifact they'll use in their business
3. Provide templates, examples, and helper text
4. Ensure exercises stack (Week 10 capstone uses outputs from Weeks 1-9)

### Phase 3: Capstone Deliverables

1. Build Business Canvas Builder that compiles all exercises
2. Create downloadable PDF generator for:

- Business Launch Kit (purpose, offers, processes, marketing plan)
- Financial Planner (revenue model, expenses, 90-day projections)
- AI Prompt Library (ORC templates for ads, emails, sales)

3. Add "Next Steps" checklist for Day 1 post-bootcamp

### Phase 4: Pedagogical Consistency

1. Establish consistent lesson arc across all weeks
2. Add progress indicators showing how each week builds on previous
3. Include "Prerequisites" and "What You'll Build" sections
4. Add glossary/reference section for key terms (ORC, 5Ps, etc.)

## Key Files to Modify

- `src/lib/bootcamp/content.ts` - Complete rewrite of lessons/exercises
- `src/lib/bootcamp/weeks.ts` - Update week metadata to match new flow
- `src/components/bootcamp/week/WeekModule.tsx` - May need UI adjustments
- `src/app/bootcamp/canvas/page.tsx` - Build capstone canvas builder
- `prisma/schema.prisma` - May need new fields for launch kit data

## Success Criteria

- Each week teaches 1 clear concept at 7th grade reading level
- All 10 weeks follow consistent pedagogical arc
- Lessons reference manuscripts but simplify language
- Exercises build toward capstone launch kit
- Week 10 delivers downloadable business plan + financial planner
- Clear progression: BC intro → Personal 5Ps → Business 5Ps → ORC/AI → Launch

### To-dos

- [ ] EPIC 1: Core Bootcamp Infrastructure & Database - Set up Prisma schema, API routes, and navigation components
- [ ] EPIC 2: Weeks 1-3 Content - Build ORC Foundation lessons (Week 1: ORCHESTRATE, Week 2: Business 5Ps, Week 3: Personal 5Ps)
- [ ] EPIC 3: Weeks 4-6 Content - Implement AI Integration lessons (Week 4: Purpose, Week 5: Product, Week 6: People)
- [ ] EPIC 4: Weeks 7-9 Content - Build Process & Execution lessons (Week 7: Process, Week 8: Profit, Week 9: Launch)
- [ ] EPIC 5: Week 10 & Business Canvas Builder - Complete capstone and interactive canvas with PDF export
- [ ] EPIC 6: Progress Tracking & Gamification - Build progress dashboard, achievements, and notifications
- [ ] EPIC 7: Testing & Quality Assurance - Comprehensive testing, performance optimization, and security audit
- [ ] Audit current bootcamp content and map to new 10-week structure
- [ ] Write Week 1 content: What is Black Cardinal, revenue streams, franchise model
- [ ] Write Weeks 2-3: Personal 5Ps (Proper, Preparation, Prevents, Poor, Performance) from Part 1
- [ ] Write Weeks 4-5: Professional 5Ps and BC franchise business model from manuscripts
- [ ] Write Weeks 6-8: ORC framework and AI applications (ads, emails, lead tracking) from book_v11
- [ ] Write Week 9: Launch preparation and go-to-market strategy from Part 3
- [ ] Write Week 10: Capstone with business canvas and downloadable launch kit
- [ ] Build interactive Business Canvas Builder that compiles all exercise outputs
- [ ] Implement PDF generator for Business Launch Kit and Financial Planner
- [ ] Review all content for 7th grade reading level, consistent arc, and clear progression