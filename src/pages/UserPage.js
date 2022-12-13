import React, { useContext } from "react";

import { useNavigate } from "react-router-dom";
import AuthContext from "../context/auth-context";

import { Button } from "@mui/material";
import "./UserPage.css";

const UserPage = () => {
    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);
    const userPageInfo = authCtx.userInfo;
    // const [enteredNewPassword, setEnteredNewPassword] = useState("");

    // const submitChangePasswordHandler = (event) => {
    //     event.preventDefault();
    //
    //     fetch(`https://api-apteka.herokuapp.com/user/${userPageInfo.id}`, {
    //         method: "PUT",
    //         path: userPageInfo.id,
    //         body: JSON.stringify({
    //             email: userPageInfo.email,
    //             firstName: userPageInfo.firstName,
    //             lastName: userPageInfo.lastName,
    //             password: enteredNewPassword,
    //             role: "ADMIN",
    //             status: "ACTIVE"
    //         }),
    //         headers: {
    //             "Content-Type": "application/json",
    //             Authorization: localStorage.getItem("token"),
    //         }
    //     }).then(res => {
    //         // assumption: Always succeeds!
    //
    //         // history.replace('/');
    //     })
    //         .catch(error => {
    //             console.log(error);
    //         })
    // }

    return (
        <div className="main-wrapper">
            <div className="user-page-info-container">
                <div className="user-info-box">
                    <h3>User name: {userPageInfo.firstName} {userPageInfo.lastName}</h3>
                    <h3>Gmail: {userPageInfo.email}</h3>
                    {/*<form onSubmit={submitChangePasswordHandler}>*/}
                    {/*    <label htmlFor="change-password-inp">Change your password:</label>*/}
                    {/*    <div>*/}
                    {/*        <input*/}
                    {/*            id="change-password-inp"*/}
                    {/*            type="text"*/}
                    {/*            placeholder="Enter new password"*/}
                    {/*            minLength="7"*/}
                    {/*            onChange={(e) => setEnteredNewPassword(e.target.value)}*/}
                    {/*        />*/}
                    {/*        <Button type="submit" variant="contained">Change</Button>*/}
                    {/*    </div>*/}
                    {/*</form>*/}
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