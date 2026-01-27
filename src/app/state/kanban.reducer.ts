import { createReducer, on } from '@ngrx/store';
import { Task, User } from '../models/kanban.model';
import { KanbanActions } from './kanban.actions';

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
  on(KanbanActions.updateTask, (state, { task }) => ({
    ...state,
    tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
  })),
  on(KanbanActions.updateTaskFailure, (state, { originalTask }) => ({
    ...state,
    tasks: state.tasks.map((t) =>
      t.id === originalTask.id ? originalTask : t,
    ),
  })),

  // Delete Task
  on(KanbanActions.deleteTaskSuccess, (state, { taskId }) => ({
    ...state,
    tasks: state.tasks.filter((t) => t.id !== taskId),
  })),
);
