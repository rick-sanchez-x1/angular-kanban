import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Task, User } from '../models/kanban.model';

export const KanbanActions = createActionGroup({
  source: 'Kanban',
  events: {
    'Load Initial Data': emptyProps(),
    'Load Initial Data Success': props<{ tasks: Task[]; users: User[] }>(),
    'Load Initial Data Failure': props<{ error: string }>(),

    'Add Task': props<{ task: Task }>(),
    'Add Task Success': props<{ task: Task }>(),
    'Add Task Failure': props<{ error: string }>(),

    'Update Task': props<{ task: Task }>(),
    'Update Task Success': props<{ task: Task }>(),
    'Update Task Failure': props<{ error: string; originalTask: Task }>(),

    'Delete Task': props<{ taskId: string }>(),
    'Delete Task Success': props<{ taskId: string }>(),
    'Delete Task Failure': props<{ error: string }>(),

    'Move Task': props<{ task: Task; newStatus: string }>(), // For optimistic updates if needed
  },
});
