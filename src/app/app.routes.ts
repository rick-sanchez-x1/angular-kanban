import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/kanban/kanban.module').then((m) => m.KanbanModule),
  },
];
