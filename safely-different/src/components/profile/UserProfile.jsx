import React, { useState, useEffect } from 'react';
import { ReturnEmail, ReturnPrivilege } from '../UsersDetails';

const UserProfile = () => {
    //variable that will store email after it is correctly fetched
  const [email, setEmail] = useState(null);
  const [privilege, setPrivilege] = useState(null);

  //get email ----------------------------------------------------
  useEffect(() => {
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
  }, []);
  //end of get email -------------------------------------------- 

    //get priv ----------------------------------------------------
    useEffect(() => {
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
        }, []);
    //end of get priv --------------------------------------------

  return (
    <div id='profile'>
      <h1>Your profile!</h1>
      {email !== null ? (
        //call email
        <p>Email: {email}<br/>Privilege: {privilege}</p>
      ) : (
        <p>Loading email...</p>
      )}
    </div>
  );
};

export default UserProfile;
