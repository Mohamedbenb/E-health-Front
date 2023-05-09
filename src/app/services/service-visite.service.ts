import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VisiteService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  url=environment.url
  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    console.log('donegetdata from visite')
    const options = { headers: this.headers };
    //console.log(this.http.get('http://localhost:8080/api/uniops/${ex}/employees', options));
    return this.http.get(`${this.url}typevisites/`, options);
  }
  //getuData(): Observable<any> {
  //  const options = { headers: this.headers };
  //  //console.log(this.http.get('http://localhost:8080/api/uniops/${ex}/employees', options));
  //  return this.http.get(`${this.url}getAllUniOpsIdTitle/`, options);
  //}

  addData(data: any,ex:any): Observable<any> {
    

    const options = { headers: this.headers };
    return this.http.post(`${this.url}typevisites`, data, options);
  }

  updateData(data: any,ex:any): Observable<any> {
    const options = { headers: this.headers };
    console.log('Data received in updateTableData:', data);
    return this.http.put(`${this.url}typevisites/${data.id}`, data, options);
  }

  deleteData(id: number,ex:any): Observable<any> {
    const options = { headers: this.headers };
    return this.http.patch(`${this.url}typevisites/${id}`, options);
  }
}
