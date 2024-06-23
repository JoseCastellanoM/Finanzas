

export class  User {
  id: number = 0;
  username: string = "";
  password: string = "";
  confirmPassword: string = "";
  interest_rate: number = 0; // It considers the interest rate is anual
  interest_type : number = 0; // 1: nominal - 2: efectiva
  moratorium_interest_rate: number = 0;
  credit_limit: number = 0;
  grace_periods: number = 0;
  payment_time: number = 0;
}



