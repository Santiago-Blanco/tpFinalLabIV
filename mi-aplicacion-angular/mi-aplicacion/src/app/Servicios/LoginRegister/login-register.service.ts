import { Injectable } from '@angular/core';
import { User } from 'src/app/types/User';

@Injectable({
  providedIn: 'root'
})
export class LoginRegisterService {

  constructor() { }
  
  
  private registeredUsers: User[] = []

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


  getUser (username : string | undefined | null): User | null{
    this.registeredUsers = this.returnUsersFromLocalStorage();

    const userFound = this.registeredUsers.find(user=>user.userName === username);

    if(userFound){
      return userFound
    } else {
      return null;
    }
  }

  addUser(user : User){
    this.registeredUsers = this.returnUsersFromLocalStorage();
    //retorna false si existen usuarios con mismo mail, dni o username iguales, retorna true si no hay users con coincidencias
    

    if(this.validateRegister(user)){
      console.log("no se ha podido hacer el registro.... usuarios con mail, dni o username repetidos")
      return false;
    } else {
      this.registeredUsers.push(user);
      this.saveUsers(this.registeredUsers);
      console.log("usuario registrado correctamente")
      console.log(this.returnUsersFromLocalStorage());
      return true;
    }
    
  }

  validateRegister(user : User){
    this.registeredUsers = this.returnUsersFromLocalStorage();
    //retorna true si existen usuarios con mismo mail, dni o username iguales, retorna false si no hay users con coincidencias
    return this.registeredUsers.some(userRegistrado=>userRegistrado.email == user.email || userRegistrado.dni == user.dni || userRegistrado.userName == user.userName)
  }

  getNextId(): number{
    if(this.registeredUsers.length > 0){
      return this.registeredUsers.length;
    } else {
      return 0;
    }
  }

  validateUser(userName : string | undefined | null, password : string | undefined | null){
    this.registeredUsers = this.returnUsersFromLocalStorage();

    return this.registeredUsers.find(user=> user.userName == userName && user.password == password); 
  }
}
