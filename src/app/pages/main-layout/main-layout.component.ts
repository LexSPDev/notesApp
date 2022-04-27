import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  constructor(public authService: AuthService) { }
  user = JSON.parse(localStorage.getItem('user')!).uid
  ngOnInit(): void {
    
  }

  logout(){
    this.authService.SignOut();
  }

}
