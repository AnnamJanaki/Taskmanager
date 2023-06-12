import { MatDialog } from '@angular/material/dialog';
import { EditTaskDialogComponent } from '../edit-task-dialog/edit-task-dialog.component';


import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { Component } from '@angular/core';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.css']
})
export class TaskManagerComponent {
  tasks: Task[] = [
    { id: 1, title: 'Task 1', description: 'Description of Task 1', completed: false },
    { id: 2, title: 'Task 2', description: 'Description of Task 2', completed: false },
    { id: 3, title: 'Task 3', description: 'Description of Task 3', completed: true }
  ];
  newTask: Task = {
    id: 0,
    title: '',
    description: '',
    completed: false
  };

  constructor(private dialog: MatDialog) {
    console.log('TaskManagerComponent');
  }

  addTask() {
    // Generate a unique ID for the new task
    const newTaskId = this.tasks.length + 1;
    // Assign the generated ID to the new task
    this.newTask.id = newTaskId;
    // Push the new task to the tasks array
    this.tasks.push(this.newTask);
    // Reset the new task object for the next task
    this.newTask = {
      id: 0,
      title: '',
      description: '',
      completed: false
    };
  }

  openEditDialog(task: Task) {
    // Open the dialog for editing the task
    const dialogRef = this.dialog.open(EditTaskDialogComponent, {
      width: '300px',

      data: { task: { ...task } } // Pass a copy of the task to the dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Update the task in the tasks array
        const index = this.tasks.findIndex(t => t.id === result.id);
        if (index !== -1) {
          this.tasks[index] = result;
        }
      }
    });
  }

  completeTask(task: Task) {
    // Set the task as completed
    task.completed = true;
  }

  undoTask(task: Task) {
    // Set the task as not completed
    task.completed = false;
  }

  removeTask(task: Task) {
    // Remove the task from the tasks array
    this.tasks = this.tasks.filter(t => t.id !== task.id);
  }
}
