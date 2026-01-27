import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'kanban',
    loadChildren: () =>
      import('./features/kanban/kanban.module').then((m) => m.KanbanModule),
  },
  {
    path: '',
    redirectTo: 'kanban',
    pathMatch: 'full',
  },
];
