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
  date_beg : string = "";
  date_end : string = "";
  da : string = ""
  global_user: User = new User;
  customer: Customer = new Customer;
  purchases: Purchase[] = [];
  payments: Payment[] = [];
  pendient_payments : number = 0;
  total_debt : number = 0;
  credit_limit : number = 0;
  min_date : Date = new Date(Date.now());
  max_date : Date = new Date(Date.now());


  constructor(private router : Router, private route: ActivatedRoute, private purchase_service: PurchaseService, private payment_service: PaymentService, private customer_service: CustomerService, private user_service : UserService) {
    /* TODO: Validaciones en lista de operaciones
      [ ] La fechas establecidas por el cliente deben ser validas
      [ ] Se debe mostrar correctamente dentro de la fecha establecida
      [ ] Se debe mostrar datos de la cuenta como pagos pendientes, la deuda total y el credito disponible del cliente
    */
    this.date_beg = this.transform_date_to_date_input(new Date(Date.now()));
    this.date_end = this.transform_date_to_date_input(new Date(Date.now()));
    
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
            this.get_customer_operations();
          });
          
        })
      })
    });
  }

  get_customer_operations() {
    this.purchase_service.getPurchasesByCustomerId(this.customer.id).subscribe(data => {
      this.purchases = []
      
      if (data.length == 0) {
        return;
      }
      
      data = data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      this.min_date = new Date(data[0].date);

      for (let i = 0; i < data.length; i++) {
        if (this.is_date_between(data[i].date, this.transform_date_input_to_date(this.date_beg), this.transform_date_input_to_date(this.date_end))) {
          this.purchases.push(data[i]);
        }
      }
    })

    this.payment_service.getPaymentsByCustomerId(this.customer.id).subscribe(data => {
      this.payments = []
      
      if (data.length == 0) {
        return;
      }
      
      data = data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      this.max_date = new Date(data[data.length - 1].date);
      this.max_date.setDate(this.max_date.getDate()+1);
      
      this.credit_limit = this.global_user.credit_limit;
      this.total_debt, this.pendient_payments = 0;
      
      for (let i = 0; i < data.length; i++) {
        if (data[i].status == false) {
          this.pendient_payments++;
          this.total_debt += data[i].amortization;
          this.credit_limit -= data[i].amortization;
        }

        if (this.is_date_between(data[i].date, this.transform_date_input_to_date(this.date_beg), this.transform_date_input_to_date(this.date_end))) {
          this.payments.push(data[i]);
        }
      }
    })
  }

  transform_date_to_date_input(date : Date) : string {
    let new_date = date.getFullYear() + '-' + ((date.getMonth() < 9) ? `0${date.getMonth() + 1}` : date.getMonth() + 1) + '-' + date.getDate();
    return new_date;
  }

  transform_date_input_to_date(date : string) : Date{
    let new_date = new Date(date);
    new_date.setMinutes(new_date.getMinutes() + new Date(Date.now()).getTimezoneOffset());
    return new_date;
  }

  is_date_between(date : Date, min_date : Date, max_date: Date) {
    date = new Date(date);
    min_date = new Date(min_date);
    max_date = new Date(max_date);

    return ((date.getTime() >= min_date.getTime()) && (date.getTime() <= max_date.getTime()));
  }

  
}
