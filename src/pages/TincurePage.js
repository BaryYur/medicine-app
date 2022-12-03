import React, { useContext } from "react";

import MedicineItemsContext from "../context/medicine-items-context";

import FilteringItem from "../components/FilteringComponents/FilteringItem";
import FilteringList from "../components/FilteringComponents/FilteringList";
import MedicineItemsList from "../components/MedicineItems/MedicineItemsList";

import { CircularProgress } from "@mui/material";

const TincturePage = () => {
    const medicineCtx = useContext(MedicineItemsContext);

    return (
        <div className="main-wrapper">
            <h1>Tincture Page</h1>
            <div className="main-wrapper__category-container">
                <div className="filtering-container">
                    <h3>Shop names:</h3>
                    <FilteringItem name="all" category="tincture" id={Math.random()}  />
                    {!medicineCtx.filteringLoading ?
                        <FilteringList filteringData={medicineCtx.tinctureFilteringNames} category="tincture"/>:
                        <p>Loading...</p>
                    }
                </div>
                {!medicineCtx.loading ?
                    <MedicineItemsList data={medicineCtx.tinctureItems}/> :
                    <CircularProgress style={{ color: "#50C878", display: "block", margin: "60px auto", }} />
                }
                {medicineCtx.tinctureItems.length === 0 && !medicineCtx.loading && <p style={{ fontSize: "20px", textAlign: "left", display: "block", width: "50%", marginLeft: "-300px" }} className="no-items-paragraph">No results!</p>}
            </div>
        </div>
    )
}

export default TincturePage;