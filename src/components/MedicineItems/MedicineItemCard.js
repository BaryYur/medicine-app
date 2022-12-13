import React, { useState, useContext, useEffect } from "react";

import { Link } from "react-router-dom";
import MedicineItemsContext from "../../context/medicine-items-context";

import { Button, Card } from "@mui/material";
import "./MedicineItemCard.css";

const MedicineItemCard = ({ title, img, price, id, link, category }) => {
    const medicineCtx = useContext(MedicineItemsContext);
    const [activeAddingBtn, setActiveAddingBtn] = useState(false);

    useEffect(() => {
        let idArr = [];
        for (let item of medicineCtx.cartItems) {
            if (item.id === id) {
                 setActiveAddingBtn(true);
            }

            idArr.push(item.id);
        }

        if (!idArr.includes(id)) {
            setActiveAddingBtn(false);
        }
    }, [activeAddingBtn, medicineCtx.cartItems])

    return (
        <Card
            style={{
                minHeight: "350px",
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
            }}
        >
            <Link to={link}>
                <div className="medicine-card__head">
                    <img src={img} alt={title} />
                    <p>{title}</p>
                </div>
            </Link>
            <div className="medicine-card__bottom">
                <div>
                    <h3>{price}</h3>
                    <span>hrn</span>
                </div>
                <Button
                    variant="contained"
                    disabled={activeAddingBtn}
                    className="adding-to-cart-btn"
                    onClick={() => {
                        medicineCtx.addToCart(id, category);
                        setActiveAddingBtn(true);
                    }}
                >Add</Button>
            </div>
        </Card>
    );
}

export default MedicineItemCard;
