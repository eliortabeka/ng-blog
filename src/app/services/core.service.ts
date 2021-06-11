import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {CommentInterface} from "../interfaces/comment.interface";
import firebase from 'firebase';
import firestore = firebase.firestore;
import {PostInterface} from "../interfaces/post.interface";

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private afs: AngularFirestore) { }

  removePostById(postId: string) {
    return this.afs.doc(`posts/${postId}`).delete();
  }

  getBlog():any {
    return this.afs.collection(`posts`).valueChanges({ idField: 'id' });
  }

  savePost(post: PostInterface) {
    return this.afs.collection('posts').add(post);
  }

  getPost(postId: string):any {
    return this.afs.doc(`posts/${postId}`).valueChanges({idField: 'id'});
  }

  getComments(postId: string) {
    return this.afs.doc(`comments/${postId}`).valueChanges();
  }

  createCommentsDoc(postId:string) {
    return this.afs.doc(`comments/${postId}`).set({comments: []});
  }

  saveComment(postId, comment: CommentInterface) {
    const PostDoc = this.afs.doc(`posts/${postId}`).update({
      [`score`]: firestore.FieldValue.increment(1)
    });
    const commentDoc = this.afs.doc(`comments/${postId}`).update({
      [`comments`]: firestore.FieldValue.arrayUnion(comment)
    });
    const commentRecord = this.afs.doc(`users/${comment.uid}`).update({
      [`postsRanked`]: firestore.FieldValue.arrayUnion(postId)
    })
    return Promise.all([PostDoc, commentDoc, commentRecord]);
  }

  deleteComment(postId, comment: CommentInterface) {
    return this.afs.doc(`comments/${postId}`).update({
      [`comments`]: firestore.FieldValue.arrayRemove(comment)
    })
  }

}
