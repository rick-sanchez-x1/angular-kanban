import { Component, OnInit, signal, computed } from '@angular/core';
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
  selectAllTasks,
} from '../../../state/kanban.selectors';
import { Task, TaskStatus } from '../../../models/kanban.model';
import { v4 as uuidv4 } from 'uuid';
import { MessageService } from 'primeng/api';
import { toObservable } from '@angular/core/rxjs-interop';
import { fuzzyMatchTask } from '../../../utils/search.util';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
})
export class BoardComponent implements OnInit {
  // Search State
  searchQuery = signal('');

  // Source Signals
  private todoTasksSource = this.store.selectSignal(
    selectTasksByStatus('todo'),
  );
  private inprogressTasksSource = this.store.selectSignal(
    selectTasksByStatus('inprogress'),
  );
  private doneTasksSource = this.store.selectSignal(
    selectTasksByStatus('done'),
  );

  // Filtered Signals (used in template)
  todoTasks = computed(() => this.filterTasks(this.todoTasksSource()));
  inprogressTasks = computed(() =>
    this.filterTasks(this.inprogressTasksSource()),
  );
  doneTasks = computed(() => this.filterTasks(this.doneTasksSource()));

  allTasks = this.store.selectSignal(selectAllTasks);
  users = this.store.selectSignal(selectAllUsers);
  loading = this.store.selectSignal(selectKanbanLoading);
  error = this.store.selectSignal(selectKanbanError);

  displayTaskForm = false;
  selectedTask?: Task;

  constructor(
    private store: Store,
    private messageService: MessageService,
  ) {}

  private filterTasks(tasks: Task[]): Task[] {
    const query = this.searchQuery();
    if (!query) return tasks;
    return tasks.filter((t) => fuzzyMatchTask(t, query));
  }

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
        tasks.length > 0 ? Math.max(...tasks.map((t) => t.position ?? 0)) : -1;

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
    const previousTasks = this.allTasks();

    if (event.previousContainer === event.container) {
      const tasks = [...event.container.data];
      moveItemInArray(tasks, event.previousIndex, event.currentIndex);

      const updatedTasks = tasks.map((task, index) => ({
        ...task,
        position: index,
      }));

      this.store.dispatch(
        KanbanActions.reorderTasks({
          tasks: updatedTasks,
          previousTasks: previousTasks,
        }),
      );
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
          previousTasks: previousTasks,
        }),
      );
    }
  }
}
