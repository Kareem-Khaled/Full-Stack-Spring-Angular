import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../shared/user';
import { AuthService } from '../../../services/auth/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, RouterLink],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, 
    private toastr: ToastrService,
    private auth: AuthService) {

      this.loginForm = this.fb.group({
        email:['', Validators.required],
        password:['', Validators.required],
      });

    }

    onSubmit() {
      if (this.loginForm.valid) {
        const userData = this.loginForm.value;
        let user = new User(0, userData.email, userData.password);
        console.log(user);
        if(this.auth.login(user)){
          this.loginForm.reset();
          // this.loginForm.controls['email'].setValue('');
          // this.loginForm.controls['password'].setValue('');
        }
      }
    }
}
