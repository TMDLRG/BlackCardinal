# Bootcamp QA & Test Plan (EPIC 7)

Date: November 8, 2025  
Scope: Automated + Manual testing coverage for the Bootcamp experience

---

## Automated Test Skeletons

> NOTE: The project does not yet ship with a configured Jest/Vitest harness.  
> The following file layout has been prepared so the team can plug in the preferred runner.

```
tests/
├── bootcamp/
│   ├── api/
│   │   ├── enrollment.test.ts      // Enrollment CRUD + week unlocking
│   │   ├── week-progress.test.ts   // Lesson/exercise persistence
│   │   └── canvas.test.ts          // Canvas CRUD + validation
│   └── ui/
│       ├── week-module.test.tsx    // WeekModule interactions
│       ├── canvas-builder.test.tsx // Canvas builder autosave + preview
│       └── progress-dashboard.test.tsx
└── utils/
    └── bootcamp-content.test.ts    // Content integrity across weeks
```

Each spec should cover:

- 200/401/404 responses for protected API routes
- Data validation (invalid payloads rejected, JSON persisted correctly)
- UI interaction flows (marking lessons complete, saving exercises, completing weeks)
- Regression checks for Test Mode

---

## Manual Test Matrix

| Area | Scenario | Result |
|------|----------|--------|
| Enrollment | Visit `/bootcamp` as new founder | ✅ Enrollment auto-creates, Week 1 unlocked |
| Week Module | Complete Week 1 lessons + exercises + reflection | ✅ Week marks complete, Week 2 unlocks |
| Week Labs | Week 4 Purpose Lab generator | ✅ Generates 3 statements, copy works |
| Canvas | Update fields, observe autosave, export JSON | ✅ Autosave updates DB, JSON download match |
| Progress | `/bootcamp/progress` metrics align with DB | ✅ Lessons/exercises/reflections counts accurate |
| Notifications | Toggle reminders | ✅ PATCH updates `notificationsEnabled` |
| Test Mode | `/bootcamp/week/5` under Test Mode | ✅ Mock data renders, no backend writes |

See `../BOOTCAMP_QA_SUMMARY.md` for detailed walkthrough.

---

## Performance Checklist

- [x] All bootcamp pages set to `force-dynamic` to avoid caching stale state.
- [x] Server-side data fetching scoped with minimal includes.
- [x] Canvas builder renders preview lazily (toggle).
- [x] No blocking external scripts.

---

## Security Checklist

- [x] Auth required for all bootcamp API routes.
- [x] Test Mode bypass returns mock data only.
- [x] Prisma queries scoped by `userId`.
- [x] No sensitive information exposed in JSON exports (user-only data).

---

## Next Steps

- Wire up Vitest + Playwright for automated coverage.
- Add rate limiting to bootcamp APIs if public traffic grows.
- Integrate Cypress smoke tests for core flows.

