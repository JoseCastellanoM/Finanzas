import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { User } from '../../model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  show_password : boolean = false;
  username : string = "";
  password : string = "";

  error_message: string = "";

  constructor(private user_service : UserService, private router : Router){

  }
  validateUser(): boolean {
    if (!this.username || this.username.length > 8 || !this.password || this.password.length > 8) {
      //El nombre de usuario y la contraseña deben tener como máximo 8 caracteres.";
      return false;
    }
    return true;
  }

  login() : void {
    //Validación de usuario
    if (!this.validateUser()) {
      setTimeout(() => {
        this.error_message = "Credenciales incorrectas";
        // Hacer que el mensaje desaparezca después de 3 segundos
        setTimeout(() => {
          this.error_message = "";
        }, 3000);

      }, 0);
      return;
    }
    this.user_service.getUsers().subscribe( data => {
      for (let index = 0; index < data.length; index++) {
        if (data[index].username == this.username && data[index].password == this.password) {
          this.router.navigate(['/caja']);
          break;
        }else{
          setTimeout(() => {
            this.error_message = "Usuario no existente";
            // Hacer que el mensaje desaparezca después de 3 segundos
            setTimeout(() => {
              this.error_message = "";
            }, 3000);

          }, 0);
          break;
        }
      }
    })
  }


}
