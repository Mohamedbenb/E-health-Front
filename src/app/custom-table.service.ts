import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CustomTableService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  getTableData(): Observable<any> {
    const options = { headers: this.headers };
    console.log(this.http.get('http://localhost:8080/api/employees/', options));
    return this.http.get('http://localhost:8080/api/employees/', options);
  }

  addTableData(data: any): Observable<any> {
    const options = { headers: this.headers };
    return this.http.post('http://localhost:8080/api/employees/', data, options);
  }

  updateTableData(data: any): Observable<any> {
    const options = { headers: this.headers };
    console.log('Data received in updateTableData:', data);
    return this.http.put(`http://localhost:8080/api/employees/${data.id}`, data, options);
  }

  deleteTableData(id: number): Observable<any> {
    const options = { headers: this.headers };
    return this.http.delete(`http://localhost:8080/api/employees/${id}`, options);
  }
}

