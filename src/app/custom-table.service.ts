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
    
    //console.log(this.http.get('http://localhost:8080/api/uniops/41/employees', options));
    return this.http.get(`http://localhost:8080/api/employees/`, options);
  }

  addTableData(data: any, ex:any): Observable<any> {
    const options = { headers: this.headers };
    return this.http.post(`http://localhost:8080/api/uniops/${ex}/`, data, options);
  }

  updateTableData(data: any): Observable<any> {
    const options = { headers: this.headers };
    console.log('Data received in updateTableData:', data);
    return this.http.put(`http://localhost:8080/api/employees/41/${data.id}`, data, options);
  }

  deleteTableData(id: number): Observable<any> {
    const options = { headers: this.headers };
    return this.http.patch(`http://localhost:8080/api/employees/41/${id}`, options);
  }
}

