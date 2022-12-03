import React, { useState, useEffect, useCallback } from "react";

let logoutTimer;

const AuthContext = React.createContext({
    token: "",
    isLoggedIn: false,
    login: (token, id) => {},
    logout: () => {},
    userInfoHandler: (id) => {},
});

const calculateRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime).getTime();

    const remainingDuration = adjExpirationTime - currentTime;

    return remainingDuration;
};

const retrieveStoredToken = () => {
    const storedToken = localStorage.getItem("token");
    const storedExpirationDate = localStorage.getItem("expirationTime");
    const storedId = localStorage.getItem("userId");

    const remainingTime = calculateRemainingTime(storedExpirationDate);

    if (remainingTime <= 3600) {
      localStorage.removeItem("token");
      localStorage.removeItem("expirationTime");
      localStorage.removeItem("userId");
      return null;
    }

    return {
        token: storedToken,
        duration: remainingTime,
        storedId: storedId,
    };
};

export const AuthContextProvider = ({ children }) => {
    const [cartIsOpen, setCartIsOpen] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [userId, setUserId] = useState(localStorage.getItem("userId") || "");
    const tokenData = retrieveStoredToken();

    const closingCartHandler = () => {
        setCartIsOpen(false);
    }

    const openCartHandler = () => {
        setCartIsOpen(true);
    }

    let initialToken;
    if (tokenData) {
        initialToken = tokenData.token;
    }

    const [token, setToken] = useState(initialToken);

    const userIsLoggedIn = !!token;

    const logoutHandler = useCallback(() => {
        setToken(null);
        setUserId("");
        localStorage.removeItem("token");
        localStorage.removeItem("expirationTime");
        localStorage.removeItem("userId");

        if (logoutTimer) {
            clearTimeout(logoutTimer);
        }
    }, []);

    const fetchingUserData = (id) => {
        fetch(`https://aptekaapi.herokuapp.com/user/${id}`, {
            method: "GET",
            headers: {
                Authorization: localStorage.getItem("token"),
            }
        })
            .then(response => response.json())
            .then(data => {
                setUserInfo(data);
            })
    }

    const loginHandler = (token, expirationTime, id) => {
        setToken(token);
        setUserId(id);
        localStorage.setItem("token", token);
        localStorage.setItem("expirationTime", expirationTime);
        localStorage.setItem("userId", id);

        const remainingTime = calculateRemainingTime(expirationTime);

        logoutTimer = setTimeout(logoutHandler, remainingTime);
        userInfoHandler(userId);
    };

    const userInfoHandler = (id) => {
       fetchingUserData(id);
    }

    useEffect(() => {
        if (tokenData) {
            logoutTimer = setTimeout(logoutHandler, tokenData.duration);
        }
    }, [tokenData, logoutHandler, userInfo]);

    useEffect(() => {
        if (tokenData) {
            userInfoHandler(userId);
        }

        if (!localStorage.getItem("token") || !localStorage.getItem("filteringCategory")) {
            localStorage.setItem("filteringCategory", JSON.stringify([
                {
                    category: "pills",
                    filteringName: "all",
                },
                {
                    category: "tincture",
                    filteringName: "all",
                },
                {
                    category: "solution",
                    filteringName: "all",
                },
                {
                    category: "gel",
                    filteringName: "all",
                },
            ]));
        }
    }, [])

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
        cartIsOpen: cartIsOpen,
        closingCartHandler: closingCartHandler,
        openCartHandler: openCartHandler,
        userInfo: userInfo,
        userInfoHandler: userInfoHandler,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;