import { MatDialog } from '@angular/material/dialog';
import { EditTaskDialogComponent } from '../edit-task-dialog/edit-task-dialog.component';

import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from 'src/app/interfaces/task.interface';
import { TaskStatus } from '../../interfaces/task.interface';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.css'],
})
export class TaskManagerComponent implements OnInit {
  readonly taskStatus = TaskStatus;

  tasks: Task[] = [];
  newTask: Task = {
    title: '',
    description: '',
    status: this.taskStatus.INPROGRESS,
  };

  feeCollection = {
    feeSetup: [
      {
        fee_type_id: 1,
        name: 'book fee',
      },
      {
        fee_type_id: 2,
        name: 'tuition fee',
      },
      {
        fee_type_id: 3,
        name: '',
      },
    ],
  };

  collectFeeForm = new FormGroup({
    amount: new FormControl(null, Validators.required),
    feeTypeId: new FormControl(),
  });

  constructor(
    private dialog: MatDialog,
    private taskService: TaskService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getTasks();

    this.collectFeeForm.get('feeTypeId')?.valueChanges.subscribe((typeId) => {
      if (typeId && +typeId === 1) {
        this.collectFeeForm
          .get('amount')
          ?.setValidators([Validators.max(500), Validators.min(500)]);
        this.collectFeeForm.get('amount')?.setErrors({ invalidAmount: true });
      }
      this.collectFeeForm.updateValueAndValidity();
    });

    this.collectFeeForm.get('feeTypeId')?.patchValue(1);
  }

  addTask() {
    this.taskService.addTask(this.newTask).subscribe((task) => {
      this.getTasks();
    });
  }

  getTasks() {
    this.taskService.getTask().subscribe((res) => {
      this.tasks = res;
      console.log('Task retrieved - ', this.tasks);
    });
  }

  openEditDialog(task: Task) {
    // Open the dialog for editing the task
    const dialogRef = this.dialog.open(EditTaskDialogComponent, {
      width: '300px',

      data: { task: { ...task } }, // Pass a copy of the task to the dialog
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Update the task in the tasks array
        const index = this.tasks.findIndex((t) => t.id === result.id);
        if (index !== -1) {
          this.tasks[index] = result;
        }
      }
    });
  }

  completeTask(task: Task) {
    // Set the task as completed
    task.status = this.taskStatus.COMPLETED;

    this.taskService.updateTask(task).subscribe((result) => {
      console.log(result);
    });
  }

  undoTask(task: Task) {
    task.status = this.taskStatus.COMPLETED;
  }

  removeTask(task: Task) {
    this.taskService.deleteTask(task.id as number).subscribe(() => {
      this.getTasks();
    });
  }

  onSelectingTheOption(option: any) {}

  saveFee() {
    console.log('this.collectFeeForm - ', this.collectFeeForm);
  }

  submitCollectFee(c: any) {
    // this.isCollectFormSubmitted = true;
    // if (this.collectFeeForm.valid) {
    //   const feeTypeId = Number(this.collectFeeForm.value.feeTypeId);
    //   const amount = Number(this.collectFeeForm.value.amount);
    //   if (feeTypeId === 0) {
    //     // Handle validation error for fee type not selected
    //     this.collectFeeForm.controls['feeTypeId'].setErrors({ 'required': true });
    //     return;
    //   }
    //   if (feeTypeId === 1 && amount !== 500) {
    //     // Handle validation error for book fee amount
    //     this.collectFeeForm.controls['amount'].setErrors({ 'invalidAmount': true });
    //     return;
    //   }
    //   if (feeTypeId === 2 && amount !== 13300) {
    //     // Handle validation error for tuition fee amount
    //     this.collectFeeForm.controls['amount'].setErrors({ 'invalidAmount': true });
    //     return;
    //   }
    //   if (feeTypeId === 3 && amount !== 20000) {
    //     // Handle validation error for tuition fee change amount
    //     this.collectFeeForm.controls['amount'].setErrors({ 'invalidAmount': true });
    //     return;
    //   }
    //   this.feesService.collectFeeForStudent(
    //     this.activeStudent.id,
    //     feeTypeId,
    //     amount,
    //     this.activeStudent.section_id
    //   ).subscribe((response) => {
    //     const value = this.feesService.feeCollection$.value;
    //     const student = value.students.find((s: any) => s.id === this.activeStudent.id);
    //     student.collection.push({
    //       collected_amount: amount,
    //       collected_date: new Date()
    //     });
    //     this.feesService.feeCollection$.next(value);
    //     c();
    //   });
    // }
  }
}
