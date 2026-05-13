import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { TableModalComponent } from './table-modal/table-modal.component';
import {TaskService} from "../../service/createTask";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

  tasks: any[] = [];
  constructor(
    private modalService: NgbModal,
    private taskService: TaskService,
    private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit(): void {

    this.loadData();

  }
  showViewer = false;

  selectedProcessId!: string;

  viewCamunda(processInstanceId: string): void {

    this.selectedProcessId =
      processInstanceId;

    this.showViewer = true;
  }


  loadData(): void {


    this.taskService.getTask().subscribe({
      next: (res) => {
        console.log('SUCCESS:', res);

        this.tasks = res?.data || [];

      },
      error: (err) => {
        console.error('ERROR:', err);
      }
    });

  }


  processTask(task: any, btn: any) {

    const payload: any = {
      processInstanceId: task.processInstanceId,
      dmsDoc:task
    };

    const approvalMap: any = {
      '1': { managerApproved: btn?.value },
      '2': { directorApproved: btn?.value }
    };

    Object.assign(payload, approvalMap[btn?.type] || {});

    this.taskService.processTask(payload).subscribe({

      next: (res) => {
        this.loadData();
      },

      error: (err) => {
        console.error('ERROR:', err);
      }

    });
  }

  isShowPdf = false;

  pdfUrl!: SafeResourceUrl;

  openPdf(fileId: number): void {

    this.taskService
      .viewPdf(fileId)
      .subscribe(blob => {

        const url =
          URL.createObjectURL(blob);

        this.pdfUrl =
          this.sanitizer
            .bypassSecurityTrustResourceUrl(
              url
            );

        this.isShowPdf = true;
      });
  }

}
