import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CommentInterface, CommentsDocInterface} from "../../interfaces/comment.interface";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {CoreService} from "../../services/core.service";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit, OnDestroy {

  @Input() postId: string;

  userSub;
  user;

  comments: CommentInterface[];
  commentsSub;

  commentForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private coreService: CoreService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.buildForm();
    this.getUser();
    this.getComments();
  }

  ngOnDestroy() {
    if (this.userSub) this.userSub.unsubscribe();
    if (this.commentsSub) this.commentsSub.unsubscribe();
  }

  getUser() {
    this.userSub = this.authService.user.subscribe(userDoc => {
      this.user = userDoc;
    })
  }

  getComments() {
    this.commentsSub = this.coreService.getComments(this.postId).subscribe(async (commentsDoc: CommentsDocInterface) => {
      if (commentsDoc === undefined) {
        await this.coreService.createCommentsDoc(this.postId);
      } else {
        this.comments = commentsDoc.comments;
      }
    })
  }

  buildForm() {
    this.commentForm = this.formBuilder.group({
      comment: ['', [Validators.required, Validators.maxLength(500), Validators.minLength(10)]]
    });
  }

  get comment() { return this.commentForm.get('comment'); }

  async sendComment() {
    if (!this.commentForm.valid) { return alert('Not valid!'); }
    const commentRecord: CommentInterface = {
      uid: this.user.uid,
      comment: this.comment.value,
      createdAt: Date.now(),
      displayName: this.user.displayName,
      photoURL: this.user.photoURL
    }
    await this.coreService.saveComment(this.postId, commentRecord)
    this.commentForm.reset();
  }

  async deleteComment(comment) {
    if (this.user.uid !== comment.uid) return alert('You are not the owner');

    await this.coreService.deleteComment(this.postId, comment)
    alert('success deleted');
  }

}
