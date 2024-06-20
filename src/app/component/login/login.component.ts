import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public login_form : FormGroup;

  constructor(private fb : FormBuilder){
    this.login_form = this.fb.group({})
  }
}
