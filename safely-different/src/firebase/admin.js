const admin = require('firebase-admin');

// Initialize the app with a service account, granting admin privileges
const serviceAccount = require('./safely-different-firebase-adminsdk-bwyma-fbc4821386.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://safely-different-default-rtdb.asia-southeast1.firebasedatabase.app/'
});

module.exports = admin;