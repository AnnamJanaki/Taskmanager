import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from '../../interfaces/task.interface';
import { TaskService } from '../../services/task.service';


@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.css']
})
export class EditTaskDialogComponent {
  task: Task;

  constructor(
    public dialogRef: MatDialogRef<EditTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private taskService: TaskService
  ) {
    this.task = data.task;
  }

  updateTask() {
    this.taskService.updateTask(this.task).subscribe(task => {
      this.dialogRef.close(this.task); // Return the updated task to the parent component
    })
  }

  cancel() {
    this.dialogRef.close(); // Close the dialog without any changes
  }
}
