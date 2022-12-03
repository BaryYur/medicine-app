import React, {useContext} from "react";

import { Link } from "react-router-dom";
import "./NotFoundPage.css";
import BugReportIcon from '@mui/icons-material/BugReport';
import AuthContext from "../context/auth-context";

const NotFoundPage = () => {
    const authCtx = useContext(AuthContext);

    return (
        <div className="not-found-page-container">
            <div>
                <h1>
                    <span>
                        <BugReportIcon fontSize="large" style={{ marginRight: "8px", color: "#50C878" }}  />
                    </span>
                    <span>404</span>
                </h1>
                <p>Page not found!</p>
                {!authCtx.isLoggedIn && <Link to="/auth">Back to authentication</Link>}
            </div>
        </div>
    );
}

export default NotFoundPage;