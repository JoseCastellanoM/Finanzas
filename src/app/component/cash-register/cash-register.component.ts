import { Component } from '@angular/core';
import { Customer } from '../../model/customer';
import { CustomerService } from '../../service/customer.service';
import { Purchase } from '../../model/purchase';
import { User } from '../../model/user';
//import { format, addDays, subDays, differenceInDays } from 'date-fns';

@Component({
  selector: 'app-cash-register',
  templateUrl: './cash-register.component.html',
  styleUrl: './cash-register.component.css'
})
export class CashRegisterComponent {
  value_selection : number = 1; // It stores the select value about purchase and payment register
  search_string : string = ""; // The search made by the user
  list_of_customers :  Customer[] = [];
  payment_method : number = 1;


  /*
  se sobreentiende  que la tasa es anual
  es la misma tasa para todos
  el numero de dias para pagar aplica para todos

  */

  user : User = new User;
  selected_customer : Customer = new Customer;
  new_purchase : Purchase = new Purchase;
  

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
    this.selected_customer.id = user_id;
    console.log("user id selected: " + this.selected_customer.id);
  }

  /*
    PARA COMPRAR
    - Pagar lo ultimo que se debe
      - Filtrar los pagos pendientes
      - Evaluar si los pagos pendientes son menores o igual a la ultima fecha de pago pasada
    - No exceder el limite de prestamo
  */

  get_last_payment_date(select_date :  Date, interval_days : number) : Date {

    let last_payment = new Date();
    let diffTime = Date.now() - new Date(select_date).getTime();


    //(diffTime >= 0) ? (Math.abs(diffTime) % interval_days) : (interval_days - Math.abs(diffTime) % interval_days)
    last_payment =  new Date(Date.now() - diffTime % (interval_days * 24 * 60 * 60 * 1000))

    return last_payment;
  }
  
  date_selected : Date = new Date();

  register_purchase() : void {
    //this.date_selected = new Date(this.date_selected);
    //console.log(this.date_selected.getTime())
    console.log(this.get_last_payment_date(this.date_selected, 10))
    
  }

}
