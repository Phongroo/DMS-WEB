import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TaskCreateComponent} from "../../pages/task/task-create/task-create.component";
import {CamundaViewerComponent} from "../../pages/tables/camunda/camunda-viewer/camunda-viewer.component";
import {DashboardComponent} from "../../pages/dashboard/dashboard.component";
import {UserProfileComponent} from "../../pages/user-profile/user-profile.component";
import {TablesComponent} from "../../pages/tables/tables.component";
import {FormsModule} from "@angular/forms";
import {PdfViewerComponent} from "../../pages/modal/pdf-viewer/pdf-viewer.component";
import {PdfViewerModule} from "ng2-pdf-viewer";



@NgModule({

  declarations: [
      DashboardComponent,
      UserProfileComponent,
      TablesComponent,
      CamundaViewerComponent,
      TaskCreateComponent,
      PdfViewerComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    PdfViewerModule
  ],

  exports: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    CamundaViewerComponent,
    TaskCreateComponent,
    PdfViewerComponent
  ]
})
export class ShareModuleModule { }
