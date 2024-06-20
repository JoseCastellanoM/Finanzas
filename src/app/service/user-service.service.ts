import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private baseURL = "http://localhost:3000/posts";

  constructor() { }
}
