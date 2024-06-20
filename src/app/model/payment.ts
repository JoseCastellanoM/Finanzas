import { Purchase } from "./purchase";

export class Payment {
  value: number = 0;
  date: Date = new Date(Date.now());
  purchase: Purchase = new Purchase();
}
