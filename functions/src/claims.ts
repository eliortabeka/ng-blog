import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTranporter({
  service: 'gmail',
  auth: {
    user: 'bhypebsc@gmail.com',
    pass: 'owlbiilfeiggnxym'
  }
})

// Auth
export const userCreated = functions.auth.user().onCreate(async (user:any) => {

  if (user.email === 'numeit@gmail.com') {
    await admin.auth().setCustomUserClaims(user.uid, { admin: true });
  }
  if (user.email === 'agaigal@gmail.com') {
    await admin.auth().setCustomUserClaims(user.uid, { editor: true });
  }
  if (user.email === 'elna.nitz@gmail.com') {
    await admin.auth().setCustomUserClaims(user.uid, { author: true });
  }
  if (user.email === 'MATAHEL148@GMAIL.COM') {
    await admin.auth().setCustomUserClaims(user.uid, { moderator: true });
  }

  await transporter.sendEmail({
    from: 'info@bhype.app',
    to: user.email,
    subject: `Hi ${user.displayName} and Welcome to my Blog!`,
    html: `
      <h1>Hello ${user.displayName}</h1>
      <p>Welcome to my Blog where you can discover about the world.</p>
      <p>Best, <br/>
        Elior
        <a href='http://bhype.app'>Read the blog</a>
      </p>
    `
  })

  return;
});
