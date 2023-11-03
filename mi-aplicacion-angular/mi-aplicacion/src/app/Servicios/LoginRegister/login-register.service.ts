import { Injectable } from '@angular/core';
import { User } from 'src/app/types/User';

@Injectable({
  providedIn: 'root'
})
export class LoginRegisterService {

  constructor() { }
  
  

  saveUsers(users : Array<User>){
    localStorage.setItem("usuario", JSON.stringify(users));
  }

}
