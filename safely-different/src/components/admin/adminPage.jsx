import AuthDetails, { AuthContext } from "../AuthDetails";
import ReadOneDB from "../../readOneEntry";
import { useContext } from "react";

function AdminPage() {
  const { authUser } = useContext(AuthContext);

  const isAdmin =
    authUser && ReadOneDB(`users/${authUser.uid}/privileges`) === "admin";

  //check if user is an admin, display admin page if they are
  return (
    <div id="adminPage">
      {isAdmin ? (
        <h1 style={{color:"white"}}>ADMIN PAGE</h1>
      ) : (
        <h1 style={{color:"red"}}>Not an admin account, access denied</h1>
      )}
    </div>
  );
}

export default AdminPage;
