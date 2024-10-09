const admin = require('./admin');

// Function to set admin claim for a user
async function setAdminClaim(uid) {
  try {
    // Assign custom claim 'admin: true' to the user
    await admin.auth().setCustomUserClaims(uid, { admin: true });
    console.log(`Admin claim successfully set for user with UID: ${uid}`);
  } catch (error) {
    console.error('Error setting admin claim:', error);
  }
}

// Replace 'your-user-uid' with the actual UID of the user you want to make an admin

const userUid = 'yfzJhv5ezyY5qRLYz7Yad2T8Ea02';
setAdminClaim(userUid);