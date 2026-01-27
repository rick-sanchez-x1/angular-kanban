import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { KanbanActions } from '../../../state/kanban.actions';
import {
  selectTasksByStatus,
  selectKanbanLoading,
  selectAllUsers,
  selectKanbanError,
} from '../../../state/kanban.selectors';
import { Task, TaskStatus, User } from '../../../models/kanban.model';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
})
export class BoardComponent implements OnInit {
  todoTasks$: Observable<Task[]>;
  inprogressTasks$: Observable<Task[]>;
  doneTasks$: Observable<Task[]>;
  users$: Observable<User[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  displayTaskForm = false;
  selectedTask?: Task;

  constructor(
    private store: Store,
    private messageService: MessageService,
  ) {
    this.todoTasks$ = this.store.select(selectTasksByStatus('todo'));
    this.inprogressTasks$ = this.store.select(
      selectTasksByStatus('inprogress'),
    );
    this.doneTasks$ = this.store.select(selectTasksByStatus('done'));
    this.users$ = this.store.select(selectAllUsers);
    this.loading$ = this.store.select(selectKanbanLoading);
    this.error$ = this.store.select(selectKanbanError);
  }

  ngOnInit(): void {
    this.store.dispatch(KanbanActions.loadInitialData());

    this.error$.subscribe((error) => {
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
      this.store.dispatch(KanbanActions.updateTask({ task: taskData }));
    } else {
      const newTask = {
        ...taskData,
        id: uuidv4(),
      };
      this.store.dispatch(KanbanActions.addTask({ task: newTask }));
    }
    this.displayTaskForm = false;
  }

  drop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) {
      // Reordering within the same column
    } else {
      const task = event.item.data as Task;
      const newStatus = event.container.id as TaskStatus;

      this.store.dispatch(
        KanbanActions.updateTask({
          task: { ...task, status: newStatus },
        }),
      );
    }
  }
}
