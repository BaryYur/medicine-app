import React, { useContext, useState } from "react";

import { Link } from "react-router-dom";
import AuthContext from "../../context/auth-context";
import MedicineItemsContext from "../../context/medicine-items-context";

import { Button, Card } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "./CartItem.css";

const CartItem = ({ name, id, price, category, quantity, img}) => {
    const authCtx = useContext(AuthContext);
    const medicineCtx = useContext(MedicineItemsContext);
    const [totalPrice, setTotalPrice] = useState(price);
    const [cartItemQuantity, setCartItemQuantity] = useState(1);

    const increaseHandler = () => {
        if (cartItemQuantity < quantity) {
            setCartItemQuantity(q => q + 1);
            setTotalPrice(totalPrice => totalPrice + price);
        } else {
            alert("This is maximum quantity");
        };
    }

    const decreaseHandler = () => {
        if (cartItemQuantity !== 1) {
            setCartItemQuantity(q => q - 1);
            setTotalPrice(totalPrice => totalPrice - price);
        } else return;
    }

    const deleteCartItemHandler = (id) => {
        medicineCtx.deleteFromCart(id);
    }

    return (
        <li>
            <Card
                style={{
                    margin: "8px 0",
                    padding: "7px",
                    minHeight: "140px",
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <div className="cart-item-box">
                    <Link to={`/${category}/${id}`} onClick={authCtx.closingCartHandler}>
                        <img src={"data:image/png;base64," + img} alt={name} />
                    </Link>
                    <div>
                        <Link to={`/${category}/${id}`}>{name}</Link>
                        {/*<p>producingCountry: {producingCountry},</p>*/}
                        {/*<p>releaseForm: {releaseForm} </p>*/}
                    </div>
                </div>
                <div className="price-and-delete-container">
                    <div className="price-box">
                        <button onClick={decreaseHandler}>-</button>
                        <div>
                            {totalPrice} <span>hrn</span> / {cartItemQuantity}
                        </div>
                        <button onClick={increaseHandler}>+</button>
                        <button className="price-box__delete-btn" onClick={() => deleteCartItemHandler(id)}>
                            <DeleteIcon fontSize="small" />
                        </button>
                    </div>
                    <div className="order-box">
                        <Link to="/checkout" className="order-cart-item-box">
                            <Button variant="contained">Order</Button>
                        </Link>
                    </div>
                </div>
            </Card>
        </li>
    );
}

export default CartItem;