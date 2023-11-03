import { Component, EventEmitter, NgModule, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/types/User';
import { LoginRegisterService } from 'src/app/Servicios/LoginRegister/login-register.service';



@Component({
  selector: 'app-register-login',
  templateUrl: './register-login.component.html',
  styleUrls: ['./register-login.component.css']
})
export class RegisterLoginComponent {
  constructor(private route: ActivatedRoute, private LogRegService : LoginRegisterService) {  }

  loginVisible = false;
  registerVisible = false;
  menuVisible = true;
  
  users = new Array<User>;

  

  saveUsers(){
    this.LogRegService.saveUsers(this.users);
  }
  
  login(){
    this.loginVisible = true;
    this.menuVisible = false;
  }

  register(){
    this.registerVisible = true;
    this.menuVisible = false;
  }

  showMenu(){
    this.menuVisible = !this.menuVisible;
    this.loginVisible = false;
    this.registerVisible = false;
  }

}
