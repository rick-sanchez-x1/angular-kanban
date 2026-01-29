import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { KanbanActions } from '../../../state/kanban.actions';
import {
  selectTasksByStatus,
  selectKanbanLoading,
  selectAllUsers,
  selectKanbanError,
} from '../../../state/kanban.selectors';
import { Task, TaskStatus } from '../../../models/kanban.model';
import { v4 as uuidv4 } from 'uuid';
import { MessageService } from 'primeng/api';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
})
export class BoardComponent implements OnInit {
  todoTasks = this.store.selectSignal(selectTasksByStatus('todo'));
  inprogressTasks = this.store.selectSignal(selectTasksByStatus('inprogress'));
  doneTasks = this.store.selectSignal(selectTasksByStatus('done'));
  users = this.store.selectSignal(selectAllUsers);
  loading = this.store.selectSignal(selectKanbanLoading);
  error = this.store.selectSignal(selectKanbanError);

  displayTaskForm = false;
  selectedTask?: Task;

  constructor(
    private store: Store,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(KanbanActions.loadInitialData());

    toObservable(this.error).subscribe((error) => {
      if (error) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error,
        });
      }
    });
  }

  showCreateTask(): void {
    this.selectedTask = undefined;
    this.displayTaskForm = true;
  }

  onEditTask(task: Task): void {
    this.selectedTask = task;
    this.displayTaskForm = true;
  }

  onSaveTask(taskData: Task): void {
    if (taskData.id) {
      if (this.selectedTask) {
        const updatedTask = { ...this.selectedTask, ...taskData };

        if (this.selectedTask.status !== taskData.status) {
          const tasks = this.getTasksByStatus(taskData.status);
          const maxPosition =
            tasks.length > 0
              ? Math.max(...tasks.map((t) => t.position ?? 0))
              : -1;
          updatedTask.position = maxPosition + 1;
        }

        this.store.dispatch(
          KanbanActions.updateTask({
            originalTask: this.selectedTask,
            updatedTask: updatedTask,
          }),
        );
      }
    } else {
      const status = taskData.status || 'todo';
      const tasks = this.getTasksByStatus(status);
      const maxPosition =
        tasks.length > 0
          ? Math.max(...tasks.map((t) => t.position ?? 0))
          : -1;

      const newTask = {
        ...taskData,
        id: uuidv4(),
        position: maxPosition + 1,
      };
      this.store.dispatch(KanbanActions.addTask({ task: newTask }));
    }
    this.displayTaskForm = false;
  }

  private getTasksByStatus(status: TaskStatus): Task[] {
    if (status === 'todo') return this.todoTasks();
    if (status === 'inprogress') return this.inprogressTasks();
    if (status === 'done') return this.doneTasks();
    return [];
  }

  drop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) {
      const tasks = [...event.container.data];
      moveItemInArray(tasks, event.previousIndex, event.currentIndex);

      const updatedTasks = tasks.map((task, index) => ({
        ...task,
        position: index,
      }));

      this.store.dispatch(KanbanActions.reorderTasks({ tasks: updatedTasks }));
    } else {
      const newStatus = event.container.id as TaskStatus;

      // Update position in the new column as well
      const targetTasks = [...event.container.data];
      const sourceTasks = [...event.previousContainer.data];

      transferArrayItem(
        sourceTasks,
        targetTasks,
        event.previousIndex,
        event.currentIndex,
      );

      // Re-position everything in the target column
      const updatedTargetTasks = targetTasks.map((t, index) => ({
        ...t,
        status: newStatus,
        position: index,
      }));

      // Also need to update positions in the source column to avoid gaps (optional but cleaner)
      const updatedSourceTasks = sourceTasks.map((t, index) => ({
        ...t,
        position: index,
      }));

      this.store.dispatch(
        KanbanActions.reorderTasks({
          tasks: [...updatedSourceTasks, ...updatedTargetTasks],
        }),
      );
    }
  }
}
