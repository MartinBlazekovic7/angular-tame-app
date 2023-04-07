import { User } from 'src/app/models/user.model';
import { ProfileService } from './../../../services/profile.service';
import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';
import { AuthenticationService } from 'src/app/security/authentication.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  user: User = {};
  userPosts: Post[] = [];
  writingNewPost: boolean = false;
  newPost: Post = {};
  ownProfile?: boolean;
  doIFollowText: string = '';
  constructor(
    private profileService: ProfileService,
    private postService: PostService,
    private authService: AuthenticationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let urlUsername = this.route.snapshot.paramMap.get('username');
    let username = this.authService.getAuthenticatedUserUsername();

    if (urlUsername == null || urlUsername === username) this.ownProfile = true;
    else {
      this.ownProfile = false;
      username = urlUsername;
      // get am i following
      // set {{doIFollowText}}
    }
    this.profileService
      .getUserDetails(username!!.toString())
      .subscribe((response) => {
        this.user = response;
      });
    this.profileService
      .getUserPosts(username!!.toString())
      .subscribe((response) => {
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

  newPostButton() {
    this.newPost = {
      id: this.userPosts.length,
      makerUsername: this.user.username,
      text: '',
      creationDate: '',
    };
    this.writingNewPost = true;
  }

  onChildVarChange(childVar: boolean) {
    this.writingNewPost = childVar;
    console.log('refresh posts');
  }

  followUnfollowUser() {}
}
