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
    /* TODO: Validaciones en le registro del cliente
      TODO Setup inputs with their respective label
      [ ] Debe ser ingresado el nombre. Debe ser diferente de ""
      [ ] El dni debe estar entre 10000000 y 99999999
      [ ] El telefono debe estar entre 900000000 y 999999999
      [ ] La fecha no puede exceder la actual
      [x] Se debe registrar correctamente el nuevo cliente
    */
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
      let aux_variable = new Date(this.new_customer.payment_date);
      
      this.new_customer.id = `${data.length + 1}`;
      this.new_customer.payment_date = new Date(Date.now());
      

      
      this.new_customer.payment_date.setFullYear(aux_variable.getUTCFullYear());
      this.new_customer.payment_date.setMonth(aux_variable.getUTCMonth());
      this.new_customer.payment_date.setDate(aux_variable.getUTCDate());
      console.log(this.new_customer);

      this.customer_service.createCustomer(this.new_customer).subscribe(response => {
        console.log("Customer created")
        console.log(response);
        
      })
    })

  }

}
