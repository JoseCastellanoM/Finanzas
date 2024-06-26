import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { User } from '../../model/user';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.css'
})
export class ConfigurationComponent {
  show_password : boolean = false;
  global_user : User = new User;

  constructor(private user_service : UserService, private router : Router){

    this.user_service.getUser("1").subscribe(data => {
      this.global_user = data;
    });
  }
  validate_user(user: User) : boolean {
    return ( (user.username != "")
      && (user.password.length <= 8)
      && (user.interest_rate > 0.08 && user.interest_rate < 0.1)
      && (user.moratorium_interest_rate > 0.08 && user.moratorium_interest_rate < 0.1)
      && (user.credit_limit >= 10 && user.credit_limit <= 500)
      && (user.grace_periods >= 1 && user.grace_periods <= 5)
      && (user.payment_time >= 1 && user.payment_time <= 30)
    );
  }

  update_user() : void {
    if (this.validate_user(this.global_user)) {
      this.user_service.updateUser(this.global_user).subscribe(data => {
        console.log("User updated");
        console.log(data);
      })
    } else {
      console.log("Datos incorrectos")
    }
  }
}
