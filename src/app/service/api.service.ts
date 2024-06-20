import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiURL = 'http://localhost:4000';
  constructor(private http: HttpClient) { }

  getUsers() : Observable<any> {
    return this.http.get(`${this.apiURL}/users`)
  }


}
