import { useContext } from "react";
import { AuthContext } from "../AuthDetails";
import useReadOneDB from "../../readOneEntry";
import NavBar from "../UI/HomepageComponents/NavBar";
import TableDisplay from "./userTable";

function AdminPage() {
  const { authUser } = useContext(AuthContext);
  const username = useReadOneDB(`users/${authUser?.uid}/displayName`);
  const privileges = useReadOneDB(`users/${authUser?.uid}/privileges`);

  //check user has access (if they are owner or admin)
  const hasAccess =
    privileges === "admin" ||
    privileges === "Admin" ||
    privileges === "owner" ||
    privileges === "Owner";

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

  return (
    <div className="overflow-y-auto overflow-x-hidden h-screen bg-gradient-to-b from-teal-400 to teal-600">
    <div id="adminPage">
      <NavBar />
      {hasAccess ? (
        <div id="adminSuccess">
          <br />
          <h1>Hello {username}, welcome to the admin dashboard!</h1>
          <div className="table" style={{backgroundColor:'white'}}>
            <h2>User Table</h2>
            <TableDisplay />
          </div>
          {/**
           * TODO: add feature for admin to upload documents for download
           *       visits to the page in last week?
           */}
        </div>
      ) : (
        //display error if a non-admin/owner attempts to access the admin page
        <h1 style={errorStyles}>Not an admin account, access denied</h1>
      )}
    </div>
    </div>
  );
}

export default AdminPage;
