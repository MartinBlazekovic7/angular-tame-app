import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-list-window',
  templateUrl: './user-list-window.component.html',
  styleUrls: ['./user-list-window.component.scss'],
})
export class UserListWindowComponent implements OnInit {
  @Input() users?: User[] = [];
  @Input() ownProfile?: boolean;
  @Output() childVarChangeUsersList = new EventEmitter();
  childVar?: boolean;
  darkTheme?: boolean;

  ngOnInit(): void {
    if (localStorage.getItem('tameTheme') === 'light') this.darkTheme = false;
    else this.darkTheme = true;
  }

  closeWindow() {
    this.childVarChangeUsersList.emit(this.childVar);
  }
}
