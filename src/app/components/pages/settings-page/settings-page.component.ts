import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/security/authentication.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss'],
})
export class SettingsPageComponent implements OnInit {
  user: User = {};
  editingInfo: boolean = false;
  darkTheme?: boolean;
  constructor(
    public authenticationService: AuthenticationService,
    private router: Router,
    private profileService: ProfileService,
    private authService: AuthenticationService
  ) {}
  ngOnInit(): void {
    if (localStorage.getItem('tameTheme') === 'light') this.darkTheme = false;
    else this.darkTheme = true;

    let username = this.authService.getAuthenticatedUserUsername();
    this.profileService
      .getUserDetails(username!!.toString())
      .subscribe((response) => {
        this.user = response;
      });
  }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']).then();
    window.location.reload();
  }
  onChildVarChange(childVar: boolean) {
    this.editingInfo = childVar;
    console.log('refresh user info');
  }

  changeTheme() {
    if (this.darkTheme) localStorage.setItem('tameTheme', 'light');
    else localStorage.setItem('tameTheme', 'dark');
    window.location.reload();
  }
}
