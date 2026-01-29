import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Task,
  User,
  Priority,
  TaskStatus,
  Subtask,
} from '../../../models/kanban.model';
import { v4 as uuidv4 } from 'uuid';

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
      subtasks: this.fb.array([]),
    });
  }

  get subtasks(): FormArray {
    return this.form.get('subtasks') as FormArray;
  }

  ngOnInit(): void {
    if (this.task) {
      this.form.patchValue({
        ...this.task,
        dueDate: this.task.dueDate ? new Date(this.task.dueDate) : null,
      });

      if (this.task.subtasks) {
        this.task.subtasks.forEach((subtask) => {
          this.subtasks.push(this.createSubtaskFormGroup(subtask));
        });
      }
    }

    this.form.get('status')?.valueChanges.subscribe((status) => {
      if (status === 'done') {
        this.subtasks.controls.forEach((control) => {
          control.get('isCompleted')?.setValue(true, { emitEvent: false });
        });
      }
    });
  }

  createSubtaskFormGroup(subtask?: Subtask): FormGroup {
    return this.fb.group({
      id: [subtask?.id || uuidv4()],
      title: [subtask?.title || '', [Validators.required]],
      isCompleted: [subtask?.isCompleted || false],
    });
  }

  addSubtask(): void {
    this.subtasks.push(this.createSubtaskFormGroup());
  }

  removeSubtask(index: number): void {
    this.subtasks.removeAt(index);
  }

  toggleSubtask(index: number): void {
    const subtask = this.subtasks.at(index);
    subtask.patchValue({ isCompleted: !subtask.value.isCompleted });
    this.recalculateStatus();
  }

  recalculateStatus(): void {
    const subtasks = this.subtasks.value as Subtask[];
    if (subtasks.length === 0) return;

    const completedCount = subtasks.filter((s) => s.isCompleted).length;
    const currentStatus = this.form.get('status')?.value;

    if (completedCount === subtasks.length) {
      this.form.get('status')?.setValue('done');
    } else if (completedCount > 0) {
      this.form.get('status')?.setValue('inprogress');
    } else if (currentStatus === 'done') {
      this.form.get('status')?.setValue('inprogress');
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
