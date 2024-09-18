/**
 * UserProfile component displays the user's profile information and allows them to update their password.
 *
 * @component
 * @example
 * return (
 *   <UserProfile />
 * )
 */
import React, { useState, useEffect } from 'react';
import { ReturnEmail, ReturnPrivilege, ReturnName, ReturnRegDate, ReturnFollows, ReturnFollowers } from '../UsersDetails';
import { getAuth, updatePassword } from 'firebase/auth';
import { useAuth } from '../AuthDetails';
import NavBar from '../UI/HomepageComponents/NavBar';
import './profile.css';

const UserProfile = () => {
    //variable that will store email after it is correctly fetched
  const [email, setEmail] = useState(null);
  const [privilege, setPrivilege] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [regDate, setRegDate] = useState('');
  const [follows, setFollows] = useState('');
  const [followers, setFollowers] = useState('');
  const [message, setMessage] = useState('');
  const { authUser } = useAuth();
  const auth = getAuth();
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    }).format(date);
  };

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

        ReturnRegDate()
          .then((regDate) => {
            console.log("Registration Date from Profile: ", regDate);
            setRegDate(formatDate(regDate));
          });

        ReturnFollows()
          .then((follows) => {
            if(follows == null)
            {
              follows = 0;
            }
            setFollows(follows);
          });

          ReturnFollowers()
          .then((followers) => {
            if(followers == null)
            {
              followers = 0;
            }
            setFollowers(followers);
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
    <div className="overflow-y-auto overflow-x-hidden h-screen bg-gradient-to-b from-teal-400 to teal-600">
      <NavBar Mobile ={false}/> {/* putting props inside mobile */}
      <div id="profile">
        <h1>Your Profile</h1>
        {authUser ? (
          <div>
            <p>Email: {email ? email : authUser.email}</p>
            <p>Privilege: {privilege}</p>
            <p>Display Name: {displayName}</p>
            <p>Registration Date: {regDate}</p>
            <p>Follows: {follows}</p>
            <p>Followers: {followers}</p>
          </div>
        ) : (
          <p>Loading email...</p>
        )}
        <div>
          <h2 style={{color:'black'}}>Update Profile</h2>
          <div>
            <label style={{color:'black'}}>New Password:</label>
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
    </div>
  );
};

export default UserProfile;
