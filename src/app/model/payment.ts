import { Purchase } from "./purchase";

export class Payment {
  id : number = 0;
  value: number = 0;
  date: Date = new Date(Date.now());
  purchase_id: number = -1;
  interest : number = 0;
  amortization : number = 0;
  customer_id: number = 0;
}
