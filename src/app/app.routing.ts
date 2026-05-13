import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AdminGuard } from './service/auth/admin.guard';
import { LoginComponent } from './pages/login/login.component';
import {NormalLayoutComponent} from "./layouts/normal-layout/normal-layout.component";
import {NormalGuard} from "./service/auth/normal.guard";

const routes: Routes =[
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  }, {
    path: '',
    component: AdminLayoutComponent,canActivate:[AdminGuard] ,
    children: [
      {   path: 'admin' ,canActivate:[AdminGuard] ,
        loadChildren: () => import('src/app/layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
      }
    ]
  }, {
    path: '',
    component: NormalLayoutComponent,canActivate:[NormalGuard] ,
    children: [
      {   path: 'normal' ,canActivate:[NormalGuard] ,
        loadChildren: () => import('src/app/layouts/normal-layout/normal-layout.module').then(m => m.NormalLayoutModule)
      }
    ]
  },{
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/layouts/auth-layout/auth-layout.module').then(m => m.AuthLayoutModule)
      }
    ]
  }, {
    path: '**',
    redirectTo: 'login'
  },
  {
    path:'login',component:LoginComponent,pathMatch:'full',
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
