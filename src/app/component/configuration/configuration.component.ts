import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.css'
})
export class ConfigurationComponent {
  show_password : boolean = false;
  show_password_confirm : boolean = false;
  username : string = "";
  password : string = "";
  confirmPassword : string = "";
  interest_rate : number = 0;
  moratorium_interest_rate : number = 0;
  credit_limit : number = 0;
  grace_periods : number = 0;
  payment_time : number = 0;

  constructor(private user_service : UserService, private router : Router){  }

  configuration() : void {
    this.user_service.getUsers().subscribe( data => {
      for (let index = 0; index < data.length; index++) {
        if (data[index].username == this.username && data[index].password == this.password && ((data[index].confirmPassword == this.confirmPassword) == (data[index].password == this.password))) {
          this.router.navigate(['']);
          break;
        }
      }
    })
  }

  /*configuration1() : void {
    // Obtener los usuarios del servicio
    this.user_service.getUsers().subscribe(data => {
      // Buscar el usuario con el nombre de usuario y contraseña actual
    let user = data.find(u => u.username == this.username && u.password == this.password);
  
      // Si se encuentra el usuario y la contraseña confirmada coincide
      if (user && this.password === this.password) {
        // Actualizar la contraseña del usuario
        user.password = this.confirmPassword;
  
        // Guardar los cambios (este método debería ser implementado en tu servicio)
        this.user_service.updateUser(user).subscribe(
          response => {
            // Navegar a la ruta deseada si la actualización es exitosa
            this.router.navigate(['']);
          },
          error => {
            // Manejar el error y proporcionar retroalimentación al usuario
            console.error("Error actualizando el usuario:", error);
          }
        );
      } else {
        // Proporcionar retroalimentación al usuario si la validación falla
        console.log("Nombre de usuario o contraseña incorrectos, o las contraseñas no coinciden.");
      }
    });
  }*/
  

}
