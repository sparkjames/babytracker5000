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
  isOfflineMode = false;
  private userSubscription: Subscription = new Subscription;

  constructor( private authService: AuthService ){}

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe( user => {
      // console.log('user in header is: ', user);
      this.isAuthenticated = !!user; //!user ? false : true;
      this.isOfflineMode = user?.id === 'offline' ? true : false;
    });
  }

  onLogout(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

}
