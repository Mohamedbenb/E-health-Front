import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TypeExamService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  url=environment.url
  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    console.log('donegetdata from visite')
    const options = { headers: this.headers };
    //console.log(this.http.get('http://localhost:8080/api/uniops/${ex}/employees', options));
    return this.http.get(`${this.url}typeexams/`, options);
  }
  addData(data: any,ex:any): Observable<any> {
    
    data.color={primary:'#FF000'}
    const options = { headers: this.headers };
    console.log('data before sending', data)
    return this.http.post(`${this.url}typeexams`, data, options);
  }
  updateData(data: any,ex:any): Observable<any> {
    const options = { headers: this.headers };
    console.log('Data received in updateTableData:', data);
    return this.http.put(`${this.url}typeexams/${data.id}`, data, options);
  }

  deleteData(id: number): Observable<any> {
    const options = { headers: this.headers };
    return this.http.patch(`${this.url}typeexams/${id}`, options);
  }
}
