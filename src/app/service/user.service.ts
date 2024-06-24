import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseURL = "http://localhost:3000/user";

  constructor(private http : HttpClient) { }

  getUsers() : Observable<User[]> {
    return this.http.get<User[]>(`${this.baseURL}`)
  }

  getUser(id : number | string) : Observable<User> {
    return this.http.get<User>(`${this.baseURL}/${id}`)
  }

  createUser(user : User) : Observable<User> {
    return this.http.post<User>(`${this.baseURL}`, user)
  }

  updateUser(user : User) : Observable<User> {
    return this.http.put<User>(`${this.baseURL}/${user.id}`, user)
  }

  deleteUser(id : number | string) : Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/${id}`)
  }
}
