import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../shared/user';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8080';
  private authTokenKey = 'authToken';

  constructor(private http: HttpClient,
              private router: Router,
              private toastr: ToastrService) { }

  register(user: User): void {
    this.http.post<User>(`${this.baseUrl}/auth/register`, user).subscribe((data: User) => {
        this.router.navigate(['/', 'login']);
        this.toastr.success("Hello in our community", 'Registration successful');
      }
    );
  }

  login(user: User): boolean {
    this.http.post<User>(`${this.baseUrl}/auth/login`, user).subscribe(
      (data: User) => {
        this.setAuthToken(data.token!);
        this.router.navigate(['/']);
        this.toastr.success(data.message, 'Login successful');
        return true;
      },
      (error) => {
          this.toastr.error(error.error.message, 'Login failed');
      }
    );
    return false;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.authTokenKey);
  }

  setAuthToken(token: string): void {
    localStorage.setItem(this.authTokenKey, token);
  }

  getToken() {
    return localStorage.getItem(this.authTokenKey);
  }

  logout(): void {
    localStorage.removeItem(this.authTokenKey);
    this.router.navigate(['/login']);
    this.toastr.success('See you soon!', 'Goodbye!');
  }
}
