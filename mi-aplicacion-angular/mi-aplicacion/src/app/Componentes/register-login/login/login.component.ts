import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginRegisterService } from 'src/app/Servicios/LoginRegister/login-register.service';
import { User } from 'src/app/types/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private service : LoginRegisterService, private router : Router) {}

  loginForm = new FormGroup({
    userName : new FormControl(''),
    password : new FormControl('')
  })

  submitLogin(){
    let cartelError = document.querySelector("#errorMsg") as HTMLElement

    const users = this.service.returnUsersFromLocalStorage() as Array<User>;

    const userName = this.loginForm.get('userName')?.value;
    const password = this.loginForm.get('password')?.value;

    const isValidUser = this.service.validateUser(userName!, password!);

    if (isValidUser){
      this.router.navigate(['../../']);
    } else {
      
      cartelError.textContent = "ERROR // LAS CREDENCIALES NO COINCIDEN....."
    }
  }

  clearCartel(){
    let cartelError = document.querySelector("#errorMsg") as HTMLElement;
    cartelError.innerHTML = "";
  }

}
