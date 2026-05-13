import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {AdminLayoutRoutes} from "../admin-layout/admin-layout.routing";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ClipboardModule} from "ngx-clipboard";
import {DashboardComponent} from "../../pages/dashboard/dashboard.component";
import {UserProfileComponent} from "../../pages/user-profile/user-profile.component";
import {TablesComponent} from "../../pages/tables/tables.component";
import {CamundaViewerComponent} from "../../pages/tables/camunda/camunda-viewer/camunda-viewer.component";
import {TaskCreateComponent} from "../../pages/task/task-create/task-create.component";
import {authInterceptorProviders} from "../../service/auth/auth.interceptor";
import {NormalLayoutRoutes} from "./normal-layout.routing";
import {ShareModuleModule} from "../share-module/share-module.module";



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(NormalLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    ShareModuleModule
  ],
  // declarations: [
  //   DashboardComponent,
  //   UserProfileComponent,
  //   TablesComponent,
  //   CamundaViewerComponent,
  //   TaskCreateComponent
  //
  //
  // ],
  providers: [authInterceptorProviders],
})
export class NormalLayoutModule { }
