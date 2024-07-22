import React, { useState, useEffect } from 'react';
import { ReturnEmail, ReturnPrivilege, ReturnName } from '../UsersDetails';
import { getAuth, updatePassword } from 'firebase/auth';
import { useAuth } from '../AuthDetails';

const UserProfile = () => {
    //variable that will store email after it is correctly fetched
  const [email, setEmail] = useState(null);
  const [privilege, setPrivilege] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [message, setMessage] = useState('');
  const { authUser } = useAuth();
  const auth = getAuth();

  //get email ----------------------------------------------------
  useEffect(() => {
    if (authUser) {
    // call return email
      ReturnEmail()
        .then((emailData) => {
          //debug statement
          console.log("Email from Profile: ", emailData);
          setEmail(emailData); // set email when data is fetched
        })
        //handle error
        .catch((error) => {
          console.error("Error getting email: ", error);
        });

        // call return privilege
        ReturnPrivilege()
            .then((privilegeData) => {
            //debug statement
            console.log("Privilege from Profile: ", privilegeData);
            setPrivilege(privilegeData); // set privilege when data is fetched
            })
            //handle error
            .catch((error) => {
            console.error("Error getting email: ", error);
          });
        ReturnName()
          .then((displayName) => {
            console.log("Display Name from Profile: ", displayName);
            setDisplayName(displayName);
          });
        }
          
      }, [authUser]);
    //end of get priv --------------------------------------------

  // Function to handle updating the user's password
  const handleUpdatePassword = async () => {
    try {
      await updatePassword(auth.currentUser, newPassword);
      setMessage('Password updated successfully');
    } catch (error) {
      setMessage(`Error updating password: ${error.message}`);
    }
  };

  return (
    <div id="profile">
      <h1>Your Profile</h1>
      {authUser ? (
        <div>
          <p>Email: {email ? email : authUser.email}</p>
          <p>Privilege: {privilege}</p>
          <p>Display Name: {displayName}</p>
        </div>
      ) : (
        <p>Loading email...</p>
      )}
      <div>
        <h2>Update Profile</h2>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button onClick={handleUpdatePassword}>Update Password</button>
        </div>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default UserProfile;
