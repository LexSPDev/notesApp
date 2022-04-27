import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor( public authService: AuthService,
               private fb: FormBuilder) { }

  ngOnInit(): void {
  }
  registerForm = this.fb.group({
    User: ['', [Validators.required]],
    Password: ['', [Validators.required]],
    PasswordValid: ['', [Validators.required]],
  });

  onSubmit(){
    const usuario = this.registerForm.get('User')!.value;
    const pass = this.registerForm.get('Password')!.value
    const passValid = this.registerForm.get('PasswordValid')!.value
    if ( usuario === null){
      return
    }
    if ( pass === null){
      return
    }
    if (pass !==  passValid){
      return
    }
    this.authService.SignUp(usuario, pass)


  }
}
