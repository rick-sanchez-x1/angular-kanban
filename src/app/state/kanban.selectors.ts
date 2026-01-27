import { createFeatureSelector, createSelector } from '@ngrx/store';
import { KanbanState } from './kanban.reducer';

export const selectKanbanState = createFeatureSelector<KanbanState>('kanban');

export const selectAllTasks = createSelector(
  selectKanbanState,
  (state) => state.tasks,
);

export const selectAllUsers = createSelector(
  selectKanbanState,
  (state) => state.users,
);

export const selectKanbanLoading = createSelector(
  selectKanbanState,
  (state) => state.loading,
);

export const selectKanbanError = createSelector(
  selectKanbanState,
  (state) => state.error,
);

export const selectTasksByStatus = (status: string) =>
  createSelector(selectAllTasks, (tasks) =>
    tasks.filter((task) => task.status === status),
  );
