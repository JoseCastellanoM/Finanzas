import { Purchase } from "./purchase";

export class Payment {
  value: number = 0;
  date: Date = new Date(Date.now());
  purchase_id: number = -1;
  interest : number = 0;
  amortization : number = 0;
}
