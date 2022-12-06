import React, { useContext } from "react";

import MedicineItemsContext from "../../context/medicine-items-context";

import CartItem from "./CartItem";

import "./CartItems.css";

const CartItems = () => {
    const medicineCtx = useContext(MedicineItemsContext);
    const cartItemsInCart = medicineCtx.cartItems;

    return (
      <div className="cart-items-container">
          <ul>
              {cartItemsInCart.map(cartItem => (
                  <CartItem
                      id={cartItem.id}
                      key={Math.random()}
                      name={cartItem.name}
                      price={cartItem.price}
                      quantity={cartItem.quantity}
                      img={cartItem.file}
                  />
              ))}
          </ul>
      </div>
    );
}

export default CartItems;