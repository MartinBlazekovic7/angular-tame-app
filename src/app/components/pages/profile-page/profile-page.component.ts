import { User } from 'src/app/models/user.model';
import { ProfileService } from './../../../services/profile.service';
import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';
import { AuthenticationService } from 'src/app/security/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from 'src/app/services/comment.service';
import { Comment } from 'src/app/models/comment.model';

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
  showUsersList: boolean = false;
  newPost: Post = {};
  ownProfile?: boolean;
  doIFollowText: string = '';
  doIFollowBoolean: boolean = false;
  whichUsersToShow: User[] = [];
  showingPost: boolean = false;
  chosenPost?: Post = {};
  chosenPostComments?: Comment[] = [];
  newCommentText?: string = '';
  allComments: Comment[] = [];
  constructor(
    private profileService: ProfileService,
    private postService: PostService,
    private commentService: CommentService,
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
        this.userPosts.forEach((up) => {
          this.postService.getPostLikes(up.id!).subscribe((response) => {
            up.likes = response.length;
          });
          this.commentService.getPostComments(up.id!).subscribe((response) => {
            up.comments = response.length;
          });
        });
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

    this.commentService.getAllComments().subscribe((response) => {
      this.allComments = response;
    });
  }

  getPostComments() {}

  likePost(id: number | undefined) {
    this.postService
      .likePost(id, this.user.username!!)
      .subscribe(() => console.log('liked'));
    // dodati +1 na likes, dodati da se oboja lajk
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

  onChildVarChangeUsersPosts(childVar: boolean) {
    this.showUsersList = childVar;
    this.whichUsersToShow = [];
    console.log('heloooo');
  }

  showLikesUsersList(id: number) {
    this.postService.getPostLikes(id).subscribe((response) => {
      this.whichUsersToShow = response;
    });
    this.showUsersList = true;
  }
  showFollowersUsersList() {
    this.whichUsersToShow = this.userFollowers;
    this.showUsersList = true;
  }
  showFollowingUsersList() {
    this.whichUsersToShow = this.whoUserFollows;
    this.showUsersList = true;
  }

  showPostDetails(id: number) {
    this.chosenPost = this.userPosts.filter((post) => post.id === id)[0];
    this.commentService.getPostComments(id).subscribe((response) => {
      this.chosenPostComments = response;
      this.showingPost = true;
    });
  }

  onSubmitNewComment() {
    let newComment: Comment = {
      id: this.allComments.length + 1,
      text: this.newCommentText,
      makerUsername: this.currentUser,
      postId: this.chosenPost?.id,
      creationDate: new Date().toISOString().slice(0, 10),
    };
    this.commentService.addNewComment(newComment).subscribe(() => {
      this.chosenPostComments?.push(newComment);
      this.newCommentText = '';
      console.log('added new comment');
    });
  }
}
