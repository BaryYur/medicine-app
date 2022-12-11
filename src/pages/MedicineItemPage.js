import React, { useContext, useEffect, useState } from "react";

import { useParams, useLocation } from "react-router-dom";
import MedicineItemsContext from "../context/medicine-items-context";

import { Button, Card, CircularProgress } from "@mui/material";

import "./MedicineItemPage.css";

const MedicineItemPage = () => {
    const params = useParams();
    const location = useLocation();
    let categoryLocation = location.pathname.split("/")[1];
    const medicineCtx = useContext(MedicineItemsContext);
    const [chosenMedicineItem, setChosenMedicineItem] = useState({});
    const [chosenItemLoading, setChosenItemLoading] = useState(false);
    const [activeAddingBtn, setActiveAddingBtn] = useState(false);

    const fetchingCategoryItems = (category, id) =>  {
         setChosenItemLoading(true);

        fetch(`https://api-apteka.herokuapp.com/${category}/${id}`, {
            method: "GET",
            headers: {
                Authorization: localStorage.getItem("token"),
            }
        })
            .then(response => response.json())
            .then(data => {
                setChosenItemLoading(false);
                setChosenMedicineItem(data);
            })
    }

    useEffect(() => {
        fetchingCategoryItems(categoryLocation, params.id);
    }, [params])

    return (
        <div className="main-wrapper">
            {!chosenItemLoading ?
                <Card className="medicine-item-page-container">
                    <div className="medicine-item-page__main-info">
                        <img src={"data:image/png;base64," + chosenMedicineItem.file} />
                        <div>
                            <p>Name: <span>{chosenMedicineItem.name}</span></p>
                            <p>All goods: <span>{chosenMedicineItem.allGoods}</span></p>
                            <p>Dosage: <span>{chosenMedicineItem.dosage} gr</span></p>
                            <p>Manufacture: <span>{chosenMedicineItem.manufacturer}</span></p>
                            <p>Producing country: <span>{chosenMedicineItem.producingCountry}</span></p>
                            <p>Release form: <span>{chosenMedicineItem.releaseForm}</span></p>
                            <p>Quantity: <span>{chosenMedicineItem.quantity}</span></p>
                            <p>Price: <span>{chosenMedicineItem.price} hrn</span></p>
                        </div>
                    </div>
                    <div className="medicine-item-btns-container">
                        <Button
                            // variant="contained"
                            // onClick={() => {
                            //     medicineCtx.addToCart(chosenMedicineItem.id, categoryLocation.toUpperCase());
                            // }}
                        >

                        </Button>
                        <Button
                            variant="contained"
                            disabled={activeAddingBtn}
                            className="adding-to-cart-btn"
                            onClick={() => {
                                medicineCtx.addToCart(chosenMedicineItem.id, categoryLocation.toUpperCase());
                                setActiveAddingBtn(true);
                            }}
                        >Add to cart</Button>
                    </div>
                </Card> : <CircularProgress style={{ color: "#50C878", display: "block", margin: "60px auto", }} />
            }
        </div>
    );
}

export default MedicineItemPage;