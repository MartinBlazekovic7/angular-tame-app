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
  currentUser?: string = '';
  currentUserDetails?: User = {};
  user: User = {};
  whoUserFollows: User[] = [];
  userFollowers: User[] = [];
  userPosts: Post[] = [];
  writingNewPost: boolean = false;
  newPost: Post = {};
  ownProfile?: boolean;
  doIFollowText: string = '';
  doIFollowBoolean: boolean = false;
  constructor(
    private profileService: ProfileService,
    private postService: PostService,
    private authService: AuthenticationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let urlUsername = this.route.snapshot.paramMap.get('username');
    this.currentUser = this.authService
      .getAuthenticatedUserUsername()
      ?.toString();
    let profile = this.currentUser;
    if (urlUsername == null || urlUsername === this.currentUser) {
      this.ownProfile = true;
    } else {
      this.ownProfile = false;
      profile = urlUsername;
      this.profileService
        .getUserDetails(this.currentUser!!.toString())
        .subscribe((response) => {
          this.currentUserDetails = response;
        });
    }
    this.profileService
      .getUserDetails(profile!!.toString())
      .subscribe((response) => {
        this.user = response;
      });
    this.profileService
      .getUserPosts(profile!!.toString())
      .subscribe((response) => {
        this.userPosts = response;
      });
    this.profileService
      .getFollowersOfUser(profile!!.toString())
      .subscribe((response) => {
        this.userFollowers = response;
        console.log('followers', this.userFollowers);
        if (!this.ownProfile) {
          const result = this.userFollowers.filter(
            (follower) => follower.username === this.currentUser
          );

          if (result.length > 0) {
            this.doIFollowBoolean = true;
            this.doIFollowText = 'UNFOLLOW';
          } else {
            this.doIFollowBoolean = false;
            this.doIFollowText = 'FOLLOW';
          }
        }
      });
    this.profileService
      .getWhoUserFollows(profile!!.toString())
      .subscribe((response) => {
        this.whoUserFollows = response;
        console.log('user follows', this.whoUserFollows);
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

  followUnfollowUser() {
    if (this.doIFollowBoolean) {
      this.profileService
        .unfollowUser(this.currentUser!, this.user.username!)
        .subscribe(() => {
          console.log('unfollowed');
          this.doIFollowBoolean = false;
          this.doIFollowText = 'FOLLOW';
          this.userFollowers = this.userFollowers.filter(
            (follower) =>
              follower.username !== this.currentUserDetails!.username
          );
        });
    } else {
      this.profileService
        .followUser(this.currentUser!, this.user.username!)
        .subscribe(() => {
          console.log('followed');
          this.doIFollowBoolean = true;
          this.doIFollowText = 'UNFOLLOW';
          this.userFollowers.push(this.currentUserDetails!);
        });
    }
  }
}
