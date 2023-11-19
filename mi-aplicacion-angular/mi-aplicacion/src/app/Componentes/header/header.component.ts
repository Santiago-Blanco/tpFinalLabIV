import { Component } from '@angular/core';
import { LoginRegisterService } from 'src/app/Servicios/LoginRegister/login-register.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  get isActiveUser(): boolean {
    return this.activeUser();
  }
  isProfileOpen = false;

  constructor(private logService : LoginRegisterService){}

  ngOnInit(){
  }

  activeUser(){

    const user = this.logService.getActiveUser();

    if(user && Object.keys(user).length > 0){
      return true;
    } else {
      return false;
    }
  }

  openProfile() {
    this.isProfileOpen = true;
  }

  closeProfile() {
    this.isProfileOpen = false;
  }

  
}
