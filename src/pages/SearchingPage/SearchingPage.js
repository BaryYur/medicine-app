import React, { useEffect, useState, useContext } from "react";

import { useNavigate } from "react-router-dom";
import MedicineItemsContext from "../../context/medicine-items-context";

import MedicineItemsList from "../../components/MedicineItems/MedicineItemsList";
import FilteringSearchingItem from "./FilteringSearchingItem";
import ClearIcon from "@mui/icons-material/Clear";
import {Button, CircularProgress} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import "./SearchingPage.css";

const SearchingPage = () => {
    const navigate = useNavigate();
    const medicineCtx = useContext(MedicineItemsContext);
    const [newSearchingInput, setNewSearchingInput] = useState(JSON.parse(localStorage.getItem("search")) || "");
    const [searchingCross, setSearchingCross] = useState(false);
    const searchingText = JSON.parse(localStorage.getItem("search")) || "";
    //
    const filteringData = ["pill", "solution", "tincture", "gel"];

    const clearSearchingInputHandler = () => {
        setNewSearchingInput("");
        setSearchingCross(false);
    }

    useEffect(() => {
        if (newSearchingInput !== "") {
            setSearchingCross(true);
        } else {
            setSearchingCross(false);
        }
    }, [newSearchingInput])

    const submitHandler = (e) => {
        e.preventDefault();

        if (newSearchingInput === "") return;

        let searchingInfo = newSearchingInput;
        localStorage.setItem("search", JSON.stringify(searchingInfo));

        medicineCtx.fetchingSearchingItems(newSearchingInput);
        navigate(`/search/?text=${newSearchingInput.toLowerCase()}`);
    }

    return (
        <div className="main-wrapper searching-main-wrapper">
            <div className="searching-page-head">
                <h2>Search: <span>"{searchingText}"</span></h2>
                <h2>Found <span>{medicineCtx.searchingItems.length}</span> {medicineCtx.searchingItems.length !== 1 ? <span>items</span> : <span>item</span>}</h2>
                <hr />
            </div>
            <div className="searching-form-container">
                <form onSubmit={submitHandler}>
                    <input
                        type="text"
                        placeholder="Search"
                        value={newSearchingInput}
                        onChange={(e) => {
                            setNewSearchingInput(e.target.value);
                            JSON.parse(localStorage.getItem("search"))[0] = newSearchingInput;

                            if (newSearchingInput !== "") {
                                setSearchingCross(true);
                            } else {
                                setSearchingCross(false);
                            }
                        }}
                        style={{ width: "88%" }}
                    />
                    {searchingCross &&
                        <button
                            className="cross-btn"
                            type="button"
                            onClick={clearSearchingInputHandler}
                        >
                            <ClearIcon fontSize="small" style={{ margin: "0" }} />
                        </button>}
                    <Button type="submit" className="search-btn" variant="contained">
                        <SearchIcon />
                    </Button>
                </form>
            </div>
            <div className="searching-items-container">
                <div className="filtering-container">
                    <h3>Categories:</h3>
                    <ul>
                        <FilteringSearchingItem id={Math.random()} category="all" name={newSearchingInput} />
                        {filteringData.map(filteringName => (
                            <FilteringSearchingItem
                                key={Math.random()}
                                id={Math.random()}
                                category={filteringName}
                                name={newSearchingInput}
                            />
                        ))}
                    </ul>
                </div>
                {!medicineCtx.loading ?
                    <MedicineItemsList data={medicineCtx.searchingItems} /> :
                    <CircularProgress style={{ color: "#50C878", display: "block", margin: "60px auto", }} />
                }
            </div>
            {medicineCtx.searchingItems.length === 0 && !medicineCtx.loading && <p className="no-items-paragraph">No results!</p>}
        </div>
    )
}

export default SearchingPage;