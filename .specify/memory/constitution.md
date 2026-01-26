<!--
Sync Impact Report:
- Version change: [TEMPLATE] -> 1.0.0
- List of modified principles:
  - PRINCIPLE_1: Component-Driven UI
  - PRINCIPLE_2: Reactive State Management
  - PRINCIPLE_3: Utility-First Styling
  - PRINCIPLE_4: Type Safety & Quality
  - PRINCIPLE_5: Test-Driven Development (TDD)
- Added sections:
  - Technology Stack & Architectural Constraints
  - Development Workflow
- Removed sections: None
- Templates requiring updates:
  - .specify/templates/plan-template.md (✅ updated)
  - .specify/templates/tasks-template.md (✅ updated)
- Follow-up TODOs: None
-->

# KanbanBoard Constitution

## Core Principles

### I. Reactive State Management
Use NgRx for managing complex application state. All state changes must be handled through actions, reducers, and selectors. Prefer observables for data flow to ensure a reactive and predictable UI.

### II. Utility-First Styling
Use Tailwind CSS for all styling needs. Avoid custom CSS files unless absolutely necessary for complex animations or third-party overrides. Follow Tailwind's utility-first approach to maintain a consistent and scalable design system.

### III. Type Safety & Quality
Enforce strict TypeScript types across the codebase. Leverage ESLint and Prettier for automated code quality and formatting checks. All code must pass linting and formatting before being committed.

## Technology Stack & Architectural Constraints
- **Frontend Framework**: Angular 17
- **UI Libraries**: PrimeNG (Primary),
- **Styling**: Tailwind CSS
- **State Management**: NgRx Store
- **Package Manager**: npm
- **Database (Mock)**: json-server using `db.json`

## Development Workflow
1. **Scaffolding**: Use Angular CLI (`ng generate`) for creating components, services, and modules.
2. **Formatting**: Run `npm run format` (Prettier) before every commit.
3. **Linting**: Ensure `eslint` passes without errors.
4. **Local Development**: Use `ng serve` for development and `json-server` for mock API if required.

## Governance
- This Constitution supersedes all other informal practices.
- Amendments require a proposal, documentation of the change, and a version bump.
- All code reviews must verify compliance with these principles.
- Use `.specify/templates` for consistent feature planning and task management.

**Version**: 1.0.0 | **Ratified**: 2026-01-26 | **Last Amended**: 2026-01-26
