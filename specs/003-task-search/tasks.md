# Tasks: Task Search

**Feature**: Task Search (003-task-search)
**Spec**: specs/003-task-search/spec.md
**Plan**: specs/003-task-search/plan.md

## Phase 1: Setup
- [X] T001 Create `src/app/utils/search.util.ts`
- [X] T002 Create `src/app/pipes/highlight.pipe.ts`
- [X] T003 Create `src/app/utils/search.util.spec.ts`

## Phase 2: Foundational
- [X] T004 Install `fuse.js` and implement `fuzzySearchTasks` in `src/app/utils/search.util.ts`
- [X] T005 Remove custom `levenshteinDistance` and `fuzzyMatchTask`
- [X] T006 Register `HighlightPipe` in `src/app/features/kanban/kanban.module.ts`

## Phase 3: User Story 1 - Real-time Task Filtering
- [X] T007 [US1] Add `searchQuery` signal to `src/app/features/kanban/board/board.component.ts`
- [X] T008 [US1] Add search input UI to `src/app/features/kanban/board/board.component.html`
- [X] T009 [US1] Update `src/app/features/kanban/board/board.component.ts` to use `fuzzySearchTasks`

## Phase 4: User Story 2 - Fuzzy Search Logic
- [X] T010 [US2] Add specific test cases for fuzzy matching in `src/app/utils/search.util.spec.ts` (e.g. "Meting" -> "Meeting")

## Phase 5: User Story 3 - Match Highlighting
- [X] T011 [US3] Implement `HighlightPipe` logic in `src/app/pipes/highlight.pipe.ts`
- [X] T012 [US3] Update `src/app/features/kanban/column/column.component.ts` to accept `searchQuery` input
- [X] T013 [US3] Update `src/app/features/kanban/task-card/task-card.component.ts` to accept `searchQuery` input
- [X] T014 [US3] Update `src/app/features/kanban/board/board.component.html` to pass query to columns
- [X] T015 [US3] Update `src/app/features/kanban/column/column.component.html` to pass query to cards
- [X] T016 [US3] Apply `highlight` pipe in `src/app/features/kanban/task-card/task-card.component.html`

## Dependencies
- US1 requires Setup & Foundational
- US2 requires US1 (refinement of logic)
- US3 requires US1 (needs search query state)

## Implementation Strategy
1.  **Core Algo**: Build the fuzzy search utility first and test it (T001-T005).
2.  **State & UI**: Add the search bar and filter logic to the board (T007-T009). This delivers MVP.
3.  **Polish**: Add highlighting (T011-T016) to improve UX.
