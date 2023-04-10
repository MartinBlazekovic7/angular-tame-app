import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { PostService } from 'src/app/services/post.service';
import { ProfileService } from 'src/app/services/profile.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent implements OnInit {
  allUsers: User[] = [];
  editingUser: User = {};
  editingInfo: boolean = false;
  searchTerm: string = '';
  userPosts: Post[] = [];
  showingUserPosts: boolean = false;

  constructor(
    private userService: UserService,
    private postService: PostService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((response) => {
      this.allUsers = response;
      this.allUsers = this.allUsers.filter((u) => u.username !== 'admin');
    });
  }

  editUser(user: User) {
    this.editingUser = user;
    this.editingInfo = true;
  }
  deleteUser(user: User) {
    this.userService.deleteUser(user.username!).subscribe(() => {
      this.allUsers = this.allUsers.filter((u) => user.username !== u.username);
    });
  }
  deletePost(post: Post) {
    this.postService.deletePost(post.id!).subscribe(() => {
      this.userPosts = this.userPosts.filter((p) => post.id !== p.id);
    });
  }
  onChildVarChange(childVar: boolean) {
    this.editingInfo = childVar;
    console.log('refresh user info');
  }
  showUserPosts(user: User) {
    this.profileService
      .getUserPosts(user.username!!.toString())
      .subscribe((response) => {
        this.userPosts = response;
        this.showingUserPosts = true;
      });
  }
}
