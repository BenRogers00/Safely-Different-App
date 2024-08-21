import React, { useEffect, useState } from "react";
import { database } from "../../firebase/firebase";
import { ref, onValue } from "firebase/database";
import "./styleAdminTable.css";
import WriteToDatabase from "../../databaseWriting";

const TableDisplay = () => {
  //data for the dropdown menu for privilege changes
  const [data, setData] = useState({});
  const privilegeOptions = [
    {
      value: 1,
      label: "Select",
    },
    {
      value: 2,
      label: "Free",
    },
    {
      value: 3,
      label: "Paid",
    },
    {
      value: 4,
      label: "Admin",
    },
  ];

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
                {(data[userId].privileges === "Admin" || data[userId].privileges === "admin") ? (
                  <p>Admin</p>
                )
                :(
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
