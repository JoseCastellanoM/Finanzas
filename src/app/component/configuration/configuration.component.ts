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

  update_user() : void {
    this.user_service.updateUser(this.global_user).subscribe(data => {
      console.log("User updated");
      console.log(data);
    })
  }
}
