import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GridService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  getTableData(): Observable<any> {
    const options = { headers: this.headers };
    //console.log(this.http.get('http://localhost:8080/api/uniops/${ex}/employees', options));
    return this.http.get(`http://localhost:8080/api/societes/`, options);
  }

  addTableData(data: any,ex:any): Observable<any> {
    const options = { headers: this.headers };
    return this.http.post(`http://localhost:8080/api/societes`, data, options);
  }

  updateTableData(data: any,ex:any): Observable<any> {
    const options = { headers: this.headers };
    console.log('Data received in updateTableData:', data);
    return this.http.put(`http://localhost:8080/api/employees/${ex}/${data.id}`, data, options);
  }

  deleteTableData(id: number,ex:any): Observable<any> {
    const options = { headers: this.headers };
    return this.http.patch(`http://localhost:8080/api/employees/${ex}/${id}`, options);
  }
}

