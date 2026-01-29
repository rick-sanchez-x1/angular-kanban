import { createReducer, on } from '@ngrx/store';
import { Subtask, Task, TaskStatus } from '../models/kanban.model';
import { KanbanActions } from './kanban.actions';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../models/kanban.model';

export interface KanbanState {
  tasks: Task[];
  users: User[];
  loading: boolean;
  error: string | null;
}

export const initialState: KanbanState = {
  tasks: [],
  users: [],
  loading: false,
  error: null,
};

export const kanbanReducer = createReducer(
  initialState,
  on(KanbanActions.loadInitialData, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(KanbanActions.loadInitialDataSuccess, (state, { tasks, users }) => ({
    ...state,
    tasks,
    users,
    loading: false,
  })),
  on(KanbanActions.loadInitialDataFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Add Task
  on(KanbanActions.addTaskSuccess, (state, { task }) => ({
    ...state,
    tasks: [...state.tasks, task],
  })),

  // Update Task (Optimistic or Success)
  on(KanbanActions.updateTask, (state, { updatedTask }) => ({
    ...state,
    tasks: state.tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)),
  })),
  on(KanbanActions.updateTaskFailure, (state, { originalTask }) => ({
    ...state,
    tasks: state.tasks.map((t) =>
      t.id === originalTask.id ? originalTask : t,
    ),
  })),

  // Reorder Tasks (Optimistic)
  on(KanbanActions.reorderTasks, (state, { tasks }) => {
    const updatedTaskIds = new Set(tasks.map((t) => t.id));
    const processedTasks = tasks.map((t) => {
      if (t.status === 'done' && t.subtasks) {
        return {
          ...t,
          subtasks: t.subtasks.map((s) => ({ ...s, isCompleted: true })),
        };
      }
      return t;
    });

    return {
      ...state,
      tasks: [
        ...state.tasks.filter((t) => !updatedTaskIds.has(t.id)),
        ...processedTasks,
      ],
    };
  }),

  // Reorder Tasks Failure (Rollback)
  on(KanbanActions.reorderTasksFailure, (state, { previousTasks }) => ({
    ...state,
    tasks: previousTasks,
    loading: false,
  })),

  // Delete Task
  on(KanbanActions.deleteTaskSuccess, (state, { taskId }) => ({
    ...state,
    tasks: state.tasks.filter((t) => t.id !== taskId),
  })),

  // Add Subtask
  on(KanbanActions.addSubtask, (state, { taskId, title }) => ({
    ...state,
    tasks: state.tasks.map((t) => {
      if (t.id === taskId) {
        const newSubtask: Subtask = {
          id: uuidv4(),
          title,
          isCompleted: false,
        };
        const subtasks = [...(t.subtasks || []), newSubtask];
        return {
          ...t,
          subtasks,
          status: calculateTaskStatus(subtasks, t.status),
        };
      }
      return t;
    }),
  })),

  // Update Subtask
  on(KanbanActions.updateSubtask, (state, { taskId, subtask }) => ({
    ...state,
    tasks: state.tasks.map((t) => {
      if (t.id === taskId && t.subtasks) {
        const subtasks = t.subtasks.map((s) =>
          s.id === subtask.id ? { ...s, title: subtask.title } : s,
        );
        return { ...t, subtasks };
      }
      return t;
    }),
  })),

  // Delete Subtask
  on(KanbanActions.deleteSubtask, (state, { taskId, subtaskId }) => ({
    ...state,
    tasks: state.tasks.map((t) => {
      if (t.id === taskId && t.subtasks) {
        const subtasks = t.subtasks.filter((s) => s.id !== subtaskId);
        return {
          ...t,
          subtasks,
          status: calculateTaskStatus(subtasks, t.status),
        };
      }
      return t;
    }),
  })),

  // Toggle Subtask
  on(KanbanActions.toggleSubtask, (state, { taskId, subtaskId }) => ({
    ...state,
    tasks: state.tasks.map((t) => {
      if (t.id === taskId && t.subtasks) {
        const subtasks = t.subtasks.map((s) =>
          s.id === subtaskId ? { ...s, isCompleted: !s.isCompleted } : s,
        );
        return {
          ...t,
          subtasks,
          status: calculateTaskStatus(subtasks, t.status),
        };
      }
      return t;
    }),
  })),

  // Move Task / Update Status (US2: Move to Done completes all subtasks)
  on(KanbanActions.moveTask, (state, { task, newStatus }) => ({
    ...state,
    tasks: state.tasks.map((t) => {
      if (t.id === task.id) {
        let subtasks = t.subtasks;
        if (newStatus === 'done' && subtasks) {
          subtasks = subtasks.map((s) => ({ ...s, isCompleted: true }));
        }
        return { ...t, status: newStatus as TaskStatus, subtasks };
      }
      return t;
    }),
  })),
);

function calculateTaskStatus(
  subtasks: Subtask[] | undefined,
  currentStatus: TaskStatus,
): TaskStatus {
  if (!subtasks || subtasks.length === 0) return currentStatus;

  const completedCount = subtasks.filter((s) => s.isCompleted).length;
  if (completedCount === subtasks.length) return 'done';
  if (completedCount > 0) return 'inprogress';

  return currentStatus === 'done' ? 'inprogress' : currentStatus;
}
