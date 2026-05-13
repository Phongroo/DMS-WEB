import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { ToastrModule} from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { TableModalComponent } from './pages/tables/table-modal/table-modal.component';
import { authInterceptorProviders } from './service/auth/auth.interceptor';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { TaskCreateComponent } from './pages/task/task-create/task-create.component';
import { NormalLayoutComponent } from './layouts/normal-layout/normal-layout.component';
import { PdfViewerComponent } from './pages/modal/pdf-viewer/pdf-viewer.component';
import { CamundaViewerComponent } from './pages/tables/camunda/camunda-viewer/camunda-viewer.component';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    MatSnackBarModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    ToastrModule.forRoot({
      preventDuplicates: true,
      countDuplicates: true,
      timeOut: 15000 // 5s
    }),
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    TableModalComponent,
    NormalLayoutComponent,

  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
