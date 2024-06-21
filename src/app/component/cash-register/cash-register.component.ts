import { Component } from '@angular/core';
import { Customer } from '../../model/customer';
import { CustomerService } from '../../service/customer.service';

@Component({
  selector: 'app-cash-register',
  templateUrl: './cash-register.component.html',
  styleUrl: './cash-register.component.css'
})
export class CashRegisterComponent {
  value_selection : number = 1; // It stores the select value about purchase and payment register
  search_string : string = ""; // The search made by the user
  selected_user_id : number = 1;
  list_of_customers :  Customer[] = [];

  constructor(private customer_service : CustomerService){
    customer_service.getCustomers().subscribe(data => {
      this.list_of_customers = data;
    })
  }

  search_user() : void {
    this.customer_service.getCustomers().subscribe(data => {
      this.list_of_customers = []
      for(let i = 0; i < data.length; i++) {
        if(data[i].name.startsWith(this.search_string)){
          this.list_of_customers.push(data[i]);
        }
      }
    })
  }


  select_user(user_id : number) {
    this.selected_user_id = user_id;
    console.log("user id selected: " + this.selected_user_id);
  }

}
