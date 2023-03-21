import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: {
    class: 'app-root-container'
  }
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService){}

  ngOnInit(): void {
    this.authService.autoLogin();
  }

}
