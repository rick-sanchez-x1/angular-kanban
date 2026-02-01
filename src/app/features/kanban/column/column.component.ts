import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Task } from '../../../models/kanban.model';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  host: { class: 'block' },
})
export class ColumnComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) tasks!: Task[];
  @Input({ required: true }) status!: string;
  @Input({ required: true }) id!: string;
  @Input({ required: true }) connectedTo!: string[];
  @Input() searchQuery: string = '';
  @Output() editTask = new EventEmitter<Task>();
  @Output() dropped = new EventEmitter<CdkDragDrop<Task[]>>();
}
