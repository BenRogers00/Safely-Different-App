import AuthDetails, { AuthContext } from "../AuthDetails";
import ReadOneDB from "../../readOneEntry";
import { useContext } from "react";

function AdminPage() {
  const { authUser } = useContext(AuthContext);

  const isAdmin =
    authUser && ReadOneDB(`users/${authUser.uid}/privileges`) === "admin";

    //check if user is an admin, display admin page if they are
  if (isAdmin) {
    return <h1>ADMIN PAGE</h1>;
  } else
  //if user not an admin, display appropriate error message 
    return <h1>Not an admin account, access denied</h1>;
}

export default AdminPage;
