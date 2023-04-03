import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/security/authentication.service';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss'],
})
export class SettingsPageComponent {
  constructor(
    public authenticationService: AuthenticationService,
    private router: Router
  ) {}
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']).then();
    window.location.reload();
  }
}
