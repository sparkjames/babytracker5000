import { Component } from '@angular/core';
import { AbstractControl, NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  // NOTE - query params video #269
  authMode = 'login';
  isLoading = false;
  errorMessage = '';

  constructor( private authService: AuthService ){

  }

  onSwitchMode(){
    if( this.authMode === 'login' ){
      this.authMode = 'register';
    } else {
      this.authMode = 'login';
    }
  }

  onSubmit( form: NgForm ){
    // console.log(form.value);
    if( !form.valid ){
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;

    if (this.authMode === 'register' ){

      this.authService.signup(email, password).subscribe(responseData => {
        console.log(responseData);
        this.isLoading = false;
      }, errorResponse => {
        console.log('Error registering new account: ', errorResponse);
        this.errorMessage = errorResponse;
        this.isLoading = false;
      });

    } else if (this.authMode === 'login') {
      // do login
    }

    form.reset();
  }

}
