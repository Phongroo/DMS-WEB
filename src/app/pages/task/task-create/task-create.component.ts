import { Component, OnInit } from '@angular/core';
import {TaskService} from "../../../service/createTask";

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss']
})
export class TaskCreateComponent implements OnInit {
  loading = false;

  task = {
    title: '',
    description: '',
    priority: 'MEDIUM',
    assignee: '',
    dueDate: ''
  };

  priorities = ['LOW', 'MEDIUM', 'HIGH'];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
  }
  createTask() {

    this.loading = true;

    const payload = {
      documentId: this.task.title || 'DOC001',
      createdBy: this.task.assignee || 'phong',
      approvers: ['manager', 'director']
    };

    this.taskService.startProcess(this.selectedFile).subscribe({
      next: (res) => {
        console.log('SUCCESS:', res);
        this.loading = false;
      },
      error: (err) => {
        console.error('ERROR:', err);
        this.loading = false;
      }
    });
  }

  resetForm() {
    this.task = {
      title: '',
      description: '',
      priority: 'MEDIUM',
      assignee: '',
      dueDate: ''
    };
  }
  selectedFile!: File;

  onFileChange(event: any): void {

    const file = event.target.files[0];

    if (!file) {
      return;
    }

    // check mime type
    if (file.type !== 'application/pdf') {

      alert('Chỉ cho phép file PDF');

      event.target.value = '';

      return;
    }

    this.selectedFile = file;
  }
}
