import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../shared/user';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { loginResponse } from '../../shared/login-response';
import { loginRequest } from '../../shared/login-request';
import { jwtDecode } from 'jwt-decode';
import { MyToken } from '../../shared/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8080';
  private tokenKey = 'token';
  private user: User | null = null;

  constructor(private http: HttpClient,
              private router: Router,
              private toastr: ToastrService) { 
              
      if(this.isLoggedIn()) {
          this.setUserFromToken();
      }
  }

  register(user: User): void {
    this.http.post<User>(`${this.baseUrl}/auth/register`, user).subscribe((data: User) => {
        this.router.navigate(['/', 'login']);
        this.toastr.success("Hello in our community", 'Registration successful');
      }, (error) => {
        this.toastr.error(error.error.message, 'Registration failed');
      }
    );
  }

  login(user: loginRequest): boolean {
    this.http.post<loginResponse>(`${this.baseUrl}/auth/login`, user).subscribe(
      (data: loginResponse) => {
        this.setToken(data.token);
        this.setUserFromToken();
        console.log(this.user);
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

  setUserFromToken() {
    const token = this.getToken();
    const decodedToken: MyToken = jwtDecode(token);
    this.user = new User(decodedToken.id, decodedToken.sub, '', decodedToken.first_name, decodedToken.last_name, decodedToken.roles);
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string{
    return localStorage.getItem(this.tokenKey)!;
  }

  getRoles() {
    return this.user?.roles;
  }

  getUsername() {
    return this.user?.firstName + ' ' + this.user?.lastName;
  }

  isAdmin(){
    if(!this.user) return false;
    return this.user?.roles.includes('ROLE_ADMIN');
  }

  logout(): void {
    const language = localStorage.getItem('language');
    this.user = null;
    localStorage.clear();
    if(language){
      localStorage.setItem('language', language);
    }
    this.router.navigate(['/login']);
    this.toastr.success('See you soon!', 'Goodbye!');
  }
}
