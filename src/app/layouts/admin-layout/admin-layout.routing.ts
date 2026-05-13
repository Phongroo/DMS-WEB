import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';


import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { AdminGuard } from 'src/app/service/auth/admin.guard';
import {TaskCreateComponent} from "../../pages/task/task-create/task-create.component";

export const AdminLayoutRoutes: Routes = [


    { path: 'dashboard',      component: DashboardComponent,canActivate:[AdminGuard] },
    { path: 'user-profile',   component: UserProfileComponent,canActivate:[AdminGuard] },
    { path: 'tables',         component: TablesComponent,canActivate:[AdminGuard] },
    { path: 'task',         component: TaskCreateComponent,canActivate:[AdminGuard] },


];
