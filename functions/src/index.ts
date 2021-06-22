import * as admin from 'firebase-admin';
const serviceAccount = require('../lib/int-ng-blog-firebase-adminsdk-odutv-73c60cb0f1.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

module.exports = {
  ...require('./claims')
}
