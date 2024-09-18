import React, { useEffect, useState, useContext } from "react";
import { database } from "../../firebase/firebase";
import { ref, onValue } from "firebase/database";
import "./styleAdminTable.css";
import WriteToDatabase from "../../databaseWriting";
import { AuthContext } from "../AuthDetails";
import ReadOneDB from "../../readOneEntry";

const TableDisplay = () => {
  const [data, setData] = useState({});
  const { authUser } = useContext(AuthContext);
  const currentUserID = authUser.uid;

  const isOwner =
    authUser &&
    (ReadOneDB(`users/${authUser.uid}/privileges`) === "owner" ||
      ReadOneDB(`users/${authUser.uid}/privileges`) === "Owner");

  const [privilegeOptions, setPrivilegeOptions] = useState([]);

  useEffect(() => {
    const options = [
      { value: 1, label: "Free" },
      { value: 2, label: "Paid" },
      { value: 3, label: "Admin" },
    ];
    if (isOwner) {
      options.push({ value: 4, label: "Owner" });
    }
    setPrivilegeOptions(options);
  }, [isOwner]);

  const handleSelectChange = (userId, event) => {
    const selectedValue = event.target.value;
    WriteToDatabase({
      dataInput: selectedValue,
      path: "users/" + userId + "/privileges",
    });
  };

  useEffect(() => {
    const fetchData = () => {
      const usersRef = ref(database, "users");
      onValue(usersRef, (snapshot) => {
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

  return (
    <div className="adminTable">
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
                ) : isOwner ? (
                  <select
                    value={data[userId].privileges}
                    onChange={(event) => handleSelectChange(userId, event)}
                  >
                    {privilegeOptions.map((option) => (
                      <option key={option.value} value={option.label}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p>{data[userId].privileges}</p>
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
