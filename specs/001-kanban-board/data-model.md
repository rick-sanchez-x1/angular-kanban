# Data Model

## Entities

### Task
Represents a single unit of work on the board.

| Field            | Type   | Required | Validation                   | Description              |
| ---------------- | ------ | -------- | ---------------------------- | ------------------------ |
| `id`             | string | Yes      | UUID/Unique                  | Unique identifier        |
| `title`          | string | Yes      | Min 1, Max 100               | The headline of the task |
| `description`    | string | No       | Max 1000                     | Detailed explanation     |
| `priority`       | enum   | Yes      | 'low', 'medium', 'high'      | Urgency level            |
| `status`         | enum   | Yes      | 'todo', 'inprogress', 'done' | Current column           |
| `dueDate`        | string | No       | ISO 8601                     | Target completion date   |
| `assignedUserId` | string | No       | Exists in Users              | FK to User               |
| `position`       | number | Yes      | >= 0                         | Order within the column  |

### User
Represents a team member.

| Field       | Type   | Required | Description          |
| ----------- | ------ | -------- | -------------------- |
| `id`        | string | Yes      | Unique identifier    |
| `name`      | string | Yes      | Display name         |
| `avatarUrl` | string | No       | URL to profile image |
| `email`     | string | Yes      | Contact email        |

## Relationships

- **Task** (N) -> (1) **User** (via `assignedUserId`)
