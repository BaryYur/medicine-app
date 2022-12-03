import React, { useContext } from "react";

import MedicineItemsContext from "../context/medicine-items-context";

import MedicineItemsList from "../components/MedicineItems/MedicineItemsList";

import { CircularProgress } from "@mui/material";
import FilteringList from "../components/FilteringComponents/FilteringList";
import FilteringItem from "../components/FilteringComponents/FilteringItem";
import "./GelPage.css";

const GelPage = () => {
    const medicineCtx = useContext(MedicineItemsContext);

    return (
        <div className="main-wrapper">
            <h1>Gel Page</h1>
            <div className="main-wrapper__category-container">
                <div className="filtering-container">
                    <h3>Shop names:</h3>
                    <FilteringItem name="all" category="gel" id={Math.random()}  />
                    {!medicineCtx.filteringLoading ?
                        <FilteringList filteringData={medicineCtx.gelFilteringNames} category="gel"/>:
                        <p>Loading...</p>
                    }
                </div>
                {!medicineCtx.loading ?
                    <MedicineItemsList data={medicineCtx.gelItems}/> :
                    <CircularProgress style={{ color: "#50C878", display: "block", margin: "60px auto", }} />
                }
                {medicineCtx.gelItems.length === 0 && !medicineCtx.loading && <p style={{ fontSize: "20px", textAlign: "left", display: "block", width: "50%", marginLeft: "-300px" }} className="no-items-paragraph">No results!</p>}
            </div>
        </div>
    )
}

export default GelPage;