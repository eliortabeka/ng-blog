import * as admin from "firebase-admin";
import * as functions from "firebase-functions";



// Auth
export const userCreated = functions.auth.user().onCreate(async (user:any) => {
  if (user.email === "numeit@gmail.com") {
    await admin.auth().setCustomUserClaims(user.uid, { admin: true });
  }
  if (user.email === "agaigal@gmail.com") {
    await admin.auth().setCustomUserClaims(user.uid, { editor: true });
  }
  if (user.email === "elna.nitz@gmail.com") {
    await admin.auth().setCustomUserClaims(user.uid, { author: true });
  }
  if (user.email === "MATAHEL148@GMAIL.COM") {
    await admin.auth().setCustomUserClaims(user.uid, { moderator: true });
  }
  return;
});










// // Https
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
//
// // onCall
// export const funAuth = functions.https.onCall(async (data, context) => {
//
//   let {  } = data;
//
//   if (!context.auth?.token.admin) { throw new functions.https.HttpsError('unauthenticated', 'Unauthenticated'); }
//
//   return { };
// });
//
// export const userDeleted = functions.auth.user().onDelete(async (user:any) => {
//   if (user.email === "numeit@gmail.com") {
//     await admin.auth().setCustomUserClaims(user.uid, { admin: true });
//   }
//   return;
// });
//
//
// // onCreate
// exports.userCreated = functions.firestore
//   .document('users/{userId}')
//   .onCreate(async (snap, context) => {
//
//     const userId: string = context.params.userId;
//     const dataDoc: FirebaseFirestore.DocumentData = snap.data();
//
//     // ...
//
//     return;
//   });
//
// // onUpdate
// exports.userUpdated = functions.firestore
//   .document('users/{userId}')
//   .onUpdate(async (change, context) => {
//     const userBefore = change.after.data();
//     const userAfter = change.before.data();
//
//     // is the same
//     // Avoid idempotent
//     if (userAfter.isEqual(userBefore)) {
//       return;
//     }
//
//     return {success: true};
//   });
//
// // onDelete
// exports.Deleted = functions.firestore
//   .document('users/{userId}')
//   .onDelete(async (snap, context) => {
//     const removedDataDoc: FirebaseFirestore.DocumentData = snap.data();
//     const userId: string = context.params.userId;
//
//     // Comments
//     // await db.doc(`comments/${token.contractAddress}`).delete();
//
//     return;
//   });
//
// // Pub Sub
// export const autoFun = functions.pubsub.schedule('01 14 * 1-5 1-5').onRun(async context => {
//
//   return {success: true}
// });
