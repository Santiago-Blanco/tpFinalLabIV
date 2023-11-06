import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/types/User';
import { LoginRegisterService } from 'src/app/Servicios/LoginRegister/login-register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  //https://codingpotions.com/angular-formularios/

  constructor(private service : LoginRegisterService) {}

  registerForm = new FormGroup({
    userName : new FormControl('', Validators.required),
    email : new FormControl('', Validators.required),
    dni : new FormControl('', [Validators.required, Validators.minLength(8)]),
    password : new FormControl('', [
      Validators.required, 
      Validators.minLength(10), 
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/) // incluyendo letras mayúsculas, letras minúsculas, al menos un número y al menos un carácter especial
    ])
  })


  sendForm(){
    
    let user = new User();
    user.userId = this.service.getNextId();
    user.userName = this.registerForm.get("userName")?.value!;
    user.email = this.registerForm.get("email")?.value!;
    user.dni = this.registerForm.get("dni")?.value!;
    user.password = this.registerForm.get("password")?.value!;

    this.service.addUser(user);
    this.registerForm.reset();
  }
  

}
