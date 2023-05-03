import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    const options = { headers: this.headers };
    
    //console.log(this.http.get('http://localhost:8080/api/uniops/41/employees', options));
    return this.http.get(`http://localhost:8080/api/employees/`, options);
  }

  addData(data: any, ex:any): Observable<any> {
    const options = { headers: this.headers };
    return this.http.post(`http://localhost:8080/api/uniops/${ex}/`, data, options);
  }

  updateData(data: any): Observable<any> {
    const options = { headers: this.headers };
    console.log('Data received in updateTableData:', data);
    return this.http.put(`http://localhost:8080/api/employees/1/${data.id}`, data, options);
  }

  deleteData(id: number): Observable<any> {
    const options = { headers: this.headers };
    return this.http.patch(`http://localhost:8080/api/employees/1/${id}`, options);
  }
}
