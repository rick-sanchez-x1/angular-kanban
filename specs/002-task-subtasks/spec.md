# Feature Specification: Task Subtasks with Automatic Status Tracking

**Feature Branch**: `002-task-subtasks`  
**Created**: 2026-01-29  
**Status**: Draft  
**Input**: User description: "Create a new spec for a feature where the user can optionally add subtasks for a task. Ther user can complete the tasks using by toggling a checkbox. If atleast one of the checkboxes is checked, the task is considered 'In Progress' and If all the checkboxes are completed, the task is considered 'Done'. Show how many subtasks, if any, is completed in the column view as well."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Create and Manage Subtasks (Priority: P1)

As a user, I want to break down a complex task into smaller, manageable subtasks within the task details view, so that I can track granular progress.

**Why this priority**: Core functionality that enables the feature's purpose. Without the ability to create subtasks, no other logic can be applied.

**Independent Test**: Can be tested by opening a task, adding multiple subtasks with titles, and verifying they are persisted and displayed correctly.

**Acceptance Scenarios**:

1. **Given** a task is open in detail view, **When** I enter a subtask title and save, **Then** the subtask should appear in the task's subtask list.
2. **Given** a task has subtasks, **When** I toggle the checkbox of a subtask, **Then** its completion status should be updated and saved.
3. **Given** a task has subtasks, **When** I edit or delete a subtask, **Then** the list should reflect these changes immediately.

---

### User Story 2 - Automatic Task Status Updates (Priority: P1)

As a user, I want the task's status to automatically update based on the completion of its subtasks, so that I don't have to manually move tasks through the workflow.

**Why this priority**: This is a key business rule defined in the feature request. It automates the workflow and ensures consistency.

**Independent Test**: Can be tested by adding subtasks to a "Todo" task and toggling them to see if the task moves to "In Progress" or "Done" columns automatically.

**Acceptance Scenarios**:

1. **Given** a task in "Todo" with multiple subtasks, **When** I check at least one (but not all) subtasks, **Then** the task status should automatically change to "In Progress".
2. **Given** a task with multiple subtasks, **When** I check all subtasks, **Then** the task status should automatically change to "Done".
3. **Given** a task is "Done" because all subtasks were checked, **When** I uncheck one subtask, **Then** the task status should move back to "In Progress".
4. **Given** a task has subtasks and I manually move it to "Done", **When** I confirm the action, **Then** all subtasks should be automatically marked as completed to ensure consistency.

---

### User Story 3 - Progress Visibility in Board View (Priority: P2)

As a user, I want to see the subtask completion progress on the task cards in the board view, so that I can get a quick overview of progress without opening every task.

**Why this priority**: Enhances the user experience by providing visibility into task progress at a glance.

**Independent Test**: Can be tested by viewing the kanban board and verifying that tasks with subtasks display a progress indicator (e.g., "1/3").

**Acceptance Scenarios**:

1. **Given** a task has subtasks, **When** I view the board, **Then** I should see a count of completed subtasks vs total subtasks (e.g., "2/5") on the task card.
2. **Given** a task has no subtasks, **When** I view the board, **Then** no subtask progress indicator should be shown.

---

### Edge Cases

- **Empty Subtasks**: What happens if a subtask is created with no title? (Assumption: Subtasks must have a non-empty title).
- **Manual Status Override**: What happens if a user manually moves a task to a different column while it has subtasks? (Assumption: The manual move is allowed, but subsequent subtask toggles will still follow the auto-update logic).
- **Deleting all Subtasks**: If all subtasks are deleted from a task that was moved to "In Progress" because of them, what should its status be? (Assumption: It remains in its current status until manually changed or new subtasks are added).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST allow users to add, edit, and delete subtasks for any existing task.
- **FR-002**: Each subtask MUST have a title and a boolean completion status.
- **FR-003**: System MUST automatically update the parent task's status to "In Progress" when at least one subtask is marked as completed (and at least one remains uncompleted).
- **FR-004**: System MUST automatically update the parent task's status to "Done" when all subtasks are marked as completed.
- **FR-005**: System MUST display the subtask completion progress (e.g., "X of Y") on the task card in the board/column view for tasks that have at least one subtask.
- **FR-006**: Subtasks MUST be persisted along with the parent task.
- **FR-007**: System SHOULD encourage a soft limit of 10 subtasks per task to maintain focus and UI clarity.

### Key Entities *(include if feature involves data)*

- **Subtask**: Represents a smaller unit of work within a task.
    - Attributes: `id` (unique identifier), `title` (text), `isCompleted` (boolean).
- **Task**: (Updated) Now contains a collection of Subtasks.
    - Relationship: One-to-many relationship with Subtasks.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can add a subtask to an existing task in under 10 seconds.
- **SC-002**: Task status updates automatically within 500ms of a subtask being toggled.
- **SC-003**: The subtask progress indicator is visible and accurate on all task cards in the board view.
- **SC-004**: 100% of subtask data is correctly persisted and recovered after a page reload.
