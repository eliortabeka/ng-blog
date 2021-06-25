import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
const db = admin.firestore();

const transporter = require('./transport');

exports.alertEditorToReview = functions.firestore
  .document('posts/{postId}')
  .onCreate(async (snap, context) => {
      const postId = context.params.postId;
      const postData = snap.data();

      const editorUsers = await db.collection('users').where('role', '==', 'editor').get();

      const emailMessagePromises = editorUsers.docs.map((data) => {
          const user = data.data();
          const { displayName, email } = user;

          return transporter.sendMail({
            from: 'info@bhype.app',
            to: email,
            subject: `Hi ${displayName} a new post has just been posted for you to review!`,
            html: `
            <h1>${postData.title}</h1>
            <p>${postData.body}</p>
            <a href="https://int-ng-blog.web.app/posts/${postId}">Read the post</a>          `
          });
      });

      await Promise.all(emailMessagePromises).catch(e => {console.log(e)});

    return;
  });
