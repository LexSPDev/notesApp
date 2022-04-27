import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  constructor(  public authService: AuthService,
                private fb: FormBuilder) { }

  ngOnInit(): void {
  }
  
  loginForm = this.fb.group({
    User: ['', [Validators.required]],
    Password: ['', [Validators.required],
  ],
  });

  onSubmit(){
    const usuario = this.loginForm.get('User')!.value;
    const pass = this.loginForm.get('Password')!.value
    if ( usuario === null){
      return
    }
    if ( pass === null){
      return
    }
    this.authService.SignIn(usuario, pass)
  }
}
