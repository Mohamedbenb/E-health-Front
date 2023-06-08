import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Employee } from '../models/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmpService {
  //employees:Employee[];
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  url=environment.url
  constructor(private http: HttpClient) {}

//   getData(): Observable<any> {
//     const options = { headers: this.headers };
    
//     //console.log(this.http.get('http://localhost:8080/api/uniops/41/employees', options));
//     return this.http.get(`${this.url}employees/`, options);
//   }
  getData(id:any): Observable<any> {
    const options = { headers: this.headers };
    
    //console.log(this.http.get('http://localhost:8080/api/uniops/41/employees', options));
    return this.http.get(`${this.url}employees/uniop/${id}`, options);
  }

  addData(data: any, ex:any): Observable<any> {
    const options = { headers: this.headers };
    return this.http.post(`${this.url}employees/${data.uniop.id}/`, data, options);
  }

  updateData(data: any): Observable<any> {
    const options = { headers: this.headers };
    console.log('Data received in updateTableData:', data);
    return this.http.put(`${this.url}employees/1/${data.id}`, data, options);
  }

  deleteData(id: number): Observable<any> {
    const options = { headers: this.headers };
    return this.http.patch(`${this.url}employees/${id}`, options);
  }
  filterEmployees(value: string,employees): Employee[] {
    
    console.log(employees)
    const filterValue = value ? value.toLowerCase() : '';
    return employees.filter((employee) => {
      const firstName = employee.firstname?.toLowerCase();
      const lastName = employee.lastname?.toLowerCase();
      const mat = employee.matricule?.toString()
      const fullName = `${employee.firstname} ${employee.lastname}`.toLowerCase();
      
        return ((fullName.includes(filterValue))||(mat.includes(filterValue)))
      
    });
  }
}
