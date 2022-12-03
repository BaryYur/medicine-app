import React, { useContext } from "react";

import { useNavigate } from "react-router-dom";
import AuthContext from "../context/auth-context";

import { Button } from "@mui/material";
import "./UserPage.css";

const UserPage = () => {
    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);
    const userPageInfo = authCtx.userInfo;

    return (
        <div className="main-wrapper">
            <div className="user-page-info-container">
                <div className="user-info-box">
                    <h2>{userPageInfo.firstName} {userPageInfo.lastName}</h2>
                    <h3>{userPageInfo.email}</h3>
                </div>
                <div className="logout-btn-box">
                    <Button
                        variant="contained"
                        style={{ backgroundColor: "indianred", marginTop: "30px" }}
                        size="medium"
                        onClick={() => {
                            authCtx.logout();
                            navigate("/auth");
                        }}
                    >Logout</Button>
                </div>
            </div>
        </div>
    )
}

export default UserPage;