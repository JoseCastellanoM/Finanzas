import { Purchase } from "./purchase";

export class Payment {
  id : string = "";
  value: number = 0;
  date: Date = new Date(Date.now());
  customer_id: string = "";
  purchase_id: string = "";
  amortization : number = 0;
  interest : number = 0;
  status : boolean = true; //true: paid - false: no paid
}
