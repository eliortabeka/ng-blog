import {Component, OnDestroy, OnInit} from '@angular/core';
import {CoreService} from "../../services/core.service";
import {PostInterface} from "../../interfaces/post.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {CommentInterface, CommentsDocInterface} from "../../interfaces/comment.interface";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {UserInterface} from "../../interfaces/user.interface";

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit, OnDestroy {

  postId: string;

  post: PostInterface;
  postSub;

  userSub;
  user: UserInterface;

  userAlreadyVoted: boolean;

  constructor(private coreService: CoreService,
              private router: Router,
              private authService: AuthService,
              private activatedRoute: ActivatedRoute) {
      this.postId = this.activatedRoute.snapshot.paramMap.get('postID');
  }

  ngOnInit(): void {
    this.getPost();
    this.getUser();
  }

  getUser() {
    this.userSub = this.authService.user.subscribe((userDoc: UserInterface) => {
      this.user = userDoc;
      this.userAlreadyVoted = userDoc.voted.includes(this.postId);
    })
  }

  ngOnDestroy() {
    if (this.postSub) this.postSub.unsubscribe();
  }

  getPost() {
    this.postSub = this.coreService.getPost(this.postId).subscribe((postDoc: PostInterface) => {
      this.post = postDoc;
    })
  }

  removeThisPost() {
    this.coreService.removePostById(this.postId).then(async () => {
      alert('Deleted Successfully!');
      await this.router.navigateByUrl('/');
    })
  }

  toggleVote() {
    if (this.userAlreadyVoted) {
      this.coreService.voteDownPostScore(this.postId, this.user.uid).then(() => {
        alert('Down Voted successfully');
      })
    } else {
      this.coreService.voteUPPostScore(this.postId, this.user.uid).then(() => {
        alert('Voted successfully');
      })
    }
  }

  publishPost() {
    this.coreService.publishPost(this.postId).then(() => {
      alert('Post Published!');
    })
  }

}
