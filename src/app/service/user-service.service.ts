import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private baseURL = "http://localhost:3000/users";

  constructor(private http : HttpClient) { }

  getUsers() : Observable<User[]> {
    return this.http.get<User[]>(`${this.baseURL}`)
  }

  getUser(id : number) : Observable<User> {
    return this.http.get<User>(`${this.baseURL}/${id}`)
  }

  createUser(user : User) : Observable<User> {
    return this.http.post<User>(`${this.baseURL}`, user)
  }

  updateUser(user : User) : Observable<User> {
    return this.http.put<User>(`${this.baseURL}/${user.id}`, user)
  }

  deleteUser(id : number) : Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/${id}`)
  }
}
