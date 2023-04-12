import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, catchError, of, tap } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { Comment } from 'src/app/models/comment.model';
import { AuthenticationService } from 'src/app/security/authentication.service';
import { CommentService } from 'src/app/services/comment.service';
import { HomeService } from 'src/app/services/home.service';
import { PostService } from 'src/app/services/post.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  currentUser?: string = '';
  currentUserDetails?: User = {};
  userFollowsPosts: Post[] = [];
  whichUsersToShow: User[] = [];
  showingPost: boolean = false;
  chosenPost?: Post = {};
  chosenPostComments?: Comment[] = [];
  newCommentText?: string = '';
  allComments: Comment[] = [];
  showUsersList: boolean = false;
  darkTheme?: boolean;

  constructor(
    private profileService: ProfileService,
    private homeService: HomeService,
    private postService: PostService,
    private commentService: CommentService,
    private authService: AuthenticationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('tameTheme') === 'light') this.darkTheme = false;
    else this.darkTheme = true;

    this.currentUser = this.authService
      .getAuthenticatedUserUsername()
      ?.toString();
    this.profileService
      .getUserDetails(this.currentUser!!.toString())
      .subscribe((response) => {
        this.currentUserDetails = response;
      });
    this.homeService
      .getUserFollowsPosts(this.currentUser!)
      .subscribe((response) => {
        this.userFollowsPosts = response;
        this.userFollowsPosts.forEach((up) => {
          this.postService.getPostLikes(up.id!).subscribe((response) => {
            up.likes = response.length;
            let didILikeArray = response.filter(
              (u) => u.username === this.currentUserDetails?.username
            );
            if (didILikeArray.length) up.didILike = true;
          });
          this.commentService.getPostComments(up.id!).subscribe((response) => {
            up.comments = response.length;
          });
        });
      });
    this.commentService.getAllComments().subscribe((response) => {
      this.allComments = response;
    });
  }

  likePost(id: number | undefined, username: string) {
    this.postService
      .likePost(id, username)
      .subscribe(() => console.log('liked'));
    // dodati +1 na likes, dodati da se oboja lajk
  }

  onChildVarChangeUsersPosts(childVar: boolean) {
    this.showUsersList = childVar;
    this.whichUsersToShow = [];
  }

  showLikesUsersList(id: number) {
    this.postService.getPostLikes(id).subscribe((response) => {
      this.whichUsersToShow = response;
    });
    this.showUsersList = true;
  }

  showPostDetails(id: number) {
    this.chosenPost = this.userFollowsPosts.filter((post) => post.id === id)[0];
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
