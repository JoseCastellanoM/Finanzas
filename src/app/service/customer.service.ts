import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../model/customer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseURL = "http://localhost:3000/customers";

  constructor(private http : HttpClient) { }

  getCustomers() : Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.baseURL}`)
  }

  getCustomer(id : number) : Observable<Customer> {
    return this.http.get<Customer>(`${this.baseURL}/${id}`)
  }

  createCustomer(customer : Customer) : Observable<Customer> {
    return this.http.post<Customer>(`${this.baseURL}`, customer)
  }

  updateCustomer(customer : Customer) : Observable<Customer> {
    return this.http.put<Customer>(`${this.baseURL}/${customer.id}`, Customer)
  }

  deleteCustomer(id : number) : Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/${id}`)
  }
}
