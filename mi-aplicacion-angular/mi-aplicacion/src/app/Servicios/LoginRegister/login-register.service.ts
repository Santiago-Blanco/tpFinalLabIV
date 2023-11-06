import { Injectable } from '@angular/core';
import { User } from 'src/app/types/User';

@Injectable({
  providedIn: 'root'
})
export class LoginRegisterService {

  constructor() { }
  
  
  private registeredUsers = new Array<User>;

  saveUsers(users : Array<User>){
    localStorage.setItem("usuarios", JSON.stringify(users));
  }

  returnUsersFromLocalStorage(): Array<User>{
    const userData = localStorage.getItem("usuarios");

    if(userData) {
      return JSON.parse(userData) as User[];
    } else {
      return [];
    }
  }


  addUser(user : User){
    this.registeredUsers = this.returnUsersFromLocalStorage();
    this.registeredUsers.push(user);
    this.saveUsers(this.registeredUsers);



    console.log(this.returnUsersFromLocalStorage());
  }

  getNextId(): number{
    if(this.registeredUsers.length > 0){
      return this.registeredUsers.length;
    } else {
      return 0;
    }
  }

  validateUser(userName : string, password : string){
    this.registeredUsers = this.returnUsersFromLocalStorage();

    return this.registeredUsers.find(user=> user.userName == userName && user.password == password); 
  }
}
