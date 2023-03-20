import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSubscription: Subscription = new Subscription;

  constructor( private authService: AuthService ){}

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe( user => {
      this.isAuthenticated = !!user; //!user ? false : true;
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

}
