import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {CommentInterface} from "../interfaces/comment.interface";
import firebase from 'firebase';
import firestore = firebase.firestore;

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private afs: AngularFirestore) { }

  getBlog():any {
    return this.afs.collection(`posts`).valueChanges();
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
    return this.afs.doc(`comments/${postId}`).update({
      [`comments`]: firestore.FieldValue.arrayUnion(comment)
    })
  }

  deleteComment(postId, comment: CommentInterface) {
    return this.afs.doc(`comments/${postId}`).update({
      [`comments`]: firestore.FieldValue.arrayRemove(comment)
    })
  }

}