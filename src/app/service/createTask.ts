import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private baseUrl = 'http://localhost:30080';

  constructor(private http: HttpClient) {}

  startProcess(file: File) {

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    const formData = new FormData();

    formData.append('file', file);

    return this.http.post(
      `${this.baseUrl}/start`,
      formData,
      { headers }
    );
  }
  getTask() {

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<any>(
      `${this.baseUrl}/doc/fetchDoc`,
      { headers }
    );
  }

  processTask(task: any) {

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(
      `${this.baseUrl}/process`,
      task,
      { headers }
    );
  }
  viewPdf(id: number) {

    const token =
      localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get(
      `${this.baseUrl}/file/view/${id}`,
      {
        headers,
        responseType: 'blob'
      }
    );
  }
}
