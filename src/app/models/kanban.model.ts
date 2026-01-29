export type Priority = 'low' | 'medium' | 'high';
export type TaskStatus = 'todo' | 'inprogress' | 'done';

export interface User {
  id: string;
  name: string;
  avatarUrl: string;
  email: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  status: TaskStatus;
  dueDate?: string;
  assignedUserId?: string;
  position: number;
}
