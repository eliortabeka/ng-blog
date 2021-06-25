import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
const db = admin.firestore();

const transporter = require('./transport');

exports.alertAuthor = functions.firestore
  .document('posts/{postId}')
  .onUpdate(async (change, context) => {
    const postId = context.params.postId;

    const postDataBefore = change.before.data();
    const postData = change.after.data();

    if (!postDataBefore.published && postData.published) {
      const author = (await db.doc(`users/${postData.userId}`).get()).data();
      const { email, displayName } = author || { email: '', displayName: '' };

      await transporter.sendMail({
        from: 'info@bhype.app',
        to: email,
        subject: `Hi ${displayName} your post has just been published!`,
        html: `
          <h1>${postData.title}</h1>
          <p>${postData.body}</p>
          <a href="https://int-ng-blog.web.app/posts/${postId}">Read the post</a>
        `
      });
    }

    return;
  });
