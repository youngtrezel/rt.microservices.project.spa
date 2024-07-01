import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(private http: HttpClient) { }

  getPlates(pageNumber: number, pageSize: number) : Observable<any> {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    const params = new HttpParams().append('pageNumber', pageNumber).append('pageSize', pageSize)
    return this.http.get('http://localhost:15683/sales/getplates', { headers, params }).pipe();
  }

  plateCount(filter: string) : Observable<any> {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    const params = new HttpParams().append('filter', filter);
    return this.http.get('http://localhost:15683/sales/getplatecount', { headers, params}).pipe();
  }

  getSoldPlates(pageNumber: number, pageSize: number) : Observable<any> {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    const params = new HttpParams().append('pageNumber', pageNumber).append('pageSize', pageSize)
    return this.http.get('http://localhost:15683/sales/getsoldplates', { headers, params }).pipe();
  }

  plateSoldCount() : Observable<any> {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.get('http://localhost:15683/sales/getsoldplatecount', { headers }).pipe();
  }  

  sellPlate(registration: string) : Observable<any> {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    const params = new HttpParams().append('registration', registration);
    return this.http.get('http://localhost:15683/sales/sellplate', { headers, params}).pipe();
  }

  getRevenue() : Observable<any> {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.get('http://localhost:15683/sales/getrevenue', { headers }).pipe();
  }

}
