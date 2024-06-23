import { Component } from '@angular/core';
import { Customer } from '../../model/customer';
import { CustomerService } from '../../service/customer.service';

@Component({
  selector: 'app-customer-register',
  templateUrl: './customer-register.component.html',
  styleUrl: './customer-register.component.css'
})
export class CustomerRegisterComponent {
  new_customer : Customer;

  constructor(private customer_service : CustomerService) {
    this.new_customer = new Customer;
  }

  register_user() : void{
    // Validate user
    if (!(this.new_customer.phone >= 900000000 && this.new_customer.phone <= 999999999)
      || !(this.new_customer.dni >= 10000000 && this.new_customer.dni <= 99999999)){
      console.log("Incorrect user")
      console.log(this.new_customer);
      return;
    }

    this.customer_service.getCustomers().subscribe(data => {
      this.new_customer.id = `${data.length + 1}`;
      this.customer_service.createCustomer(this.new_customer).subscribe(response => {
        console.log("Customer created")
        console.log(response);
        
      })
    })

  }

}
