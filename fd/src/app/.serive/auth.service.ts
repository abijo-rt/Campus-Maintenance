import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';


export interface AuthResponse {
  token: string;
}


@Injectable({
  providedIn: 'root'
})


export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private router: Router) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<any>(storedUser ? JSON.parse(storedUser) : null);
    this.currentUser = this.currentUserSubject.asObservable();
}


  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {

    
    return this.http.post<AuthResponse>(`http://localhost:3000/login`, { email, password })
      .pipe(map(response => {
        console.log(response)
        // Store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(response.token));
        console.log(localStorage)
        this.currentUserSubject.next(response.token);
        return response;
      }));
  }

  logout() {
    // Remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  getUserRoleFromToken(token: string): string {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role;
  }
}
