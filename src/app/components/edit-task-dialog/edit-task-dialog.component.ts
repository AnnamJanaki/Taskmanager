import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.css']
})
export class EditTaskDialogComponent {
  task: any;

  constructor(
    public dialogRef: MatDialogRef<EditTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.task = data.task;
  }

  updateTask() {
    // Perform any necessary task update logic here
    // You can access the updated task using this.task
    this.dialogRef.close(this.task); // Return the updated task to the parent component
  }

  cancel() {
    this.dialogRef.close(); // Close the dialog without any changes
  }
}
