import { Injectable } from '@angular/core';
import { Payment } from '../model/payment';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private baseURL = "http://localhost:3000/payments";

  constructor(private http : HttpClient) { }
  getPayments() : Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.baseURL}`)
  }

  getPayment(id : number) : Observable<Payment> {
    return this.http.get<Payment>(`${this.baseURL}/${id}`)
  }

  createPayment(payment : Payment) : Observable<Payment> {
    return this.http.post<Payment>(`${this.baseURL}`, payment)
  }

  updatePayment(payment : Payment) : Observable<Payment> {
    return this.http.put<Payment>(`${this.baseURL}/${payment.id}`, payment)
  }

  deletePayment(id : number) : Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/${id}`)
  }
  getPaymentsByCustomerId(customerId: number): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.baseURL}`).pipe(
      map(payments => payments.filter(payment => payment.customer_id === customerId))
    );
  }


}
