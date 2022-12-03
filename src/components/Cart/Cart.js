import React, { useContext } from "react";

import AuthContext from "../../context/auth-context";
import MedicineItemsContext from "../../context/medicine-items-context";

import CartItems from "./CartItems";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import "./Cart.css";

const style = {
    width: "800px",
    backgroundColor: "background.paper",
    border: "1px solid grey",
    boxShadow: 24,
    padding: "12px 2px 12px 12px",
    borderRadius: "5px",
    margin: "80px auto",
    height: "70%",
};

const Cart = () => {
    const authCtx = useContext(AuthContext);
    const medicineCtx = useContext(MedicineItemsContext);

    return (
        <div>
            <Modal
                open={authCtx.cartIsOpen}
                onClose={authCtx.closingCartHandler}
                className="modal"
            >
                <Box sx={{ ...style }}>
                    <div className="cart-head">
                        <h2>Your Cart</h2>
                        <button onClick={authCtx.closingCartHandler}>
                            <CloseIcon />
                        </button>
                    </div>
                    <div className="line"></div>
                    {medicineCtx.cartItems.length === 0 ?
                        <p className="no-items-paragraph">
                            Your cart is empty
                        </p> : <CartItems />
                    }
                </Box>
            </Modal>
        </div>
    );
}

export default Cart;