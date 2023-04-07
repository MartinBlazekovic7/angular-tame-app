import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-post-window',
  templateUrl: './post-window.component.html',
  styleUrls: ['./post-window.component.scss'],
})
export class PostWindowComponent implements OnInit {
  @Input() post: Post = {};
  @Output() childVarChange = new EventEmitter();
  childVar?: boolean;

  text: string = '';

  ngOnInit() {}

  onSubmit() {
    this.post.text = this.text;
    this.post.creationDate = new Date().toISOString().slice(0, 10);
    this.closeWindow();
    console.log(this.post);
  }

  closeWindow() {
    this.childVarChange.emit(this.childVar);
  }
}
