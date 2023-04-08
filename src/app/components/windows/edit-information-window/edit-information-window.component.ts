import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-edit-information-window',
  templateUrl: './edit-information-window.component.html',
  styleUrls: ['./edit-information-window.component.scss'],
})
export class EditInformationWindowComponent implements OnInit {
  @Input() user?: User;
  @Output() childVarChange = new EventEmitter();
  childVar?: boolean;
  ngOnInit(): void {}
  onSubmit() {
    console.log(this.user);
    this.closeWindow();
  }
  closeWindow() {
    this.childVarChange.emit(this.childVar);
  }
}
