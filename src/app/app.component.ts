import {Component, OnInit} from '@angular/core';
import {SocketService} from "./service/socketService/SocketService";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'argon-dashboard-angular';
  constructor(private socketService: SocketService) { }

  ngOnInit() {
    console.log('DMM333')
    this.socketService.connect();
  }
}
