# Implementation Plan: Task Subtasks with Automatic Status Tracking

**Branch**: `002-task-subtasks` | **Date**: 2026-01-29 | **Spec**: [/specs/002-task-subtasks/spec.md](/specs/002-task-subtasks/spec.md)
**Input**: Feature specification from `/specs/002-task-subtasks/spec.md`

## Summary

This feature allows users to break down tasks into subtasks (max 10) with automatic progress tracking. The implementation follows a reactive pattern: checking subtasks triggers a status recalculation in the NgRx reducer, automatically moving tasks between "Todo", "In Progress", and "Done" columns. The UI will leverage PrimeNG components for the subtask list and Tailwind for board-view indicators.

## Technical Context

**Language/Version**: TypeScript 5.4, Angular 17
**Primary Dependencies**: NgRx Store/Effects, PrimeNG, Tailwind CSS, uuid
**Storage**: json-server (db.json)
**Testing**: ESLint, Prettier (Unit tests via Karma/Jasmine to be added)
**Target Platform**: Web (Modern Browsers)
**Project Type**: Single Page Application (Web)
**Performance Goals**: Instant UI feedback (<100ms), API sync <500ms
**Constraints**: Nested data structure for subtasks to simplify json-server updates.
**Scale/Scope**: ~10 subtasks per task, hundreds of tasks per board.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Component-Driven**: Does this design leverage PrimeNG/Material components? (Using PrimeNG p-checkbox and inputGroup)
- [x] **Reactive State**: Is state managed via NgRx/Observables? (Atomic updates in NgRx reducer)
- [x] **Utility-First**: Is styling planned via Tailwind classes? (Indicators and layout via Tailwind)
- [x] **Type Safety**: Are interfaces/types defined for all new data? (Subtask and Task interfaces updated)
- [x] **Testability**: Is there a clear plan for unit/integration tests? (Reducer logic is purely functional and testable)

## Project Structure

### Documentation (this feature)

```text
specs/002-task-subtasks/
├── plan.md              # This file
├── research.md          # Data structure and state management strategy
├── data-model.md        # Subtask entity and relationship details
├── quickstart.md        # Manual verification steps
├── contracts/           
│   └── kanban.ts        # Updated TypeScript interfaces
└── tasks.md             # Implementation tasks (Next step)
```

### Source Code (Angular Layout)

```text
src/
├── app/
│   ├── models/          
│   │   └── kanban.model.ts  # Update with Subtask interface
│   ├── state/           
│   │   ├── kanban.actions.ts   # New subtask actions
│   │   └── kanban.reducer.ts   # Subtask/status logic
│   └── features/        
│       └── kanban/
│           ├── task-card/       # Progress indicator
│           └── task-form/       # Subtask management UI
```

**Structure Decision**: Standard Angular feature-based modular structure, keeping subtask logic within the kanban feature module.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |