import React, { useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import MedicineItemsContext from "../../context/medicine-items-context";

import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import "./SearchingForm.css";

const SearchingForm = () => {
    const navigate = useNavigate();
    const medicineCtx = useContext(MedicineItemsContext);
    const [searchingCross, setSearchingCross] = useState(false);
    const [searchingInput, setSearchingInput] = useState("");

    const clearInputHandler = () => {
        setSearchingInput("");
        setSearchingCross(false);
    }

    useEffect(() => {
        if (searchingInput !== "") {
            setSearchingCross(true);
        } else {
            setSearchingCross(false);
        }
    }, [searchingInput])

    const searchingFormSubmitHandler = (e) => {
        e.preventDefault();

        if (searchingInput === "") return;

        let searchingInfo = searchingInput;
        localStorage.setItem("search", JSON.stringify(searchingInfo));
        let category = JSON.parse(localStorage.getItem("filteringSearching"));
        medicineCtx.fetchingSearchingFiltering(category, searchingInput);

        navigate(`/search/?text=${searchingInput.toLowerCase()}`);
    }

    return (
        <div className="searching-form-container">
            <form onSubmit={searchingFormSubmitHandler}>
                <input
                    type="text"
                    placeholder="Search"
                    style={{ width: "88%" }}
                    value={searchingInput}
                    onChange={(e) => {
                        setSearchingInput(e.target.value);

                        if (searchingInput !== "") {
                            setSearchingCross(true);
                        } else {
                            setSearchingCross(false);
                        }
                    }}
                />
                {searchingCross &&
                    <button
                        className="cross-btn"
                        type="button"
                        onClick={clearInputHandler}
                    >
                    <ClearIcon fontSize="small" style={{ margin: "0" }} />
                </button>}
                <Button className="search-btn" variant="contained" type="submit">
                    <SearchIcon />
                </Button>
            </form>
        </div>
    )
}

export default SearchingForm;