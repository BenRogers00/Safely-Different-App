import { get } from "firebase/database";
import { auth, database } from "../firebase/firebase";
//import { getAnalytics } from "firebase/analytics";
import { ref } from 'firebase/database';

const getUid = () => {
    return new Promise((resolve, reject) =>
    // check if user logged in
    auth.onAuthStateChanged(user => {
        if (user) {
            //return uid
            resolve(user.uid);
        } else {
            // user is signed out
           reject(new Error("No user logged in"));
        }
    })
);
} 

// a helper function to get the current user
const getCurrentUser = () => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("No user logged in");
  }
  return user;
};

//function to return the logged in user's email
const ReturnEmail = async () => {
  //get the current user
  const user = getCurrentUser();
  //search database for the user's email using their id
  const dataRef = ref(database, 'users/'+user.uid+'/email');
  const snapshot = await get(dataRef);
  //return the value received from the db
  return snapshot.val();
};


const ReturnPrivilege = async () => {
  //get the current user
  const user = getCurrentUser();
  //search database for the user's privilege using their id
  const dataRef = ref(database, 'users/'+user.uid+'/privileges');
  const snapshot = await get(dataRef);
  //return the value received from the db
  return snapshot.val();
};

const ReturnName = async () => {
  //get the current user
  const user = getCurrentUser();
  //search database for the user's email using their id
  const dataRef = ref(database, 'users/'+user.uid+'/displayName');
  const snapshot = await get(dataRef);
  //return the value received from the db
  return snapshot.val();
}

const ReturnRegDate = async () => {
  //get the current user
  const user = getCurrentUser();
  //search database for the user's email using their id
  const dataRef = ref(database, 'users/'+user.uid+'/registrationDate');
  const snapshot = await get(dataRef);
  //return the value received from the db
  return snapshot.val();
}

// TODO: Implement ReturnFollows and ReturnFollowers functions so they actually work.
// These functions are placeholders for now.
// Users should be able to follow and unfollow other users in blogs
// Also, add a function to remove followers

const ReturnFollows = async () => {
  //get the current user
  const user = getCurrentUser();
  //search database for the user's email using their id
  const dataRef = ref(database, 'users/'+user.uid+'/follows');
  const snapshot = await get(dataRef);
  //return the value received from the db
  return snapshot.val();
}

const ReturnFollowers = async () => {
  //get the current user
  const user = getCurrentUser();
  //search database for the user's email using their id
  const dataRef = ref(database, 'users/'+user.uid+'/followers');
  const snapshot = await get(dataRef);
  //return the value received from the db
  return snapshot.val();
}

export default getUid
export { ReturnEmail, ReturnPrivilege, ReturnName, ReturnRegDate, ReturnFollows, ReturnFollowers };

/* 
to call the return functions use:
(email for example)

  //get email ----------------------------------------------------

  useEffect(() => {
    // call return email
    ReturnEmail()
      .then((emailData) => {
        //do something with the data (good to assign to seperate variable)
      })
      //handle error
      .catch((error) => {
        console.error("Error getting email: ", error);
      });
  }, []);

  //end of get email -------------------------------------------- 


*/