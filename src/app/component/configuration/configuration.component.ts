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
    /* TODO: Validaciones de la configuracion de usuario
      [ ] El nombre de usuario no puede estar vacio
      [ ] La nueva contraseña ingresada debe tener minimo 8 caracteres
      [ ] El valor de la tasa de interes debe estar entre 0 y 1
      [ ] El valor de la tasa moratoria debe estar entre 0 y 1;
      [ ] El limite de credito determinado por la aplicación es de 1000so y el credito brindado por la bodega no debe exceder este valor
      [ ] El limite de periodos de gracia es de 5 y los periodos de gracia otorgados por la bodega no debe superar este valor
      [x] Se debe guardar correctamente todos los cambios de la bodega
    */
    
    this.user_service.getUser("1").subscribe(data => {
      this.global_user = data;
    });
  }
  validate_user(user: User) : boolean {
    return ( (user.username != "")
      && (user.password.length >= 8)
      && (user.interest_rate > 0.08 && user.interest_rate < 0.1)
      && (user.moratorium_interest_rate > 0.08 && user.moratorium_interest_rate < 0.1)
      && (user.credit_limit >= 10 && user.credit_limit <= 500)
      && (user.grace_periods >= 1 && user.grace_periods <= 5)
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
