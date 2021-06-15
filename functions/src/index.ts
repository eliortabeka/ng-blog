import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

export const userClaim = functions.auth.user().onCreate(async (user:any) => {
  if (user.email === "numeit@gmail.com") { await admin.auth().setCustomUserClaims(user.uid, {admin: true}); }
  return;
});
