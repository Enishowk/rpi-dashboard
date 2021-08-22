import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: boolean;
  // store the URL so we can redirect after logging in
  redirectUrl: string | null = null;

  constructor(
    private http: HttpClient,
    public router: Router,
    public cookieService: CookieService,
    private _snackBar: MatSnackBar
  ) {
    this.isLoggedIn = Boolean(this.cookieService.get('jwt'));
  }

  login({ login, password }: { login: string; password: string }) {
    return this.http.post('http://localhost:3000/login', { login, password });
  }

  logout(): void {
    this.isLoggedIn = false;
    this.cookieService.delete('jwt', '/');
    this.router.navigate(['/login']);
    this._snackBar.open('Log out', undefined, {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['success-snackbar'],
    });
  }
}
