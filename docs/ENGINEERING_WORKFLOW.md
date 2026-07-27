# Engineering workflow

## Architecture decision

Base44 remains the production backend for the hosted application. Do not introduce Supabase or a second authentication, database, storage, or API authority unless a separate migration plan has been approved.

## Delivery workflow

1. Turn product ideas into scoped requirements, user stories, acceptance criteria, and data-impact notes.
2. Prototype substantial interface changes before implementation when the interaction is uncertain.
3. Implement changes in the repository that owns the affected surface.
4. Keep equivalent user-facing behavior aligned across `stockmaster-pro` and `Inventory-Wearhouse-` where their frameworks permit it.
5. Require a clean build and automated checks before publishing.
6. Use pull requests for substantial or risky work, with senior review for permissions, payment flows, multi-tenant data isolation, and production deployment.

## Responsibilities

- Base44: production backend, authentication, entities, integrations, and hosted application deployment.
- GitHub: source control, review history, CI, and release traceability.
- Codex and other coding agents: bounded implementation, testing, refactoring, and review support.
- Senior engineer: architecture, security, tenant isolation, payments, and final production approval.

## Minimum acceptance checks

- The application builds from a clean dependency install.
- Authentication and Base44 entity access remain unchanged unless explicitly in scope.
- No secrets or local Base44 app-link files are committed.
- Responsive and keyboard behavior is preserved for changed interfaces.
- Payment, role, and tenant-boundary changes include explicit tests and human review.
