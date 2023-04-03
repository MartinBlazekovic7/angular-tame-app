import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/security/authentication.service';
import { Jwt } from 'src/app/security/jwt.model';
import { Login } from 'src/app/security/login.model';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  authenticating = false;
  login = new Login('', '');
  authenticationError = false;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authenticationService.isUserAuthenticated()) {
      this.router.navigate(['/home']).then();
    }
  }

  buttonLoginClick() {
    this.authenticationError = false;
    this.authenticating = true;

    this.authenticationService.login(this.login).subscribe({
      next: (loginResponse: Jwt) => {
        this.authenticationService.saveJwtToLocalStorage(loginResponse.jwt);
        this.router.navigate(['/home']).then();
        window.location.reload();
      },
      error: () => {
        this.authenticationError = true;
        this.authenticating = false;
      },
    });
  }
}
