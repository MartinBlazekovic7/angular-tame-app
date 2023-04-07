import { User } from 'src/app/models/user.model';
import { ProfileService } from './../../../services/profile.service';
import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  user: User = {};
  userPosts: Post[] = [];

  constructor(
    private profileService: ProfileService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.profileService.getUserDetails().subscribe((response) => {
      this.user = response;
    });
    this.profileService.getUserPosts().subscribe((response) => {
      this.userPosts = response;
    });
  }

  getPostLikes() {}

  getPostComments() {}

  likePost(id: number | undefined) {
    this.postService
      .likePost(id, this.user.username!!)
      .subscribe(() => console.log('liked'));
  }
}
