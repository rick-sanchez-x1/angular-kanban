import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { ConfirmationService } from 'primeng/api';
import { Task, User } from '../../../models/kanban.model';
import { KanbanActions } from '../../../state/kanban.actions';
import { selectUserEntities } from '../../../state/kanban.selectors';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
})
export class TaskCardComponent {
  @Input({ required: true }) task!: Task;
  @Output() edit = new EventEmitter<Task>();

  userEntities = this.store.selectSignal(selectUserEntities);

  constructor(
    private store: Store,
    private confirmationService: ConfirmationService,
  ) {}

  onDelete(event: Event): void {
    event.stopPropagation();
    this.confirmationService.confirm({
      message: `Are you sure you want to delete "${this.task.title}"?`,
      header: 'Confirm Deletion',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(KanbanActions.deleteTask({ taskId: this.task.id }));
      },
    });
  }

  get assignedUser(): User | undefined {
    return this.task.assignedUserId
      ? this.userEntities()[this.task.assignedUserId]
      : undefined;
  }

  get initials(): string {
    return (
      this.assignedUser?.name.split(' ').map((name) => name.charAt(0))[0] || ''
    );
  }

  get priorityColor(): string {
    switch (this.task.priority) {
      case 'high':
        return 'text-red-600 bg-red-100';
      case 'medium':
        return 'text-amber-600 bg-amber-100';
      case 'low':
        return 'text-emerald-600 bg-emerald-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  }
}
