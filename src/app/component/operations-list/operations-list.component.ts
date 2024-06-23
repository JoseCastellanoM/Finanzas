import { Component, OnInit } from '@angular/core';
import { Purchase } from '../../model/purchase';
import { PurchaseService } from '../../service/purchase.service';
import { Payment } from '../../model/payment';
import { PaymentService } from '../../service/payment.service';
import { Customer } from '../../model/customer';
import { CustomerService } from '../../service/customer.service';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';

@Component({
  selector: 'app-operations-list',
  templateUrl: './operations-list.component.html',
  styleUrl: './operations-list.component.css'
})
export class OperationsListComponent implements OnInit {
  selectedOption: string = '1';
  purchases: Purchase[] = [];
  payments: Payment[] = [];
  customer: Customer = new Customer;
  customerId: number = 2;


  constructor(private route: ActivatedRoute, private purchaseService: PurchaseService, private paymentService: PaymentService, private customerService: CustomerService) { }

  ngOnInit(): void {
    /*this.route.params.subscribe((datas: Params) => {
      console.log(this.customerId);
      this.customerId = datas['id']; //capturando el id del listado
      console.log(this.customerId);
      this.loadCustomer(this.customerId);
      this.loadPurchases(this.customerId);
      this.loadPayments(this.customerId);
      console.log(datas);
    });*/
    this.loadCustomer(this.customerId);
    this.loadPurchases(this.customerId);
    this.loadPayments(this.customerId);


  }
  loadCustomer(id: number): void {
    this.customerService.getCustomer(`${id}`).subscribe((data: Customer) => {
      this.customer = data;
      this.loadPurchases(id);
      this.loadPayments(id);
    });
  }

  loadPurchases(customerId: number): void {
    this.purchaseService.getPurchasesByCustomerId(customerId).subscribe((data: Purchase[]) => {
      this.purchases = data;
    });
  }

  loadPayments(customerId: number): void {
    this.paymentService.getPaymentsByCustomerId(customerId).subscribe((data: Payment[]) => {
      this.payments = data;
    });
  }
}
