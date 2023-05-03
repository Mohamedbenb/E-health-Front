import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  url=environment.url
  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    const options = { headers: this.headers };
    
    //console.log(this.http.get('http://localhost:8080/api/uniops/41/employees', options));
    return this.http.get(`${this.url}employees/`, options);
  }

  addData(data: any, ex:any): Observable<any> {
    const options = { headers: this.headers };
    return this.http.post(`${this.url}employees/${ex}/`, data, options);
  }

  updateData(data: any): Observable<any> {
    const options = { headers: this.headers };
    console.log('Data received in updateTableData:', data);
    return this.http.put(`${this.url}employees/1/${data.id}`, data, options);
  }

  deleteData(id: number): Observable<any> {
    const options = { headers: this.headers };
    return this.http.patch(`${this.url}employees/1/${id}`, options);
  }
}
