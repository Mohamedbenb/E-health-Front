import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeclarationService {

  constructor(private http:HttpClient) { }
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  url=environment.url 
  addData(data: any): Observable<any> {
    const options = { headers: this.headers };
    return this.http.post(`${this.url}dec/${data.empid}/${data.malid}`, data, options);
  }
  getData(id): Observable<any> {
    const options = { headers: this.headers };
    
    return this.http.get(`${this.url}dec/mal/${id}`, options);
  }
  updateData(data: any,ex:any): Observable<any> {
    const options = { headers: this.headers };
    console.log('Data received in updateTableData:', data);
    return this.http.put(`${this.url}dec/ed/${data.empid}/${data.malid}/${data.id}`, data, options);
  }
}
