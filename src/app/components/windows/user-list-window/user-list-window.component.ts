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

  ngOnInit(): void {}

  closeWindow() {
    this.childVarChangeUsersList.emit(this.childVar);
  }
}
