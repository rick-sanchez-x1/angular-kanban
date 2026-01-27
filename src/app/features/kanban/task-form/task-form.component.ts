import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task, User, Priority, TaskStatus } from '../../../models/kanban.model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
})
export class TaskFormComponent implements OnInit {
  @Input() task?: Task;
  @Input() users: User[] = [];
  @Output() save = new EventEmitter<Task>();
  @Output() cancel = new EventEmitter<void>();

  form: FormGroup;
  priorities: { label: string; value: Priority }[] = [
    { label: 'Low', value: 'low' },
    { label: 'Medium', value: 'medium' },
    { label: 'High', value: 'high' },
  ];
  statuses: { label: string; value: TaskStatus }[] = [
    { label: 'To Do', value: 'todo' },
    { label: 'In Progress', value: 'inprogress' },
    { label: 'Done', value: 'done' },
  ];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      id: [null],
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.maxLength(1000)]],
      priority: ['medium', Validators.required],
      status: ['todo', Validators.required],
      dueDate: [null],
      assignedUserId: [null],
    });
  }

  ngOnInit(): void {
    if (this.task) {
      this.form.patchValue({
        ...this.task,
        dueDate: this.task.dueDate ? new Date(this.task.dueDate) : null,
      });
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      const taskData = {
        ...this.form.value,
        dueDate: this.form.value.dueDate
          ? this.form.value.dueDate.toISOString()
          : null,
      };
      this.save.emit(taskData);
    }
  }
}
