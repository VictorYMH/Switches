import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SwitchService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };


  constructor(private http: HttpClient) { }

  getSwitches(): Observable<boolean[]> {
    const url = `${environment.API_HOST}${environment.API_PATH}`;
    return this.http.get<boolean[]>(url);
  }

  postSwitches(req: boolean[]): Observable<boolean> {
    const url = `${environment.API_HOST}${environment.API_PATH}`;
    return this.http.post<boolean>(url, JSON.stringify(req), this.httpOptions);
  }
}
