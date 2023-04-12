import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-information-window',
  templateUrl: './edit-information-window.component.html',
  styleUrls: ['./edit-information-window.component.scss'],
})
export class EditInformationWindowComponent implements OnInit {
  @Input() user?: User;
  @Output() childVarChange = new EventEmitter();
  childVar?: boolean;
  darkTheme?: boolean;
  constructor(private userService: UserService) {}
  ngOnInit(): void {
    if (localStorage.getItem('tameTheme') === 'light') this.darkTheme = false;
    else this.darkTheme = true;
  }
  onSubmit() {
    this.userService.editUserInformation(this.user!).subscribe(() => {
      this.closeWindow();
    });
  }
  closeWindow() {
    this.childVarChange.emit(this.childVar);
  }
}
