import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Societe } from '../models/Societe';

@Injectable({
  providedIn: 'root'
})
export class SocieteService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  url=environment.url
  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    const options = { headers: this.headers };
    //console.log(this.http.get('http://localhost:8080/api/uniops/${ex}/employees', options));
    return this.http.get(`${this.url}societes/`, options);
  }
  getuData(): Observable<any> {
    const options = { headers: this.headers };
    //console.log(this.http.get('http://localhost:8080/api/uniops/${ex}/employees', options));
    return this.http.get(`${this.url}getAllUniOpsIdTitle/`, options);
  }

  addData(data: any,ex:any): Observable<any> {
    const options = { headers: this.headers };
    return this.http.post(`${this.url}societes`, data, options);
  }

  updateData(data: any,ex:any): Observable<any> {
    const options = { headers: this.headers };
    console.log('Data received in updateTableData:', data);
    return this.http.put(`${this.url}societes/${data.id}`, data, options);
  }

  deleteData(id: number,ex:any): Observable<any> {
    const options = { headers: this.headers };
    return this.http.patch(`${this.url}societes/${id}`, options);
  }
  filter(value: string,societe:any): Societe[] {
    const filterValue = value ? value.toLowerCase() : '';
    return societe
      .map((societe) => {
        return {
          id: societe.id,
          title: societe.title,
          mat: societe.mat,
          tel: societe.tel,
          fax: societe.fax,
          adresse: societe.adresse,
          codepostale: societe.codepostale,
          uniops: societe.uniops.filter((u) =>
            typeof u.title === 'string' &&
            u.title.toString().toLowerCase().includes(filterValue)
          ),
        };
      })
      .filter((societe) => societe.uniops.length);
  }
}
