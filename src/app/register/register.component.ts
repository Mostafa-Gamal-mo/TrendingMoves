import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  isLoading: boolean = false;
  apiError: string = '';

  constructor(private _AuthService: AuthService, private _Router: Router) { }
  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)]),
    rePassword: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),

  })

  registerData(registerForm: FormGroup) {
    this.isLoading = true;
    if (registerForm.valid) {
      this._AuthService.register(registerForm.value).subscribe({
        next: (response) => {
          if (response.message == "success") {
            this._Router.navigate(['/login'])
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
