import { Component, OnInit } from '@angular/core';
import { Purchase } from '../../model/purchase';
import { PurchaseService } from '../../service/purchase.service';
import { Payment } from '../../model/payment';
import { PaymentService } from '../../service/payment.service';
import { Customer } from '../../model/customer';
import { CustomerService } from '../../service/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { User } from '../../model/user';

@Component({
  selector: 'app-operations-list',
  templateUrl: './operations-list.component.html',
  styleUrl: './operations-list.component.css'
})
export class OperationsListComponent {
  selected_option: number = 1;
  date_beg : Date = new Date(Date.now());
  date_end : Date = new Date(Date.now());
  da : string = ""
  global_user: User = new User;
  customer: Customer = new Customer;
  purchases: Purchase[] = [];
  payments: Payment[] = [];
  pendient_payments : number = 0;
  total_debt : number = 0;
  credit_limit : number = 0;


  constructor(private router : Router, private route: ActivatedRoute, private purchase_service: PurchaseService, private payment_service: PaymentService, private customer_service: CustomerService, private user_service : UserService) {
    
    let aux = new Date('2024-06-27T00:00:00.000Z');
    console.log(aux)
    console.log(aux.toUTCString())
    // this.date_beg = `${aux.getUTCFullYear()}-${(aux.getUTCMonth() + 1 > 9) ? aux.getUTCMonth()+1 : `0${aux.getUTCMonth() + 1}`}-${aux.getDate()}`;
    
    
    console.log(this.date_beg);
    
    this.da = this.date_end.toLocaleDateString().replaceAll('/', '-');
    this.route.paramMap.subscribe(params => {
      this.user_service.getUser("1").subscribe(user => {
        this.global_user = user;

        this.customer_service.getCustomers().subscribe(data => {
          let customer_id = Number(params.get("id"));
          
          if (customer_id > data.length) {
            router.navigate(['/operaciones', 1]);
            return;
          }
          
          this.customer_service.getCustomer(customer_id).subscribe(data => {
            this.customer = data;
            console.log(data);
          });
          
          this.get_customer_operations();
        })
      })
    });
  }

  get_customer_operations() {
    this.purchase_service.getPurchasesByCustomerId(this.customer.id).subscribe(data => {
      //this.purchases = data;
      //console.log(data);
      this.purchases = []

      for (let i = 0; i < data.length; i++) {
        
        data[i].date = new Date(data[i].date);
        //data[i].date.setHours(data[i].date.getHours() + 5);
        if (this.is_date_between(data[i].date, this.date_beg, this.date_end)) {
          this.purchases.push(data[i]);
        }
      }
    })

    this.payment_service.getPaymentsByCustomerId(this.customer.id).subscribe(data => {
      //this.payments = data;
      //console.log(data);
      this.payments = []
      this.credit_limit = this.global_user.credit_limit;
      this.total_debt, this.pendient_payments = 0;
      
      for (let i = 0; i < data.length; i++) {
        data[i].date = new Date(data[i].date);
        data[i].date.setHours(data[i].date.getHours() + 5);
        
        if (data[i].status == false) {
          this.pendient_payments++;
          this.total_debt += data[i].amortization;
          this.credit_limit -= data[i].amortization;
        }

        if (this.is_date_between(data[i].date, this.date_beg, this.date_end)) {
          this.payments.push(data[i]);
        }
      }
    })
  }

  is_date_between(date : Date, min_date : Date, max_date: Date) {
    date = new Date(date);
    min_date = new Date(min_date);
    max_date = new Date(max_date);
    
    return ((date.getTime() >= min_date.getTime()) && (date.getTime() <= max_date.getTime()));
  }

  
}
