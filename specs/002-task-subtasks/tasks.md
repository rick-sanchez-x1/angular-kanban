# Tasks: Task Subtasks with Automatic Status Tracking

**Branch**: `002-task-subtasks`
**Status**: Pending

## Phase 1: Setup & Data Model (Foundational)

**Goal**: Establish the data structure for subtasks and ensure the backend/mock DB supports the new nested data.
**Test Criteria**: Application builds without errors; `Task` interface includes `subtasks` array.

- [ ] T001 Update `Task` and `Subtask` interfaces in `src/app/models/kanban.model.ts`
- [ ] T002 Sync `contracts/kanban.ts` with the app model if necessary in `specs/002-task-subtasks/contracts/kanban.ts`
- [ ] T003 Update `KanbanService` to handle subtask persistence (if not automatically handled by task update) in `src/app/services/kanban.service.ts`

## Phase 2: User Story 1 - Create and Manage Subtasks (P1)

**Goal**: Users can add, edit, toggle, and delete subtasks in the Task Detail view.
**Independent Test**: Open Task Form, add 3 subtasks, save. Reload page -> subtasks persist.

### State Management
- [ ] T004 [US1] Define actions for `addSubtask`, `updateSubtask`, `deleteSubtask`, `toggleSubtask` in `src/app/state/kanban.actions.ts`
- [ ] T005 [US1] Implement reducer logic to handle subtask addition/deletion in `src/app/state/kanban.reducer.ts`
- [ ] T006 [US1] Add unit tests for subtask reducer logic in `src/app/state/kanban.reducer.spec.ts`

### UI Implementation
- [ ] T007 [US1] Add subtask list section to `src/app/features/kanban/task-form/task-form.component.html` using PrimeNG `p-checkbox` and `inputGroup`
- [ ] T008 [US1] Implement subtask form logic (add, remove, toggle handlers) in `src/app/features/kanban/task-form/task-form.component.ts`
- [ ] T009 [US1] Implement "soft limit" warning when subtasks > 10 in `src/app/features/kanban/task-form/task-form.component.ts`

## Phase 3: User Story 2 - Automatic Status Updates (P1)

**Goal**: Toggling subtasks updates parent Task status automatically. Moving Task to "Done" completes subtasks.
**Independent Test**: Check 1 subtask -> Task moves to "In Progress". Check all -> Task moves to "Done".

### State Management
- [ ] T010 [US2] Update reducer to recalculate Task status when `toggleSubtask` action is dispatched in `src/app/state/kanban.reducer.ts`
- [ ] T011 [US2] Update reducer to mark all subtasks as completed when `updateTaskStatus` (to 'done') is dispatched in `src/app/state/kanban.reducer.ts`
- [ ] T012 [US2] Add unit tests for status transition logic in `src/app/state/kanban.reducer.spec.ts`

### Integration
- [ ] T013 [US2] Verify `KanbanEffects` correctly saves the updated task (with status change) in `src/app/state/kanban.effects.ts`

## Phase 4: User Story 3 - Progress Visibility in Board View (P2)

**Goal**: Show "X/Y" progress on task cards.
**Independent Test**: Board view shows "1/3" on tasks with subtasks.

### UI Implementation
- [ ] T014 [US3] Add progress indicator (e.g., text or small bar) to `src/app/features/kanban/task-card/task-card.component.html`
- [ ] T015 [US3] Add getter/logic to calculate progress string in `src/app/features/kanban/task-card/task-card.component.ts`

## Phase 5: Polish & Cross-Cutting

**Goal**: Ensure smooth UX and handle edge cases.

- [ ] T016 Verify accessibility (ARIA labels) for subtask checkboxes in `src/app/features/kanban/task-form/task-form.component.html`
- [ ] T017 Ensure data persistence works for nested subtasks via `json-server` (verify `db.json` structure)
- [ ] T018 Run full lint and format check `npm run lint` & `npm run format`

## Implementation Strategy
1. **MVP (Phases 1-3)**: Focus on adding subtasks and the auto-status logic first. This delivers the core value.
2. **Enhanced UX (Phase 4)**: Add the visual indicators on the board once the logic is solid.
3. **Refinement (Phase 5)**: Accessibility and edge cases.

## Dependencies
- US2 depends on US1 (need subtasks to have status logic).
- US3 depends on US1 (need subtasks to show progress).
- T010/T011 (Reducer logic) can be implemented alongside T005.

## Parallel Execution Opportunities
- T014/T015 (Card View) can be built in parallel with T007/T008 (Form View) once T001 (Model) is done.
