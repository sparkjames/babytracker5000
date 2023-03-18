import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  authMode = 'login';

  onSwitchMode(){
    if( this.authMode === 'login' ){
      this.authMode = 'register';
    } else {
      this.authMode = 'login';
    }
  }

  onSubmit( form: NgForm ){
    console.log(form.value);
    form.reset();
  }

}
