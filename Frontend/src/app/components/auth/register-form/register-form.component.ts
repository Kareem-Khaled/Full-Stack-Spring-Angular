import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth/auth.service';
import { User } from '../../../shared/user';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, RouterLink],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, 
    private toastr: ToastrService,
    private auth: AuthService) {

      this.registerForm = this.fb.group({
        email:['', Validators.required],
        password:['', Validators.required],
        confirmPassword:['', Validators.required],
        firstName:['', Validators.required],
        lastName:['', Validators.required],
      });

    }

    onSubmit() {
      if (this.registerForm.valid) {
        const userData = this.registerForm.value;
        if(userData.password !== userData.confirmPassword){
          this.toastr.error('Passwords do not match', 'Error');
          return;
        }
        let user = new User(0, userData.email, userData.password, userData.firstName, userData.lastName);
        console.log(user);
        this.auth.register(user);
      }
    }
}
