import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

import { BoardComponent } from './board/board.component';
import { ColumnComponent } from './column/column.component';
import { TaskCardComponent } from './task-card/task-card.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { ComponentsModule } from '../../components/components.module';
import { HighlightPipe } from '../../pipes/highlight.pipe';

const routes: Routes = [{ path: '', component: BoardComponent }];

@NgModule({
  declarations: [
    BoardComponent,
    ColumnComponent,
    TaskCardComponent,
    TaskFormComponent,
    HighlightPipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DragDropModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    CalendarModule,
    ButtonModule,
    CheckboxModule,
    DialogModule,
    ConfirmDialogModule,
    ComponentsModule,
    RouterModule.forChild(routes),
  ],
  providers: [ConfirmationService],
})
export class KanbanModule {}
