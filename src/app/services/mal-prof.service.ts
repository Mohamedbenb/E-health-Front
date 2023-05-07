import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MalProfService {

  constructor(private http:HttpClient) { }
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  url=environment.url 
  addData(data: any,ex:any): Observable<any> {
    const options = { headers: this.headers };
    return this.http.post(`${this.url}malprof`, data, options);
  }
  getData(): Observable<any> {
    const options = { headers: this.headers };
    //console.log(this.http.get('http://localhost:8080/api/uniops/${ex}/employees', options));
    return this.http.get(`${this.url}malprof/`, options);
  }

  updateData(data: any,ex:any): Observable<any> {
    const options = { headers: this.headers };
    console.log('Data received in updateTableData:', data);
    return this.http.put(`${this.url}ed/${data.id}`, data, options);
  }

  deleteData(id: number,ex:any): Observable<any> {
    const options = { headers: this.headers };
    console.log('Data received in updateTableData:', id);
    console.log('exreceived in updateTableData:', ex);
    return this.http.patch(`${this.url}del/${id}`, options);
  }
}
