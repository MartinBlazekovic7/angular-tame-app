import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/security/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
  user: User = {};
  darkTheme?: boolean;
  showingAvatarWindow?: boolean = false;
  profileAvatar?: string =
    'http://localhost:4200/assets/images/avatars/avatarNone.png';
  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('tameTheme') === 'light') this.darkTheme = false;
    else this.darkTheme = true;
    if (this.authenticationService.isUserAuthenticated()) {
      this.router.navigate(['/home']).then();
    }
  }

  onSubmit() {
    if (!(this.user.firstPassword === this.user.confirmPassword)) {
      alert('Passwords do not match');
      return;
    } else {
      let newUser: User = {
        email: this.user.email,
        username: this.user.username,
        firstname: this.user.firstname,
        lastname: this.user.lastname,
        password: this.user.firstPassword,
        dateOfBirth: this.user.dateOfBirth,
        profilePicture: this.profileAvatar,
      };
      this.userService.registerUser(newUser).subscribe(() => {
        alert('Successfully registered!');
        this.router.navigate(['login']);
      });
    }
  }

  getProfilePic(event: any) {
    this.profileAvatar = event.target.src;
    this.showingAvatarWindow = false;
  }
}
