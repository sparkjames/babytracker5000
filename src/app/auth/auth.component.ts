import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  // NOTE - query params video #269
  isLoginMode = true;
  isLoading = false;
  errorMessage = '';

  @ViewChild('authForm') authForm: NgForm | undefined;

  constructor( private authService: AuthService, private router: Router ){}

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onDetectInput( event: any ){
    // console.log('Inside onDetectInput');
    // console.log(event);
    try {
      if (this.authForm) {
        // console.log('authForm = ', this.authForm);

        // Let autofill (like from LastPass) trigger the fields to be revalidated, thus enabling the submit button to login.
        if (event.target.name === 'email' || event.target.name === 'password') {
          const fieldName = event.target.name;
          this.authForm.form.controls[fieldName].updateValueAndValidity();
        }

      }
    } catch (error) {
      console.error('Error detecting field input: ', error);
    }


  }

  onSubmit( form: NgForm ){
    // console.log(form.value);
    if( !form.valid ){
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);

    } else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(responseData => {
      // console.log(responseData);
      this.isLoading = false;
      this.router.navigate(['/notes']);

    }, errorResponse => {
      // console.log('Auth error: ', errorResponse);
      this.errorMessage = errorResponse;
      this.isLoading = false;
    });

    form.reset();
  }

}
