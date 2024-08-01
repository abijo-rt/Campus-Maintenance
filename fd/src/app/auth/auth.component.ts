import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from '../.serive/auth.service'
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FloatLabelModule,ButtonModule,ReactiveFormsModule,CommonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  loginForm: FormGroup;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // Stop if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.auth.login(this.f['email'].value, this.f['password'].value)
      .subscribe({
        next: () => {
          const token = JSON.parse(localStorage.getItem('currentUser')!);
          const userRole = this.auth.getUserRoleFromToken(token);
          if (userRole === 'admin') {
            this.router.navigate(['/admin/dashboard']);
          } else if (userRole === 'incharge') {
            this.router.navigate(['/incharge/dashboard']);
          } else {
            this.router.navigate(['/user']);
          }// Navigate to the desired route after login
        },
        error: (err: string) => {
          console.log(err)
          this.error = err;
        }
      });
  }
}
  

