import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  //https://codingpotions.com/angular-formularios/

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

  

}
