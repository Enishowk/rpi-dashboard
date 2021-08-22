import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  status: string;
  hide = true;
  loginForm = new FormGroup({
    login: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    public authService: AuthService,
    public router: Router,
    private cookieService: CookieService
  ) {
    this.status = this.getStatus();

    if (this.authService.isLoggedIn) {
      this.router.navigate(['/dashboard']);
    }
  }

  getStatus() {
    return 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }

  logout() {
    this.authService.logout();
    this.status = this.getStatus();
  }

  onSubmit() {
    this.status = 'Trying to log in ...';
    try {
      this.authService.login(this.loginForm.value).subscribe(
        (resp: any) => {
          this.cookieService.set('jwt', resp.token);
          this.authService.isLoggedIn = true;
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          this.authService.isLoggedIn = false;
          console.error(error);
        }
      );
    } catch (error) {
      console.error(error);
    } finally {
      this.status = this.getStatus();
    }
  }
}
