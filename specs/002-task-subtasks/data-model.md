# Data Model: Task Subtasks

## Entities

### Subtask

Represents a single unit of work within a parent Task.

| Field         | Type      | Required | Description                      |
| ------------- | --------- | -------- | -------------------------------- |
| `id`          | `string`  | Yes      | Unique UUID.                     |
| `title`       | `string`  | Yes      | The text content of the subtask. |
| `isCompleted` | `boolean` | Yes      | Status of the subtask.           |

### Task (Updated)

Existing entity updated to include subtasks.

| Field      | Type        | Required | Description                                |
| ---------- | ----------- | -------- | ------------------------------------------ |
| `subtasks` | `Subtask[]` | No       | List of subtasks. Defaults to empty array. |

## Relationships

- **Task** (1) --- (0..*) **Subtask**
  - Composition: Subtasks do not exist outside a Task.
  - Cascade Delete: Deleting a Task deletes its Subtasks.

## State Transitions (Automation)

| Trigger                          | Condition                             | Resulting Task Status               |
| -------------------------------- | ------------------------------------- | ----------------------------------- |
| `Subtask.isCompleted` -> `true`  | At least one other subtask is `false` | `inprogress`                        |
| `Subtask.isCompleted` -> `true`  | All subtasks are now `true`           | `done`                              |
| `Subtask.isCompleted` -> `false` | Task was `done`                       | `inprogress`                        |
| `Task.status` -> `done`          | Any subtask is `false`                | All Subtasks `isCompleted` = `true` |

## Validation

- **Subtask Title**: Must not be empty.
- **Subtask Limit**: Soft limit of 10 (UI warning only).
