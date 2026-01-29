# Quickstart: Verifying Task Subtasks

## Prerequisites

- Ensure the application is running: `ng serve`
- Ensure the mock backend is running: `npm run mock:server` (or equivalent)

## Feature: Subtask Management

1. **Create a Subtask**:
   - Open a Task by clicking on a card.
   - Locate the "Subtasks" section.
   - Enter a title in the input field and press "Add" (or Enter).
   - **Verify**: The subtask appears in the list with an unchecked box.

2. **Toggle Completion**:
   - Check the checkbox next to a subtask.
   - **Verify**: The subtask is visually marked as completed.

3. **Auto-Status Update (In Progress)**:
   - Create a new Task in the "Todo" column.
   - Add 2 subtasks.
   - Check **one** subtask.
   - Close the modal/form.
   - **Verify**: The Task card has moved to the "In Progress" column.

4. **Auto-Status Update (Done)**:
   - Open the same task.
   - Check the **second** subtask (all are now checked).
   - Close the modal.
   - **Verify**: The Task card has moved to the "Done" column.

5. **Manual Done Override**:
   - Create a Task with 2 *unchecked* subtasks.
   - Drag the Task card to the "Done" column.
   - Open the Task.
   - **Verify**: Both subtasks are now checked.

6. **Board View Indicator**:
   - Look at any card with subtasks on the board.
   - **Verify**: You see an indicator like "1/2" or a small progress bar.
