import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { Card } from "@mui/material";

import "./MedicineItemPage.css";

const MedicineItemPage = () => {
    const params = useParams();
    // const [chosenMedicineItem, setChosenMedicineItem] = useState({});

    useEffect(() => {
        // for (let item of items) {
        //     if (item.id === params.id) {
        //         setChosenMedicineItem(item);
        //     }
        // }
    }, [])

    return (
        <div className="main-wrapper">
            <Card className="pill-item-page-container">
                <p>{params.id}</p>
            </Card>
        </div>
    );
}

export default MedicineItemPage;