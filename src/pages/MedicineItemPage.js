import React, { useContext, useEffect, useState } from "react";

import { useParams, useLocation } from "react-router-dom";
import MedicineItemsContext from "../context/medicine-items-context";

import { Button, Card, CircularProgress } from "@mui/material";

import Swal from "sweetalert2";
import "./MedicineItemPage.css";
import DeleteIcon from "@mui/icons-material/Delete";

const MedicineItemPage = () => {
    const params = useParams();
    const location = useLocation();
    let categoryLocation = location.pathname.split("/")[1];
    const medicineCtx = useContext(MedicineItemsContext);
    const [chosenMedicineItem, setChosenMedicineItem] = useState({});
    const [chosenItemLoading, setChosenItemLoading] = useState(false);
    const [error, setError] = useState("");
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
                if (data.message) setError(data.message);
                setChosenMedicineItem(data);
            })
            .catch(error => {
                setError(error);
                setChosenItemLoading(false);
            })
    }

    const deleteMedicineItemHandler = (category, id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You really wont to delete this item!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                medicineCtx.deleteMedicineItemFromServer(category, id);
                setError("error");
                Swal.fire(
                    "Deleted!",
                    "Medicine item has been deleted.",
                    "success",
                )
            }
        })
    }

    useEffect(() => {
        fetchingCategoryItems(categoryLocation, params.id);
    }, [params])

    return (
        <div className="main-wrapper">
            {!chosenItemLoading && error === "" &&
                <Card className="medicine-item-page-container">
                    <div className="medicine-item-page__main-info">
                        <img src={chosenMedicineItem.file} />
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
                            variant="contained"
                            disabled={activeAddingBtn}
                            className="adding-to-cart-btn"
                            onClick={() => {
                                medicineCtx.addToCart(chosenMedicineItem.id, categoryLocation.toUpperCase());
                                setActiveAddingBtn(true);
                            }}
                        >Add to cart</Button>
                        <Button
                            variant="contained"
                            onClick={() => deleteMedicineItemHandler(chosenMedicineItem.releaseForm.toLowerCase(), chosenMedicineItem.id)}
                        >
                            <DeleteIcon fontSize="small" />
                            <span>Delete</span>
                        </Button>
                    </div>
                </Card>}
            {chosenItemLoading && <CircularProgress style={{ color: "#50C878", display: "block", margin: "60px auto", }} />}
            {error !== "" && <p className="no-items-paragraph" style={{ fontSize: "20px" }}>Item not found</p>}
        </div>
    );
}

export default MedicineItemPage;