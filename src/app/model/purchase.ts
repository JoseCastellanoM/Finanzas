export class Purchase {
  id: string = "";
  value: number = 0;
  detail: string = "";
  customer_id : string = "";
  date: Date = new Date(Date.now());
  grace_periods: boolean = false;
  status: boolean = false; //true: paid - false: no paid
  type_of_credit: number =  0; // 1: I. Valor futuro - 2: I. Anualidad vencida
  periods: number = 0;
  periods_left : number = 0;
}
