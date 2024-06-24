import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  show_password : boolean = false;
  username : string = "";
  password : string = "";

  constructor(private user_service : UserService, private router : Router){
    /* TODO: Validaciones en login
      [ ] Debe permitir ver la contraseña ingresada
      [ ] No debe permitir ingresar con credenciales incorrectas
      [x] Debe permitir el ingreso con credenciales correctas
    */
  }

  login() : void {
    this.user_service.getUsers().subscribe( data => {
      for (let index = 0; index < data.length; index++) {
        if (data[index].username == this.username && data[index].password == this.password) {
          this.router.navigate(['/caja']);
          break;
        }
      }
    })
  }
  

}
