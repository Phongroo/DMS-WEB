import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';


import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { AdminGuard } from 'src/app/service/auth/admin.guard';
import {TaskCreateComponent} from "../../pages/task/task-create/task-create.component";
import {NormalGuard} from "../../service/auth/normal.guard";

export const NormalLayoutRoutes: Routes = [


    { path: 'dashboard',      component: DashboardComponent,canActivate:[NormalGuard] },
    { path: 'user-profile',   component: UserProfileComponent,canActivate:[NormalGuard] },
    { path: 'tables',         component: TablesComponent,canActivate:[NormalGuard] },
    { path: 'task',         component: TaskCreateComponent,canActivate:[NormalGuard] },


];
