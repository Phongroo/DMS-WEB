import { Injectable } from '@angular/core';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { BehaviorSubject } from 'rxjs';
import {MatSnackBar} from "@angular/material/snack-bar";
import {ToastrService} from "ngx-toastr";
import {LoginService} from "../auth/login.service";

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  constructor(private toast:ToastrService, private loginService:LoginService) {}
  private stompClient!: Client;

  private taskSubject = new BehaviorSubject<any>(null);
  task$ = this.taskSubject.asObservable();

  connect() {
    console.log('🔥 SOCKET INIT');

    const socket = new SockJS('http://localhost:30090/ws');

    this.stompClient = new Client({
      webSocketFactory: () => socket as any,
      reconnectDelay: 5000
    });
  const position = this.loginService.getPosition();
    console.log(99999999,position)
    this.stompClient.onConnect = () => {
      console.log('✅ SOCKET CONNECTED');

      this.stompClient.subscribe(`/topic/tasks/${position}`, (message) => {
        console.log(3333333,position)
        console.log('📩 MESSAGE RECEIVED:', message.body);

        const data = JSON.parse(message.body);

        this.toast.success("success");

      });
    };

    this.stompClient.onStompError = (frame) => {
      console.error('❌ STOMP ERROR:', frame);
    };

    this.stompClient.activate();
  }
}
