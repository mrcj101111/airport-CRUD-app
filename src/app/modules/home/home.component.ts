import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService) { }

  logout() {
    this.authService.logout();
  }

  ngOnInit() {
  }

}
