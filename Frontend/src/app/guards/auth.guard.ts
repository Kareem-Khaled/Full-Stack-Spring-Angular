// auth.guard.ts
import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, 
              private router: Router,
              private toastr: ToastrService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (state.url == '/login' || state.url == '/register') {
      if(this.authService.isLoggedIn()){
        this.router.navigate(['/']);
        this.toastr.info('Logout first to access this page!', 'Already Logged In');
        return false;
      }
      return true;
    }
    
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.toastr.error('You must be logged in to access this page', 'Unauthorized');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
