import { Customer } from "./customer";

export class Purchase {
  id: number = 0;
  value: number = 0;
  detail: string = "";
  date: Date = new Date(Date.now());
  periods: number = 0;
  grace_periods: boolean = false;
  status: boolean = false;
  type_of_credit: number =  0;
  customer: Customer = new Customer();
}
