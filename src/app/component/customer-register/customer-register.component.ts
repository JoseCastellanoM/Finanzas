import { Component } from '@angular/core';
import { Customer } from '../../model/customer';
import { CustomerService } from '../../service/customer.service';
import { UserService } from '../../service/user.service';
import { User } from '../../model/user';

@Component({
  selector: 'app-customer-register',
  templateUrl: './customer-register.component.html',
  styleUrl: './customer-register.component.css'
})
export class CustomerRegisterComponent {
  new_customer : Customer;
  global_user : User = new User;
  min_date : Date = new Date(Date.now());
  max_date : Date = new Date(Date.now());
  

  constructor(private customer_service : CustomerService, private user_service : UserService) {
    
    this.new_customer = new Customer;
    this.user_service.getUser("1").subscribe(data => {
      this.global_user = data;
      this.min_date = new Date(this.min_date.getTime() - (this.global_user.payment_time * 24 * 60 * 60 * 1000))
    })
  }

  validate_customer(customer: Customer) {
    return ( (customer.name != "")
      && (customer.dni >= 10000000 && customer.dni <= 99999999)
      && (customer.phone >= 900000000 && customer.phone <= 999999999)
      && (customer.payment_date.getTime() <= Date.now())
    );
  }

  register_customer() : void{
    
    if (!(this.new_customer.phone >= 900000000 && this.new_customer.phone <= 999999999)
      || !(this.new_customer.dni >= 10000000 && this.new_customer.dni <= 99999999)){
      console.log("Incorrect user")
      return;
    }

    this.customer_service.getCustomers().subscribe(data => {
      let aux_variable = new Date(this.new_customer.payment_date);
      this.new_customer.id = `${data.length + 1}`;
      this.new_customer.payment_date = new Date(Date.now());
      this.new_customer.payment_date.setFullYear(aux_variable.getUTCFullYear());
      this.new_customer.payment_date.setMonth(aux_variable.getUTCMonth());
      this.new_customer.payment_date.setDate(aux_variable.getUTCDate());
      
      if (this.validate_customer(this.new_customer) == false) {
        console.log("Invalid customer");
        return;
      }

      this.customer_service.createCustomer(this.new_customer).subscribe(response => {
        console.log("Customer created")
        console.log(response);
        
      })
    })

  }

}
