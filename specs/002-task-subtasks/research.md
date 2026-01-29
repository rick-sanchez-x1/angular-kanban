# Research: Task Subtasks

**Feature**: Task Subtasks with Automatic Status Tracking
**Branch**: `002-task-subtasks`

## 1. Data Structure Strategy

**Question**: How should subtasks be associated with tasks given the `json-server` backend?

- **Option A**: Separate `Subtask` collection with `taskId` foreign key.
- **Option B**: Nested `subtasks` array within the `Task` object.

**Decision**: **Option B (Nested Array)**

**Rationale**:
- `json-server` and NoSQL-like document stores work best with nested data for atomic updates.
- Loading a Board usually requires loading all Tasks. Fetching Subtasks separately would require $N+1$ queries or a complex join which `json-server` doesn't support natively for deep nesting easily.
- Atomic updates: Saving a task with its subtasks ensures consistency.

**Implications**:
- The `Task` interface will be updated to include `subtasks: Subtask[]`.
- API calls to update a task will send the entire task object including subtasks.

## 2. State Management (NgRx)

**Question**: Where should the business logic for "Automatic Status Updates" reside?

- **Option A**: In the **Component**. (Bad: fragmentation, hard to test).
- **Option B**: In an **Effect**. (Listens to `ToggleSubtask`, checks logic, dispatches `UpdateTaskStatus`).
- **Option C**: In the **Reducer**. (When `ToggleSubtask` is processed, also calculate and update `status`).

**Decision**: **Option C (Reducer)**

**Rationale**:
- **Immediate Consistency**: The UI updates instantly without waiting for an async round-trip or a second action dispatch.
- **Single Source of Truth**: The state change is atomic. You cannot have a state where the subtask is done but the parent status hasn't updated yet.
- **Simplicity**: Avoids effect chains (`Toggle` -> `UpdateStatus`).

**Flow**:
1. User checks box.
2. Action `TaskActions.toggleSubtask({ taskId, subtaskId })` dispatched.
3. Reducer:
   - Finds task.
   - Toggles subtask `isCompleted`.
   - Checks all subtasks.
   - Updates `status` to 'inprogress' or 'done' based on rules.
4. Effect:
   - Listens for `toggleSubtask`.
   - Selects the updated Task from Store (or constructs it).
   - Calls `KanbanService.updateTask(task)`.

## 3. UI Implementation

**Question**: How to implement the subtask list in the Task Form/Detail view?

**Decision**: **PrimeNG Components**

- Use `p-checkbox` for the toggle.
- Use `p-inputGroup` for adding new subtasks (Text input + "Add" button).
- Use `p-progressBar` or simple text (e.g., "3/5") for the Board Card view.

**Rationale**:
- Consistent with "Utility-First Styling" and "Component-Driven UI" constitution principles.
- PrimeNG is already established.

## 4. Unknowns Resolved
- **Limit**: Soft limit of 10 confirmed. UI will show a warning or visual indicator but won't strictly block >10 (per "Soft limit" definition).
- **Manual Done**: Confirmed that moving Parent to "Done" marks all subtasks as "Done". This will be handled in the `TaskActions.updateTask` or a specific `TaskActions.moveTask` reducer case.

