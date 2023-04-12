import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/security/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isAuthenticated = false;
  isAdmin = false;
  darkTheme?: boolean;
  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {
    if (localStorage.getItem('tameTheme') === 'light') this.darkTheme = false;
    else this.darkTheme = true;
    this.isAuthenticated = this.authenticationService.isUserAuthenticated();
    this.isAdmin = this.authenticationService.isUserAdmin();
  }
}
