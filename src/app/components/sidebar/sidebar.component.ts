import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {LoginService} from "../../service/auth/login.service";

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/admin/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/admin/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/admin/task', title: 'Task',  icon:'ni-bullet-list-67 text-red', class: '' },


];
export const ROUTES_NORMAL: RouteInfo[] = [
  { path: '/normal/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
  { path: '/normal/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '' },
  { path: '/normal/task', title: 'Task',  icon:'ni-bullet-list-67 text-red', class: '' },


];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router, private  loginservice: LoginService) { }

  ngOnInit() {

    const role = this.loginservice.getUserRole();
    const item = role == 'ADMIN' ? ROUTES :ROUTES_NORMAL;
    this.menuItems = item.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
