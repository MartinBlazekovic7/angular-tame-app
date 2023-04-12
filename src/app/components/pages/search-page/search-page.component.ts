import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1.5s ease-out', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class SearchPageComponent implements OnInit {
  allUsers: User[] = [];
  filteredUsers: User[] = [];
  searchTerm: string = '';
  darkTheme?: boolean;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    if (localStorage.getItem('tameTheme') === 'light') this.darkTheme = false;
    else this.darkTheme = true;

    this.userService.getAllUsers().subscribe((response) => {
      this.allUsers = response;
      this.allUsers = this.allUsers.filter((u) => u.username !== 'admin');
    });
  }

  onSubmit() {
    this.searchTerm = this.searchTerm.toLowerCase();
    this.filteredUsers = this.allUsers.filter(
      (user) =>
        user.username?.toLowerCase().includes(this.searchTerm) ||
        user.firstname?.toLowerCase().includes(this.searchTerm) ||
        user.lastname?.toLowerCase().includes(this.searchTerm)
    );
    if (!this.filteredUsers.length) alert('No users under that name!');
  }
}
