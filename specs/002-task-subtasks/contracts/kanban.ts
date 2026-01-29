export type Priority = 'low' | 'medium' | 'high';
export type TaskStatus = 'todo' | 'inprogress' | 'done';

export interface User {
  id: string;
  name: string;
  avatarUrl?: string;
  email: string;
}

export interface Subtask {
  id: string;
  title: string;
  isCompleted: boolean;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  status: TaskStatus;
  dueDate?: string; // ISO Date string
  assignedUserId?: string;
  position: number;
  subtasks?: Subtask[];
}

export interface KanbanState {
  tasks: Task[];
  users: User[];
  loading: boolean;
  error: string | null;
}
