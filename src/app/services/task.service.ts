import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../interfaces/task.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  addTask(task: Task): Observable<any> {
    task['user'] = JSON.parse(localStorage.getItem('user') as string);
    return this.http.post('http://localhost:8087/tasks', task);
  }

  getTask(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') as string);
    return this.http.get(`http://localhost:8087/tasks/${user.id}`);
  }

  updateTask(task: Task): Observable<any> {
    return this.http.put(`http://localhost:8087/tasks/${task.id}`, task);
  }

  deleteTask(taskId: number): Observable<any> {
    return this.http.delete(`http://localhost:8087/tasks/${taskId}`);
  }
}
