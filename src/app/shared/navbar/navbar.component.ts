import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/security/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isAuthenticated = false;

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.isAuthenticated = this.authenticationService.isUserAuthenticated();
  }
}
