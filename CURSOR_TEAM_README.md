# BlackCardinal AI Development Team
## Modern Cursor Rules System (November 2025)

This document explains the AI Development Team structure for the BlackCardinal project, implemented using the ORCHESTRATE Blueprinting methodology.

---

## Table of Contents

1. [Overview](#overview)
2. [Team Structure](#team-structure)
3. [How It Works](#how-it-works)
4. [Using the System](#using-the-system)
5. [Specialist Personas](#specialist-personas)
6. [Activation Patterns](#activation-patterns)
7. [Example Workflows](#example-workflows)
8. [3-Slice Delivery Support](#3-slice-delivery-support)
9. [Quality Standards](#quality-standards)
10. [Troubleshooting](#troubleshooting)

---

## Overview

The BlackCardinal project uses an **AI Development Team** pattern where a **Maestro** orchestrator delegates work to specialist AI personas based on task analysis using the ORCHESTRATE framework.

### Why This Approach?

- **Specialized Expertise**: Each persona is a staff-level expert in their domain
- **Consistent Quality**: All personas follow shared standards (`shared-context.mdc`)
- **Intelligent Delegation**: Maestro analyzes tasks and activates the right specialists
- **Reduced Context**: You don't repeat project standards—they're embedded in personas
- **Better Outcomes**: 95%+ first-try usability through systematic approach

### ORCHESTRATE Framework

All task analysis uses **O-R-C**:
- **O - OBJECTIVE**: What needs to be built/fixed/designed?
- **R - ROLE**: Which specialist(s) have the expertise?
- **C - CONTEXT**: What's the scope, dependencies, constraints?

---

## Team Structure

### Maestro (Orchestrator)

**Location**: `.cursorrules/maestro.mdc`

**Role**: Analyzes tasks using O-R-C framework and delegates to appropriate specialists.

**Capabilities**:
- Task analysis and specialist selection
- Multi-domain coordination
- Quality assurance (R-A-T validation)
- Cross-specialist integration

### Core Specialists

#### 1. Frontend Architect
**File**: `.cursorrules/frontend-architect.mdc`
**Domain**: Next.js App Router, React, TypeScript, Tailwind CSS, shadcn/ui
**Responsibilities**:
- Build production-ready pages and components
- Implement responsive, accessible UIs (WCAG 2.2 AA)
- Optimize performance (LCP < 2.5s)
- Maintain brand consistency

#### 2. Backend Engineer
**File**: `.cursorrules/backend-engineer.mdc`
**Domain**: API routes, server actions, NextAuth, Prisma
**Responsibilities**:
- Build secure, reliable API endpoints
- Implement authentication/authorization
- Handle business logic
- Integrate with database and third-party services

#### 3. Database Specialist
**File**: `.cursorrules/database-specialist.mdc`
**Domain**: Prisma, PostgreSQL, migrations, schema design
**Responsibilities**:
- Design and maintain database schema
- Create and test migrations
- Optimize queries for performance
- Ensure data integrity

#### 4. Security Engineer
**File**: `.cursorrules/security-engineer.mdc`
**Domain**: Input validation, authentication, authorization, OWASP Top 10
**Responsibilities**:
- Provide Zod validation schemas
- Implement authentication/authorization
- Verify webhook signatures
- Conduct security audits

#### 5. Payments Engineer
**File**: `.cursorrules/payments-engineer.mdc`
**Domain**: Stripe integration, crypto gateways, webhooks
**Responsibilities**:
- Implement Stripe checkout flows
- Build crypto gateway adapters
- Handle webhook processing
- Manage refunds and order tracking

#### 6. UX/Design Engineer
**File**: `.cursorrules/ux-design-engineer.mdc`
**Domain**: Brand identity, a11y, micro-interactions, visual design
**Responsibilities**:
- Design brand-aligned UIs (Disneyland awe × Ralph Lauren elegance)
- Ensure WCAG 2.2 AA compliance
- Create micro-interactions and animations
- Maintain visual consistency

#### 7. Testing Engineer
**File**: `.cursorrules/testing-engineer.mdc`
**Domain**: Playwright (E2E), Vitest (unit), Axe (a11y)
**Responsibilities**:
- Write tests BEFORE implementation (TDD)
- Create E2E tests for critical paths
- Implement unit tests for business logic
- Run accessibility audits

#### 8. DevOps Engineer
**File**: `.cursorrules/devops-engineer.mdc`
**Domain**: Vercel deployment, CI/CD, monitoring, env vars
**Responsibilities**:
- Configure deployment pipelines
- Manage environment variables
- Set up monitoring and alerting
- Document deployment procedures

### Supporting Specialists

#### 9. Product Manager
**File**: `.cursorrules/product-manager.mdc`
**Domain**: Requirements, user stories, acceptance criteria
**Responsibilities**:
- Define clear feature requirements
- Write user stories (INVEST format)
- Manage 3-slice delivery plan
- Prioritize features

#### 10. Technical Writer
**File**: `.cursorrules/technical-writer.mdc`
**Domain**: Documentation, README, API docs, runbooks
**Responsibilities**:
- Create comprehensive documentation
- Write setup guides
- Document APIs and deployment procedures
- Maintain README files

### Shared Context

**File**: `.cursorrules/shared-context.mdc`

**Purpose**: Single source of truth for all project standards.

**Contains**:
- Brand identity (voice, colors, typography)
- Tech stack specifications
- Quality standards (a11y, performance, security)
- Data model (Prisma schema)
- Routes and IA
- Development workflow
- 3-slice delivery plan

**Usage**: Every specialist references this file for consistency.

---

## Activation System (Modern Cursor IDE)

All specialist personas use **frontmatter activation triggers** to automatically engage based on:

1. **File Patterns**: Editing specific files activates relevant specialists
2. **Keywords**: Task descriptions with specific terms trigger specialists
3. **Priority Levels**: Controls which rules apply first (0 = highest)

### Activation Priorities

- **Priority 0**: `shared-context.mdc` (always loaded first - single source of truth)
- **Priority 1**: `maestro.mdc` (always active - orchestrates all work), `security-engineer.mdc` (security crosses all domains)
- **Priority 2**: Domain specialists (Frontend, Backend, Database, Payments, UX/Design, Testing, DevOps)
- **Priority 3**: Supporting roles (Product Manager, Technical Writer)

### Example Activations

**Edit `app/page.tsx`**:
→ Triggers: Frontend Architect (pattern: `app/**/*.tsx`)

**Edit `prisma/schema.prisma`**:
→ Triggers: Database Specialist (pattern: `prisma/**/*`)

**Task: "Create login page"**:
→ Triggers: Maestro analyzes → loads Frontend + Security + Testing (keywords: "login", "auth")

**Edit `.env.example`**:
→ Triggers: DevOps Engineer (pattern: `.env*`)

---

## How It Works

### 1. Task Analysis (O-R-C)

When you submit a task, the Maestro analyzes it:

```
User: "Create the login page"

Maestro Analysis:
O - OBJECTIVE: Build authentication UI and flow
R - ROLE: Frontend (UI) + Security (auth validation) + Testing (E2E)
C - CONTEXT: Needs NextAuth integration, form validation, error handling

Decision: Multi-domain feature requiring coordination
```

### 2. Specialist Activation

Maestro loads relevant persona files:

```
Loading:
- security-engineer.mdc (NextAuth config, validation schemas)
- frontend-architect.mdc (login UI, form components)
- testing-engineer.mdc (E2E test for login flow)

Coordination Plan:
1. Security Engineer defines validation rules and auth config
2. Frontend Architect builds UI using security's schemas
3. Testing Engineer writes E2E test for complete flow
```

### 3. Coordinated Execution

Specialists work together, each in their domain:

- **Security**: Provides Zod schemas, configures NextAuth
- **Frontend**: Implements UI with validation
- **Testing**: Creates E2E test covering the flow

### 4. Quality Assurance (R-A-T)

Before delivery, Maestro validates:

**R - REVIEW (DONE)**:
- ✓ All components complete
- ✓ Matches shared-context.mdc standards
- ✓ Serves BlackCardinal brand

**A - AUDIT (VERIFY)**:
- ✓ Security: Zod validation present
- ✓ Accessibility: WCAG 2.2 AA compliant
- ✓ Performance: Optimized

**T - TESTABILITY (PROVE)**:
- ✓ E2E test written and passing
- ✓ Edge cases handled

---

## Using the System

### Implicit Invocation (Automatic)

Simply describe what you need. Maestro will analyze and delegate:

```
"Create the Founding 50 pitch page"
→ Maestro analyzes → UX/Design + Frontend + Testing

"Fix the payment webhook 401 error"
→ Maestro analyzes → Payments + Security + Backend

"Add database migration for Lead.nextAt field"
→ Maestro analyzes → Database + Backend
```

### Explicit Invocation (Manual)

Request a specific specialist:

```
"@frontend: Add loading spinner to checkout button"
→ Frontend Architect only

"@security: Review authentication middleware"
→ Security Engineer only

"@testing: Write E2E test for bootcamp enrollment"
→ Testing Engineer only
```

### File-Based Activation

When you edit files, relevant specialists activate:

| File Pattern | Activated Specialist(s) |
|---|---|
| `app/**/*.tsx` | Frontend Architect |
| `app/api/**/*` | Backend Engineer |
| `prisma/schema.prisma` | Database Specialist |
| `lib/payments/**` | Payments Engineer |
| `middleware.ts` | Security Engineer |
| `tests/**` | Testing Engineer |
| `.env.example` | DevOps Engineer |
| `README.md` | Technical Writer |

---

## Activation Patterns

### Single-Domain Tasks

**Pattern**: One specialist handles the entire task.

**Example**: "Update hero section copy"
- **Activated**: Frontend Architect
- **Work**: Modify text in hero component
- **Validation**: Brand consistency check

### Multi-Domain Tasks

**Pattern**: Multiple specialists coordinate.

**Example**: "Create payment webhook handler"
- **Activated**: Payments Engineer + Backend Engineer + Security Engineer + Testing Engineer
- **Work**:
  - **Payments**: Stripe webhook logic
  - **Backend**: API route structure
  - **Security**: Signature verification
  - **Testing**: Webhook E2E test
- **Validation**: All quality gates pass

### Feature Development (Full Stack)

**Pattern**: Product Manager → Specialists → Testing Engineer

**Example**: "Build the Founder Dashboard CRM"
- **Phase 1**: Product Manager defines user stories and acceptance criteria
- **Phase 2**: Specialists implement:
  - **Database**: Lead and Deal schema
  - **Backend**: API endpoints for CRUD
  - **Security**: Validation schemas, auth checks
  - **Frontend**: Dashboard UI, forms
  - **UX/Design**: Brand-aligned design
- **Phase 3**: Testing Engineer writes E2E tests
- **Validation**: Acceptance criteria met

---

## Specialist Personas

### Quick Reference

| Specialist | When to Invoke | Key Responsibilities |
|---|---|---|
| **Frontend Architect** | UI, pages, components | Build accessible, performant UIs |
| **Backend Engineer** | APIs, server logic | Create secure, reliable endpoints |
| **Database Specialist** | Schema, migrations | Design and maintain data layer |
| **Security Engineer** | Auth, validation, audits | Ensure application security |
| **Payments Engineer** | Stripe, crypto, webhooks | Process payments reliably |
| **UX/Design Engineer** | Brand, a11y, design | Create beautiful, accessible UIs |
| **Testing Engineer** | Tests, QA, TDD | Ensure quality through tests |
| **DevOps Engineer** | Deployment, CI/CD | Maintain infrastructure |
| **Product Manager** | Requirements, stories | Define what to build |
| **Technical Writer** | Documentation, guides | Create clear documentation |

### Collaboration Triggers

Some specialists always collaborate:

- **Security Engineer** involved for: All forms, auth flows, payment handling, file uploads
- **Testing Engineer** involved for: All new features, bug fixes, critical paths
- **UX/Design Engineer** involved for: New pages, brand moments, accessibility concerns

---

## Example Workflows

### Workflow 1: New Feature (Bootcamp Week Content)

**User Request**: "Create Week 1 bootcamp page with ORC lesson content"

**Maestro Analysis**:
- Objective: New content page with lessons and progress tracking
- Role: Product Manager → Frontend + Backend + Testing
- Context: Slice 3 (Bootcamp + Toolkit), requires progress tracking

**Execution**:

1. **Product Manager** defines user story:
   ```
   As a founder enrolled in bootcamp
   I want to view Week 1 content (ORC lesson)
   So that I can learn the methodology

   Acceptance Criteria:
   - Lesson content displays clearly
   - Progress checkboxes save state
   - Navigation to Week 2 enabled after completion
   ```

2. **Frontend Architect** builds page:
   - `app/bootcamp/week-1/page.tsx`
   - Lesson content display
   - Progress checkboxes
   - Navigation UI

3. **Backend Engineer** creates API:
   - `app/api/enrollment/progress/route.ts`
   - Update progress endpoint
   - Fetch enrollment data

4. **Testing Engineer** writes tests:
   - E2E: Load page, check lesson, verify progress saved
   - Unit: Progress update logic

5. **Maestro** validates:
   - R-A-T quality gates pass
   - User story acceptance criteria met

**Result**: Week 1 page deployed, tested, and functional.

---

### Workflow 2: Bug Fix (Payment Webhook Failing)

**User Report**: "Payment webhook returns 401 error"

**Maestro Analysis**:
- Objective: Fix webhook authentication issue
- Role: Payments + Security (webhook signature verification)
- Context: Production bug, urgent

**Execution**:

1. **Maestro** coordinates investigation:
   - Payments Engineer checks webhook handler
   - Security Engineer verifies signature verification

2. **Security Engineer** identifies issue:
   - Webhook secret mismatch (env var incorrect)

3. **DevOps Engineer** fixes environment:
   - Updates STRIPE_WEBHOOK_SECRET in Vercel

4. **Payments Engineer** tests webhook:
   - Triggers test webhook with Stripe CLI
   - Verifies 200 response

5. **Testing Engineer** adds regression test:
   - Test webhook signature verification
   - Test invalid signature rejection

**Result**: Bug fixed, tested, and deployed with regression protection.

---

### Workflow 3: Design Implementation (Hero Section)

**User Request**: "Design and implement the hero 'world entry' moment"

**Maestro Analysis**:
- Objective: Create brand-defining first impression
- Role: UX/Design + Frontend (tight collaboration)
- Context: Slice 1, critical brand moment

**Execution**:

1. **UX/Design Engineer** designs:
   - Logo reveal animation
   - Layered background depth
   - Scroll indicator
   - Accessibility considerations (prefers-reduced-motion)

2. **Frontend Architect** implements:
   - Hero section component
   - CSS animations with fallbacks
   - Optimized logo image (next/image)
   - Semantic HTML

3. **Testing Engineer** validates:
   - Accessibility audit (Axe)
   - Visual regression test
   - Animation performance check

**Result**: Hero section live, accessible, and performant.

---

## 3-Slice Delivery Support

The AI Development Team is structured to support the 3-slice delivery plan:

### Slice 1: World + Funnel (Foundation)

**Goal**: Users can discover, purchase, and onboard

**Team Support**:
- **Product Manager**: Defines MVP features, acceptance criteria
- **UX/Design**: Hero world entry, Founding 50 pitch design
- **Frontend**: Home, pitch, checkout, orientation pages
- **Backend**: NextAuth integration, user/enrollment creation
- **Security**: Authentication, payment validation
- **Payments**: Stripe Checkout integration
- **Database**: User, Profile, Enrollment schema
- **Testing**: E2E flow: Anonymous → purchase → onboard
- **DevOps**: Deploy to staging, configure env vars

**Features**:
- Home page with hero reveal
- Founding 50 pitch page
- Authentication (magic link)
- Stripe checkout
- Account creation
- Orientation with .ics scheduler
- Roster opt-in

---

### Slice 2: Store + Crypto (Commerce)

**Goal**: Users can purchase merchandise and pay with crypto

**Team Support**:
- **Product Manager**: Product catalog requirements, crypto payment specs
- **Frontend**: Store listing, product pages, cart
- **Backend**: Product/Order APIs, webhook handlers
- **Payments**: Stripe products, crypto gateway adapter interface
- **Security**: Payment validation, webhook signature verification
- **Database**: Product, Order, Deal schema
- **Testing**: E2E: Browse → checkout (fiat + crypto) → receipt
- **DevOps**: Webhook endpoint registration, monitoring

**Features**:
- Product catalog (Core + Drops)
- Store UI with filtering
- Crypto gateway adapter (pluggable)
- Stripe + crypto webhooks
- Order history
- Email receipts

---

### Slice 3: Bootcamp + Toolkit (Platform)

**Goal**: Founders can learn and manage their business

**Team Support**:
- **Product Manager**: 10-week curriculum structure, CRM requirements
- **Frontend**: Bootcamp hub, week pages, dashboard, CRM UI
- **Backend**: Enrollment progress API, Lead/Deal CRUD
- **Database**: Progress tracking (JSON), Lead/Deal schema
- **UX/Design**: Dashboard layout, coaching prompt UI
- **Testing**: E2E: Complete lesson, create lead, export CSV
- **DevOps**: Scheduled jobs for reminders (cron)
- **Technical Writer**: Bootcamp content documentation

**Features**:
- Bootcamp hub (10-week navigation)
- Week 1-10 content pages (ORC, 5Ps, P2P sales, first sale)
- Progress tracking (checkboxes, quizzes)
- Founder toolkit (Leads, Deals, Reminders)
- .ics calendar file generation
- Coaching prompts (context-aware)
- CSV export for CRM data

---

## Quality Standards

All specialists follow these non-negotiable standards (from `shared-context.mdc`):

### Accessibility
- **WCAG 2.2 Level AA** minimum
- Semantic HTML, ARIA labels, keyboard navigation
- Color contrast ≥4.5:1 for text
- Touch targets ≥44px × 44px

### Security
- **Input validation**: Zod schemas for all user input
- **Authentication**: NextAuth session checks
- **Authorization**: Role-based access control
- **Webhook verification**: Signature validation
- **No secrets in code**: Environment variables only

### Performance
- **LCP < 2.5s** on mid-tier mobile
- **FID < 100ms**, **CLS < 0.1**
- Optimized images (next/image)
- Code splitting, lazy loading

### Testing
- **Test-driven development**: Tests before code
- **E2E tests** for critical paths
- **Unit tests** for business logic
- **Accessibility tests** (Axe) for all pages

### Code Quality
- **TypeScript strict mode**: Zero errors
- **No console.log** in production
- **No TODO comments**: Create issues instead
- **No placeholder data**: Use real content or [DATA NEEDED]

---

## Troubleshooting

### Issue: Specialist Not Activating

**Problem**: You expected a specialist but got a different one (or none).

**Solution**: Use explicit invocation:
```
"@frontend: Create the hero component"
```

Or provide more context for automatic delegation:
```
Instead of: "Fix the page"
Try: "Fix the login page UI (button not clickable)"
→ Triggers Frontend Architect
```

---

### Issue: Multiple Specialists Overlap

**Problem**: Specialists are duplicating work or conflicting.

**Solution**: Let Maestro coordinate. For multi-domain tasks, Maestro will:
1. Analyze dependencies
2. Establish execution order
3. Define interfaces between specialists

If still unclear, ask:
```
"Who should handle this task?" or "Break this into specialist tasks"
```

---

### Issue: Quality Gate Failing

**Problem**: R-A-T validation fails, work not delivered.

**Solution**:
1. Check error message (what gate failed?)
2. Common failures:
   - **TypeScript errors**: Fix type issues
   - **Accessibility violations**: Use Axe DevTools to identify
   - **Missing tests**: Write E2E or unit tests
   - **Security issues**: Add validation, auth checks

Specialists will refuse to deliver if quality standards aren't met. This is intentional—it protects the BlackCardinal brand.

---

### Issue: Need to Update Shared Context

**Problem**: Project standards changed, need to update all specialists.

**Solution**: Edit `.cursorrules/shared-context.mdc`. All specialists reference it automatically, so changes propagate immediately.

---

### Issue: Custom Specialist Needed

**Problem**: Need a specialist not in the current team (e.g., Mobile Engineer, AI/ML Engineer).

**Solution**: Create a new `.mdc` file using the Blueprinting methodology:

1. Copy an existing persona as template (e.g., `frontend-architect.mdc`)
2. Customize for new domain:
   - Update OBJECTIVE, ROLE, CONTEXT
   - Define DOMAIN EXPERTISE
   - Specify QUALITY GATES
   - List COLLABORATION TRIGGERS
3. Save as `.cursorrules/new-specialist.mdc`
4. Add to Maestro's specialist list (update `.cursorrules/maestro.mdc`)

---

## Summary

The BlackCardinal AI Development Team provides:

✓ **Specialized Expertise**: 11 staff-level specialists across all domains
✓ **Intelligent Coordination**: Maestro orchestrates multi-domain work
✓ **Consistent Quality**: Shared context ensures standards across all work
✓ **Rapid Development**: Specialists work in parallel when possible
✓ **Built-in QA**: R-A-T validation before delivery
✓ **3-Slice Support**: Team structured for vertical slice delivery

### Quick Start

1. **Describe your task**: Maestro analyzes and delegates
2. **Review output**: Specialists deliver coordinated work
3. **Trust the process**: Quality gates ensure excellence

### Key Files

- `.cursorrules/shared-context.mdc` - Project standards (single source of truth)
- `.cursorrules/maestro.mdc` - Task orchestrator
- `.cursorrules/*-*.mdc` - Specialist personas (11 total)

### Next Steps

- Review `shared-context.mdc` to understand project standards
- Try a simple task: "Create a button component"
- Try a complex task: "Build the Founding 50 checkout flow"
- Watch Maestro delegate and coordinate specialists

---

**Welcome to orchestrated excellence. The BlackCardinal brand demands nothing less.**

