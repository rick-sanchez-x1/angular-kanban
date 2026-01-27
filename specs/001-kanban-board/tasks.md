# Tasks: 001-kanban-board

**Input**: Design documents from `/specs/001-kanban-board/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/kanban.ts

**Tests**: Manual verification only (no automated testing stack requested).

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Angular Project**: `src/app/`, `src/assets/`, `src/app/state/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Create Kanban feature module in src/app/features/kanban/kanban.module.ts
- [X] T002 Setup feature route for the Kanban board in src/app/app.routes.ts
- [X] T003 Configure initial NgRx state structure for Kanban in src/app/state/kanban.reducer.ts
- [X] T004 [P] Verify Tailwind CSS configuration for custom column colors in tailwind.config.js

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T005 [P] Define Task and User interfaces in src/app/models/kanban.model.ts based on contracts/kanban.ts
- [X] T006 [P] Implement KanbanService for HTTP communication with db.json in src/app/services/kanban.service.ts
- [X] T007 Define NgRx actions for loading and updating tasks/users in src/app/state/kanban.actions.ts
- [X] T008 Implement NgRx reducer and selectors for KanbanState in src/app/state/kanban.reducer.ts and src/app/state/kanban.selectors.ts
- [X] T009 Implement NgRx effects for initial data load and persistence in src/app/state/kanban.effects.ts
- [X] T010 [P] Populate initial mock data (Users and Tasks) in db.json

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Core Kanban Workflow (Priority: P1) 🎯 MVP

**Goal**: Display a 3-column board and support moving tasks between columns with optimistic updates.

**Independent Test**: Drag a task from "To Do" to "In Progress" and verify the header counts update and the change persists on reload.

### Implementation for User Story 1

- [X] T011 [P] [US1] Create BoardComponent container in src/app/features/kanban/board/board.component.ts
- [X] T012 [P] [US1] Create ColumnComponent for task grouping in src/app/features/kanban/column/column.component.ts
- [X] T013 [P] [US1] Create TaskCardComponent for board items in src/app/features/kanban/task-card/task-card.component.ts
- [X] T014 [US1] Implement drag-and-drop logic using `@angular/cdk/drag-drop` in src/app/features/kanban/board/board.component.ts
- [X] T015 [US1] Implement optimistic update logic for task movement in src/app/state/kanban.effects.ts
- [X] T016 [US1] Apply Tailwind CSS for column styling (Blue, Amber, Emerald) in src/app/features/kanban/column/column.component.html

**Checkpoint**: Core Kanban movement functional and persistent.

---

## Phase 4: User Story 2 - Task Management (Priority: P1)

**Goal**: Enable creation of new tasks and deletion of existing ones with confirmation.

**Independent Test**: Create a task via "Create Task" button, verify it appears in "To Do", then delete it and confirm it is removed from the board and backend.

### Implementation for User Story 2

- [X] T017 [P] [US2] Create TaskFormComponent using Reactive Forms in src/app/features/kanban/task-form/task-form.component.ts
- [X] T018 [US2] Integrate TaskFormComponent into a PrimeNG Dialog for task creation in src/app/features/kanban/board/board.component.ts
- [X] T019 [US2] Implement Delete action with PrimeNG ConfirmDialog in src/app/features/kanban/task-card/task-card.component.ts
- [X] T020 [US2] Implement NgRx actions and effects for task creation and deletion in src/app/state/kanban.actions.ts and src/app/state/kanban.effects.ts

**Checkpoint**: Users can now fully manage the task lifecycle (Create/Delete).

---

## Phase 5: User Story 3 - Task Details & Editing (Priority: P2)

**Goal**: View and modify detailed task information in a modal view.

**Independent Test**: Click a task card to open the modal, change the title/description, save, and verify the card updates on the board.

### Implementation for User Story 3

- [X] T021 [US3] Extend TaskFormComponent to support edit mode in src/app/features/kanban/task-form/task-form.component.ts
- [X] T022 [US3] Implement click-to-open detail modal on TaskCardComponent in src/app/features/kanban/task-card/task-card.component.ts
- [X] T023 [US3] Implement NgRx action and effect for task updates in src/app/state/kanban.actions.ts and src/app/state/kanban.effects.ts

**Checkpoint**: Tasks can now be inspected and updated in detail.

---

## Phase 6: User Story 4 - Interface Customization (Priority: P3)

**Goal**: Toggle between Light and Dark modes with state persistence in LocalStorage.

**Independent Test**: Toggle the theme and verify the entire UI updates, then reload to ensure the choice was remembered.

### Implementation for User Story 4

- [X] T024 [P] [US4] Implement ThemeService for mode management in src/app/services/theme.service.ts
- [X] T025 [US4] Create ThemeToggleComponent in src/app/components/theme-toggle/theme-toggle.component.ts
- [X] T026 [US4] Configure Tailwind dark mode strategy and global styles in src/styles.css

**Checkpoint**: Application supports user-selected themes.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T027 [P] Implement text truncation for long task descriptions in src/app/features/kanban/task-card/task-card.component.html
- [X] T028 Add loading spinners and PrimeNG Toast notifications for API errors in src/app/features/kanban/board/board.component.ts
- [X] T029 Perform final manual verification against scenarios in specs/001-kanban-board/quickstart.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies.
- **Foundational (Phase 2)**: Depends on Setup - BLOCKS all user stories.
- **User Stories (Phase 3+)**: All depend on Foundational phase completion.
  - Can proceed in priority order (P1 → P2 → P3).
- **Polish (Final Phase)**: Depends on all user stories being complete.

### Parallel Opportunities

- Setup tasks marked [P] can run in parallel.
- Foundational tasks marked [P] can run in parallel.
- US1, US2, US4 implementation tasks marked [P] can run in parallel within their respective stories.
- Once Phase 2 is complete, US1, US2, and US4 could technically be started in parallel as they touch different UI components/logic.

---

## Implementation Strategy

### MVP First (User Story 1 & 2)

1. Complete Phase 1 & 2 (Foundation).
2. Complete Phase 3 (Workflow) and Phase 4 (Management).
3. **STOP and VALIDATE**: Verify core Kanban functionality.

### Incremental Delivery

1. Add US3 (Editing) for detail-oriented users.
2. Add US4 (Theming) for UX polish.
3. Finish with Phase 7 (Polish).
