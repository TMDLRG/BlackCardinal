# Cursor Rules Activation Guide
## BlackCardinal AI Development Team

Quick reference for how and when specialist personas activate in the Cursor IDE.

---

## Priority System

Rules apply in order of priority (0 = highest, loads first):

- **0**: Foundation (shared-context.mdc) - always loaded
- **1**: Orchestrator (maestro.mdc) + Critical (security-engineer.mdc) - always active
- **2**: Domain Specialists - file/keyword triggered
- **3**: Supporting Roles - keyword/file triggered

---

## File Pattern Triggers

Edit these files to automatically activate specialists:

### Frontend Architect
```
app/**/*.tsx
app/**/*.ts
components/**/*.tsx
components/**/*.ts
```
**Example**: Edit `app/page.tsx` → Frontend Architect activates

### Backend Engineer
```
app/api/**/*
lib/**/*.ts
actions/**/*.ts
```
**Example**: Edit `app/api/crm/leads/route.ts` → Backend Engineer activates

### Database Specialist
```
prisma/**/*
prisma/schema.prisma
prisma/migrations/**/*
```
**Example**: Edit `prisma/schema.prisma` → Database Specialist activates

### Security Engineer
```
middleware.ts
app/(auth)/**/*
lib/validators/**/*
lib/auth.ts
```
**Example**: Edit `middleware.ts` → Security Engineer activates

### Payments Engineer
```
lib/payments/**/*
app/api/webhooks/**/*
app/api/checkout/**/*
```
**Example**: Edit `app/api/webhooks/stripe/route.ts` → Payments Engineer activates

### Testing Engineer
```
tests/**/*
**/*.test.ts
**/*.test.tsx
**/*.spec.ts
```
**Example**: Edit `tests/e2e/checkout.spec.ts` → Testing Engineer activates

### DevOps Engineer
```
.env*
vercel.json
next.config.js
.github/workflows/**/*
```
**Example**: Edit `.env.example` → DevOps Engineer activates

### Technical Writer
```
**/*.md
docs/**/*
README.md
```
**Example**: Edit `README.md` → Technical Writer activates

---

## Keyword Triggers

Use these keywords in task descriptions to activate specialists:

### Frontend Architect
- "frontend"
- "UI"
- "component"
- "page"
- "React"
- "Next.js"

**Example**: "Create a hero component" → Frontend Architect

### Backend Engineer
- "backend"
- "API"
- "endpoint"
- "server"
- "route handler"

**Example**: "Add API endpoint for leads" → Backend Engineer

### Database Specialist
- "database"
- "schema"
- "migration"
- "Prisma"
- "SQL"

**Example**: "Create database migration for Lead table" → Database Specialist

### Security Engineer
- "security"
- "auth"
- "authentication"
- "authorization"
- "validation"
- "Zod"
- "CSRF"
- "webhook"

**Example**: "Add authentication to dashboard" → Security Engineer

### Payments Engineer
- "payment"
- "checkout"
- "Stripe"
- "crypto"
- "webhook"
- "refund"

**Example**: "Fix Stripe checkout flow" → Payments Engineer

### UX/Design Engineer
- "design"
- "UI/UX"
- "accessibility"
- "a11y"
- "brand"
- "hero"
- "WCAG"
- "color"
- "layout"

**Example**: "Design the hero section" → UX/Design Engineer

### Testing Engineer
- "test"
- "testing"
- "E2E"
- "Playwright"
- "Vitest"
- "TDD"
- "QA"

**Example**: "Write E2E test for login flow" → Testing Engineer

### DevOps Engineer
- "deploy"
- "deployment"
- "DevOps"
- "CI/CD"
- "Vercel"
- "environment"
- "monitoring"

**Example**: "Deploy to production" → DevOps Engineer

### Product Manager
- "feature"
- "requirement"
- "user story"
- "acceptance criteria"
- "slice"
- "planning"

**Example**: "Define requirements for Founding 50 feature" → Product Manager

### Technical Writer
- "documentation"
- "README"
- "docs"
- "guide"
- "runbook"

**Example**: "Document the API endpoints" → Technical Writer

---

## Always-Active Rules

These rules are ALWAYS loaded regardless of file or keywords:

### shared-context.mdc (Priority 0)
- **Purpose**: Single source of truth for all project standards
- **Contains**: Brand identity, tech stack, quality standards, data model
- **Usage**: All specialists reference this for consistency

### maestro.mdc (Priority 1)
- **Purpose**: Task orchestrator and coordinator
- **Function**: Analyzes tasks using O-R-C framework and delegates to specialists
- **Always active**: Coordinates all work

---

## Multi-Domain Activation

Some tasks trigger multiple specialists automatically:

### "Create login page"
**Triggers**: Maestro → Frontend Architect + Security Engineer + Testing Engineer
**Reason**: UI + Authentication + Testing

### "Add payment webhook"
**Triggers**: Maestro → Payments Engineer + Backend Engineer + Security Engineer + Testing Engineer
**Reason**: Payments + API + Security + Testing

### "Design hero section"
**Triggers**: Maestro → UX/Design Engineer + Frontend Architect + Testing Engineer
**Reason**: Design + Implementation + Testing

### "Deploy to production"
**Triggers**: Maestro → DevOps Engineer + Security Engineer + Testing Engineer
**Reason**: Deployment + Security check + Test validation

---

## Explicit Specialist Invocation

Override automatic activation by explicitly requesting a specialist:

```
"@frontend: Add loading spinner"
→ Only Frontend Architect activates

"@security: Review authentication middleware"
→ Only Security Engineer activates

"@testing: Write unit tests for CRM logic"
→ Only Testing Engineer activates
```

**Format**: `@<specialist>: <task description>`

---

## Testing Your Activation

### Method 1: File Edit
1. Open a file (e.g., `app/page.tsx`)
2. Relevant specialist should activate (Frontend Architect)
3. Task context should reference that specialist's expertise

### Method 2: Task Description
1. Describe a task: "Create the login page"
2. Maestro should analyze and mention which specialists are activated
3. You should see coordination between specialists

### Method 3: Check Priority
1. shared-context.mdc should always be referenced first
2. Maestro should always orchestrate
3. Domain specialists should activate based on patterns/keywords

---

## Troubleshooting

### Specialist Not Activating

**Problem**: Expected specialist didn't activate

**Solutions**:
1. **Use explicit invocation**: `@frontend: <task>`
2. **Add keywords**: Include trigger words from keyword list
3. **Edit relevant file**: Open file matching pattern

### Multiple Specialists Conflicting

**Problem**: Too many specialists activated, causing confusion

**Solutions**:
1. **Use explicit invocation**: Target specific specialist
2. **Trust Maestro**: Let orchestrator coordinate
3. **Narrow task**: Break into smaller, single-domain tasks

### Rules Not Loading

**Problem**: Cursor rules not being applied

**Solutions**:
1. **Check .cursorrules/ directory**: All .mdc files present?
2. **Verify frontmatter**: Each file has proper YAML frontmatter?
3. **Reload Cursor**: Restart Cursor IDE to reload rules

---

## Quick Command Reference

| Task Type | Command | Activates |
|---|---|---|
| Edit frontend file | Open `app/page.tsx` | Frontend Architect |
| Edit backend file | Open `app/api/*/route.ts` | Backend Engineer |
| Edit database schema | Open `prisma/schema.prisma` | Database Specialist |
| General task | "Create feature X" | Maestro → Relevant specialists |
| Explicit specialist | "@frontend: Do X" | Only Frontend Architect |
| Check activation | Ask "Which specialist for X?" | Maestro explains delegation |

---

**Remember**: The system is designed to activate the right specialists automatically. When in doubt, describe your task clearly and let Maestro orchestrate!




