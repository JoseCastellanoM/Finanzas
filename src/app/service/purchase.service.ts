import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  private baseURL = "http://localhost:3000/posts";
  constructor() { }
}
