import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      const userRole = this.getUserRoleFromToken(currentUser);
      if (route.data['roles'] && route.data['roles'].indexOf(userRole) === -1) {
        // Role not authorized so redirect to home page
        this.router.navigate(['/']);
        return false;
      }
      return true;
    }

    // Not logged in so redirect to login page
    this.router.navigate(['/login']);
    return false;
  }

  private getUserRoleFromToken(token: string): string {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role;
  }
}
