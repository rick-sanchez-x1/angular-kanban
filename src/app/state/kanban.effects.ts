import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { KanbanService } from '../services/kanban.service';
import { KanbanActions } from './kanban.actions';
import { catchError, map, mergeMap, of, forkJoin } from 'rxjs';

@Injectable()
export class KanbanEffects {
  loadInitialData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(KanbanActions.loadInitialData),
      mergeMap(() =>
        forkJoin({
          tasks: this.kanbanService.getTasks(),
          users: this.kanbanService.getUsers(),
        }).pipe(
          map(({ tasks, users }) =>
            KanbanActions.loadInitialDataSuccess({ tasks, users }),
          ),
          catchError((error) =>
            of(KanbanActions.loadInitialDataFailure({ error: error.message })),
          ),
        ),
      ),
    );
  });

  addTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(KanbanActions.addTask),
      mergeMap(({ task }) =>
        this.kanbanService.createTask(task).pipe(
          map((newTask) => KanbanActions.addTaskSuccess({ task: newTask })),
          catchError((error) =>
            of(KanbanActions.addTaskFailure({ error: error.message })),
          ),
        ),
      ),
    );
  });

  updateTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(KanbanActions.updateTask),
      mergeMap(({ originalTask, updatedTask }) =>
        this.kanbanService.updateTask(updatedTask).pipe(
          map((updatedTask) =>
            KanbanActions.updateTaskSuccess({ task: updatedTask }),
          ),
          catchError((error) =>
            of(
              KanbanActions.updateTaskFailure({
                error: error.message,
                originalTask: originalTask,
              }),
            ),
          ),
        ),
      ),
    );
  });

  reorderTasks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(KanbanActions.reorderTasks),
      mergeMap(({ tasks }) =>
        forkJoin(tasks.map((task) => this.kanbanService.updateTask(task))).pipe(
          map((updatedTasks) =>
            KanbanActions.reorderTasksSuccess({ tasks: updatedTasks }),
          ),
          catchError((error) =>
            of(KanbanActions.reorderTasksFailure({ error: error.message })),
          ),
        ),
      ),
    );
  });

  deleteTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(KanbanActions.deleteTask),
      mergeMap(({ taskId }) =>
        this.kanbanService.deleteTask(taskId).pipe(
          map(() => KanbanActions.deleteTaskSuccess({ taskId })),
          catchError((error) =>
            of(KanbanActions.deleteTaskFailure({ error: error.message })),
          ),
        ),
      ),
    );
  });

  constructor(
    private actions$: Actions,
    private kanbanService: KanbanService,
  ) {}
}
