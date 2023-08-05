import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoading: boolean = false;
  apiError: string = '';

  constructor(private _AuthService: AuthService, private _Router: Router) { }
  loginForm: FormGroup = new FormGroup({

    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)]),
  })

  loginData(loginForm: FormGroup) {
    this.isLoading = true;
    if (loginForm.valid) {
      this._AuthService.login(loginForm.value).subscribe({
        next: (response) => {
          if (response.message == "success") {
            localStorage.setItem('userToken',response.token)
           this._AuthService.decodeUserData()
            this._Router.navigate(['/home'])
            this.isLoading = false;
          }
        },
        error: (err) => {
          this.apiError = err.error.message;
          this.isLoading = false;
        },
      })
    }
    //
  }


}
