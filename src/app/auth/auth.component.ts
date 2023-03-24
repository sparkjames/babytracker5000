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
  isTouched = false;

  @ViewChild('authForm') authForm: NgForm | undefined;

  constructor( private authService: AuthService, private router: Router ){}

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onDetectInput( event: Event ){
    console.log('Inside onDetectInput');
    console.log(event);
    if(this.authForm){
      console.log('authForm = ', this.authForm);
    }
    this.isTouched = true;
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
