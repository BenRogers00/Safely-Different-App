import AuthDetails, { AuthContext } from "../AuthDetails";
import ReadOneDB from "../../readOneEntry";
import { useContext } from "react";
import NavBar from "../UI/HomepageComponents/NavBar";
import TableDisplay from "./userTable";

function AdminPage() {
  const { authUser } = useContext(AuthContext);
  const username = ReadOneDB(`users/${authUser.uid}/displayName`);

  //check if user is admin variable
  const isAdmin =
    authUser && (ReadOneDB(`users/${authUser.uid}/privileges`) === "admin" || ReadOneDB(`users/${authUser.uid}/privileges`) === "Admin");

  //make whole page red if user is not admin, and display clearly that access is denied
  const errorStyles = {
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "#f44336",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    textAlign: "center",
    fontFamily: "'Arial', sans-serif",
  };

  //check if user is an admin, display admin page
  return (
    <div id="adminPage">
      <NavBar />
      {isAdmin ? (
        <div id="adminSuccess">
          <h1>
            Hello {username}, welcome to the admin dashboard!
          </h1>
          {/**
           * TODO: add users table as dropdown, including upgrading privileges
           *       add admin profile
           *       visits to the page in last week?
           *
           */}

           <TableDisplay/>
        </div>
      ) : (
        <h1 style={errorStyles}>Not an admin account, access denied</h1>
      )}
    </div>
  );
}

export default AdminPage;
