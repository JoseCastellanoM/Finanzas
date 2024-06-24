import { Component } from '@angular/core';
import { Customer } from '../../model/customer';
import { CustomerService } from '../../service/customer.service';
import { Purchase } from '../../model/purchase';
import { PurchaseService } from '../../service/purchase.service';
import { PaymentService } from '../../service/payment.service';
import { Payment } from '../../model/payment';
import { User } from '../../model/user';
import { UserService } from '../../service/user.service';
//import { format, addDays, subDays, differenceInDays } from 'date-fns';

@Component({
  selector: 'app-cash-register',
  templateUrl: './cash-register.component.html',
  styleUrl: './cash-register.component.css'
})
export class CashRegisterComponent {
  value_selection : number = 1; // It stores the select value about purchase and payment register
  search_string : string = ""; // The search made by the user
  list_of_customers :  Customer[] = [] // it stores the list of customers showed in the table
  payment_method : number = 1; // 
  
  global_user : User = new User;
  selected_customer : Customer = new Customer;
  customer_payments : Payment[] = [];
  new_purchase : Purchase = new Purchase;
  
  

  constructor(private user_service : UserService, private customer_service : CustomerService, private purchase_service : PurchaseService, private payment_service : PaymentService){
    this.user_service.getUser("1").subscribe(data => { // TODO: Change the paramete 1 by "1"
      this.global_user = data;
    })
    customer_service.getCustomers().subscribe(data => {
      this.list_of_customers = data;
    })
  }

  search_customer() : void {
    this.customer_service.getCustomers().subscribe(data => {
      this.list_of_customers = []
      for(let i = 0; i < data.length; i++) {
        if(data[i].name.startsWith(this.search_string)){
          this.list_of_customers.push(data[i]);
        }
      }
    })
  }

  select_customer(user_id : string) {
    this.customer_service.getCustomer(user_id).subscribe( data => {
      this.selected_customer = data;
      this.update_customer_payments();
    })
  }

  update_customer_payments() : void {
    this.payment_service.getPaymentsByCustomerId(this.selected_customer.id).subscribe(data => {
      this.customer_payments = data;
      console.log("Payments");
      console.log(data);
    });
  }
  
  get_last_payment_date(first_date :  Date, last_date : Date, period : number) : Date {
    first_date = new Date(first_date);
    last_date = new Date(last_date);
    
    return new Date(last_date.getTime() - (last_date.getTime() - first_date.getTime()) % (period * 24 * 60 * 60 * 1000))
  }

  get_earlier_date(date1 : Date, date2 : Date) : Date {
    date1 = new Date(date1);
    date2 = new Date(date2);
    return ((date1.getTime() - date2.getTime()) <= 0) ? date1 : date2;
  }
  
  register_purchase() : void {
    this.purchase_service.getPurchases().subscribe(data_purchases => {
      this.new_purchase.id = `${data_purchases.length + 1}`;
      this.new_purchase.customer_id = this.selected_customer.id;
      this.new_purchase.date = new Date(Date.now());
      this.new_purchase.grace_periods = (this.payment_method == 2 && this.new_purchase.grace_periods);
      this.new_purchase.status = false;
      this.new_purchase.type_of_credit = this.payment_method;
      this.new_purchase.periods = (this.payment_method == 2) ? this.new_purchase.periods : 1;
      this.new_purchase.periods_left = this.new_purchase.periods;
      
      this.payment_service.getPayments().subscribe(data => {
        let credit_limit = this.global_user.credit_limit;
        let pendient_payments : Payment[] = [];
  
        // First we filter the payments to know what are the pendient payments that are not paid until now
        data.forEach(item => {
          // TODO: Use the moratorium payment to increment the value of the payments
          item.date = new Date(item.date);
          if (item.status == false) {
            credit_limit -= item.amortization;
            if ((item.date.getTime() < Date.now())) {
              pendient_payments.push(item);
            }
          }
        })
  
        if (pendient_payments.length > 0) {
          console.log("Tienes pagos pendientes: ");
          console.log(pendient_payments);
          return;
        }
  
        if (this.new_purchase.value > credit_limit) {
          console.log("Your credit limit now is " + credit_limit);
          return;
        }

        // Then we create purchase and payments
        this.purchase_service.createPurchase(this.new_purchase).subscribe(data => {
          console.log("New purchase created");
          console.log(data);
        });

        let new_payment : Payment = new Payment;
        let equivalent_interest_rate = (this.global_user.interest_type == 1) ? (this.global_user.interest_rate * this.global_user.payment_time / 360) : ((1 + this.global_user.interest_rate)**(this.global_user.payment_time/360)-1);
        new_payment.value = this.new_purchase.value * (equivalent_interest_rate*(1 + equivalent_interest_rate)**this.new_purchase.periods) / ((1 + equivalent_interest_rate)**this.new_purchase.periods - 1);  
        new_payment.value = new_payment.value * (1 + equivalent_interest_rate)**(this.new_purchase.grace_periods ? this.global_user.grace_periods : 0)
        for (let i = 1; i <= this.new_purchase.periods; i++) {
          new_payment.id = `${data.length + i}`;
          new_payment.customer_id = this.selected_customer.id;
          new_payment.purchase_id = this.new_purchase.id;
          new_payment.amortization = new_payment.value / ((1 + equivalent_interest_rate)**i);
          new_payment.interest =  new_payment.value - new_payment.amortization;
          new_payment.status = false;
          new_payment.date = this.get_last_payment_date(this.selected_customer.payment_date, new Date(Date.now()), this.global_user.payment_time);
          new_payment.date.setDate(new_payment.date.getDate() + ((i + (this.new_purchase.grace_periods == true ? this.global_user.grace_periods : 0)) * this.global_user.payment_time));
          console.log(new_payment);
          this.payment_service.createPayment(new_payment).subscribe(data => {
            console.log(data);
          });
        }
        
      })
    })
    
  }

  pay_due(payment : Payment) {
    payment.status = true;
    this.payment_service.updatePayment(payment).subscribe({})
  }
}
