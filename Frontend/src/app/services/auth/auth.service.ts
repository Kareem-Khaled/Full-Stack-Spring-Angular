import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../shared/user';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { loginResponse } from '../../shared/login-response';
import { loginRequest } from '../../shared/login-request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8080';
  private userKey = 'user';

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

  login(user: loginRequest): boolean {
    this.http.post<loginResponse>(`${this.baseUrl}/auth/login`, user).subscribe(
      (data: loginResponse) => {
        this.setUser(data);
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
    return !!localStorage.getItem(this.userKey);
  }

  setUser(data: loginResponse) {
    localStorage.setItem(this.userKey, JSON.stringify(data));
  }

  getToken() {
    const userData = JSON.parse(localStorage.getItem(this.userKey)!);
    return userData.token;
  }

  getRoles() {
    const userData = JSON.parse(localStorage.getItem(this.userKey)!);
    return userData.roles;
  }

  getUsername() {
    if(!this.isLoggedIn()) return '';
    const userData = JSON.parse(localStorage.getItem(this.userKey)!);
    return userData.username;
  }

  isAdmin(){
    return this.getRoles().includes('ROLE_ADMIN');
  }

  logout(): void {
    const language = localStorage.getItem('language');
    localStorage.clear();
    if(language){
      localStorage.setItem('language', language);
    }
    this.router.navigate(['/login']);
    this.toastr.success('See you soon!', 'Goodbye!');
  }
}
