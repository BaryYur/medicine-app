import React, { useContext, useEffect, useState } from "react";

import { NavLink, Link } from "react-router-dom";

import MedicineItemsContext from "../../context/medicine-items-context";
import AuthContext from "../../context/auth-context";

import CategoriesMenu from "./CategoriesMenu";
import Cart from "../Cart/Cart";
import { Button } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import PersonIcon from '@mui/icons-material/Person';
import "./Header.css";

const Header = () => {
    const authCtx = useContext(AuthContext);
    const medicineCtx = useContext(MedicineItemsContext);
    const counterNumber = medicineCtx.cartItems.length;
    const [counter, setCounter] = useState(0);
    const [visibleCounter, setVisibleCounter] = useState(false);
    const [c, setC] = useState("");

    useEffect(() => {
        if (counter === 0) {
            setVisibleCounter(true);
        } else {
            setVisibleCounter(false);
        }

        if (counter > 99) {
            setC("99+")
        } else {
            setC(counter.toString());
        }

        setCounter(counterNumber);
    }, [visibleCounter, counter, counterNumber])

    // when scrolling down changing header
    // window.onscroll = () => scrollFunction();
    //
    // const scrollFunction = () => {
    //     if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    //         document.getElementById("header").style.boxShadow = "0 0 .5em rgba(0, 0, 0, .5)";
    //     } else {
    //         document.getElementById("header").style.boxShadow = "none";
    //     }
    // }

    return (
        <header id="header">
            <div className="header-container">
                <div className="logo-box">
                    <Link to="/home">
                        <MedicalServicesIcon fontSize="large" style={{ color: "#50C878" }} />
                        <span>Medical Shop</span>
                    </Link>
                </div>
                <div>
                    <ul>
                        <li>
                            <Link to="/add-new" style={{ color: "#50C878" }}>Add new medicine item</Link>
                        </li>
                        <li>
                            <CategoriesMenu />
                        </li>
                        <li>
                            <NavLink to="/profile">
                                <PersonIcon style={{ color: "#50C878" }} />
                            </NavLink>
                        </li>
                        <li>
                            <Button
                                onClick={() => authCtx.openCartHandler()}
                                className={visibleCounter ? "not-active-counter" : ""}
                                data-count={c}
                                style={{ color: "#50C878", border: "1px solid", padding: "3px"}}
                            >
                                <ShoppingCartIcon />
                            </Button>
                        </li>
                    </ul>
                </div>
            </div>
            <Cart />
        </header>
    );
}

export default Header;