import AuthDetails, { AuthContext } from "../AuthDetails";
import ReadOneDB from "../../readOneEntry";
import { useContext } from "react";
import NavBar from "../UI/HomepageComponents/NavBar";

function AdminPage() {
  const { authUser } = useContext(AuthContext);
  const username = ReadOneDB(`users/${authUser.uid}/displayName`);

  const isAdmin =
    authUser && ReadOneDB(`users/${authUser.uid}/privileges`) === "admin";

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
        fontFamily: "'Arial', sans-serif"
      };

  //check if user is an admin, display admin page if they are
  return (
    <div id="adminPage">
        <NavBar/>
      {isAdmin ? (
        <div id="adminSuccess">
        <h1 style={{color:"white"}}>Hello {username}, welcome to the admin dashboard</h1>
        
        </div>
      ) : (
        <h1 style={errorStyles}>Not an admin account, access denied</h1>
      )}
    </div>
  );
}

export default AdminPage;
