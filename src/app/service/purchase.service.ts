import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Purchase } from '../model/purchase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  private baseURL = "http://localhost:3000/purchases";

  constructor(private http : HttpClient) { }

  getPurchases() : Observable<Purchase[]> {
    return this.http.get<Purchase[]>(`${this.baseURL}`)
  }

  getPurchase(id : number) : Observable<Purchase> {
    return this.http.get<Purchase>(`${this.baseURL}/${id}`)
  }

  createPurchase(purchase : Purchase) : Observable<Purchase> {
    return this.http.post<Purchase>(`${this.baseURL}`, purchase)
  }

  updatePurchase(purchase : Purchase) : Observable<Purchase> {
    return this.http.put<Purchase>(`${this.baseURL}/${purchase.id}`, purchase)
  }

  deletePurchase(id : number) : Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/${id}`)
  }
}
