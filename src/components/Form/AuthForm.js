import React, { useContext, useRef, useState } from "react";

import AuthContext from "../../context/auth-context";
import MedicineItemsContext from "../../context/medicine-items-context";

import { Button } from "@mui/material";
import "./AuthForm.css";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
    const authCtx = useContext(AuthContext);
    const medicineCtx = useContext(MedicineItemsContext);
    const navigate = useNavigate();
    const nameInputRef = useRef();
    const lastNameInputRef = useRef();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const switchAuthModeHandler = () => {
        setIsLogin(active => !active);
    }

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        let url;
        let body;

        if (isLogin) {
            url = "https://api-apteka.herokuapp.com/user/login";
            body = {
                email: enteredEmail,
                password: enteredPassword,
            }
        } else {
            url = "https://api-apteka.herokuapp.com/user/register";
            body = {
                firstName: nameInputRef.current.value,
                lastName: lastNameInputRef.current.value,
                email: enteredEmail,
                password: enteredPassword,
            }
        }

        setIsLoading(true);

        fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                setIsLoading(false);
                if (res.ok) {
                    return res.json();
                } else {
                    return res.json().then((data) => {
                        let errorMessage = "Authentication failed!";

                        throw new Error(errorMessage);
                    });
                }
            })
            .then((data) => {
                const expirationTime = new Date(new Date().getTime() + +"6048000");

                authCtx.login(data.token, expirationTime.toISOString(), data.id);
                authCtx.userInfoHandler(data.id);
                navigate("/");

                if (data) {
                    medicineCtx.effectData();
                }

                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoading(false);
                alert(err.message);
            });
    }

    return (
        <div className="login-form-container">
            <h1>{isLogin ? "Login" : "Sign Up"}</h1>
            <form onSubmit={submitHandler}>
                {!isLogin && <div className="control">
                    <label htmlFor="name">Your Name</label>
                    <input
                        id="name"
                        placeholder="Name"
                        type="text"
                        ref={nameInputRef}
                    />
                </div>}
                {!isLogin && <div className="control">
                    <label htmlFor="lastName">Your Last Name</label>
                    <input
                        id="lastName"
                        placeholder="Last Name"
                        type="text"
                        ref={lastNameInputRef}
                    />
                </div>}
                <div className="control">
                    <label htmlFor="email">Your Email</label>
                    <input
                        id="email"
                        placeholder="Email"
                        type="email"
                        ref={emailInputRef}
                    />
                </div>
                <div className="control">
                    <label htmlFor="password">Your Password</label>
                    <input
                        id="password"
                        placeholder="Password"
                        type="password"
                        ref={passwordInputRef}
                    />
                </div>
                <div className="login-btns-box">
                    {!isLoading && <Button type="submit" variant="contained" style={{ backgroundColor:  "#50C878" }} >
                        {isLogin ? "Login" : "Create account"}
                    </Button>}
                    {isLoading && <p>Sending request...</p>}
                    <Button
                        type="button"
                        onClick={switchAuthModeHandler}
                        style={{ color: "#50C878" }}
                    >
                        {isLogin ? "Create new account" : "Login with existing account"}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default AuthForm;