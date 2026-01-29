import { createFeatureSelector, createSelector } from '@ngrx/store';
import { KanbanState } from './kanban.reducer';
import { User } from '../models/kanban.model';

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
    tasks
      .filter((task) => task.status === status)
      .sort((a, b) => (a.position ?? 0) - (b.position ?? 0)),
  );

export const selectUserEntities = createSelector(selectAllUsers, (users) =>
  users.reduce(
    (entities, user) => ({ ...entities, [user.id]: user }),
    {} as Record<string, User>,
  ),
);
