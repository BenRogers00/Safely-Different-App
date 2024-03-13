//Responsible for rendering the "need help?" hyperlink
//Navigates to a help page when clicked

import { Link } from "react-router-dom";

function HelpLink() {
    return(
        <Link to ="/help">Need help?</Link>
    );
}

export default Link;