import { User } from './user.interface';

export interface Task {
  id?: number;
  title: string;
  description: string;
  status: number;
  user?: User;
}

export enum TaskStatus {
  INPROGRESS = 0,
  COMPLETED = 1,
  DEFERRED = 2,
}
