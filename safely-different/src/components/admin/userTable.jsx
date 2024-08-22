import React, { useEffect, useState, useContext } from "react";
import { database } from "../../firebase/firebase";
import { ref, onValue } from "firebase/database";
import "./styleAdminTable.css";
import WriteToDatabase from "../../databaseWriting";
import { AuthContext } from "../AuthDetails";
import ReadOneDB from "../../readOneEntry";

const TableDisplay = () => {
  //data for the dropdown menu for privilege changes
  const [data, setData] = useState({});
  const { authUser } = useContext(AuthContext);
  const currentUserID = authUser.uid;
  const isAdmin = authUser && (ReadOneDB(`users/${authUser.uid}/privileges`) === "admin" || ReadOneDB(`users/${authUser.uid}/privileges`) === "Admin" || ReadOneDB(`users/${authUser.uid}/privileges`) === "owner" || ReadOneDB(`users/${authUser.uid}/privileges`) === "Owner");
  const isOwner = authUser && (ReadOneDB(`users/${authUser.uid}/privileges`) === "owner" || ReadOneDB(`users/${authUser.uid}/privileges`) === "Owner");
  const [privilegeOptions, setPrivilegeOptions] = useState([]);

  useEffect(() => {
    const options = [
      { value: 1, label: "Free" },
      { value: 2, label: "Paid" },
    ];
    console.log(isOwner)
    if (isOwner) {
      options.push(
        { value: 3, label: "Admin" },
        { value: 4, label: "Owner" }
      );
    }

    setPrivilegeOptions(options);
  }, [isOwner]);


  //handle a change in privilege
  const handleSelectChange = (userId, event) => {
    const selectedValue = event.target.value;
    //update user's privilege in database
    WriteToDatabase({
      dataInput: selectedValue,
      path: "users/" + userId + "/privileges",
    });
  };

  useEffect(() => {
    // fetch all user data from database
    const fetchData = () => {
      const usersRef = ref(database, "users");
      onValue(usersRef, (snapshot) => {
        //if user found, save the data in a variable
        if (snapshot.exists()) {
          const usersData = snapshot.val();
          setData(usersData); 
        } else {
          console.log("No data available");
        }
      });
    };

    fetchData();

    return () => {
      const usersRef = ref(database, "users");
      onValue(usersRef, () => {}); 
    };
  }, []);

  //display table using data received from fetchData
  return (
    <div className="adminTable">
      <h2>Data from Firebase Realtime Database</h2>
      <table border="1">
        <thead>
          <tr>
            <th>User Email</th>
            <th>Display Name</th>
            <th>Privileges</th>
            <th>User ID</th>
            <th>Set Privilege</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).map((userId) => (
            <tr key={userId}>
              <td>{data[userId].email}</td>
              <td>{data[userId].displayName}</td>
              <td>{data[userId].privileges}</td>
              <td>{userId}</td>
              <td>
                {userId === currentUserID ? ( 
                  <p>{data[userId].privileges}</p>
                )
                :(
                  {isOwner} ?(
                <select
                  value={data[userId].privileges}
                  onChange={(event) => handleSelectChange(userId, event)}
                >
                  {privilegeOptions.map((option) => (
                    //dropdown menu for an admin to manually change the privilege of a user
                    <option key={option.value} value={option.label}>
                      {option.label}
                    </option>
                  ))}
                </select>
                ) : (
                  <p>{data[userId].privileges}</p>
                )
              )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableDisplay;
