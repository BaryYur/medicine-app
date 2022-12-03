import React, { useState, useEffect } from "react";

const FilteringSearchingItem = ({ name, id }) => {
    let localSearchingFiltering = JSON.parse(localStorage.getItem("filteringSearching"));
    const [checkedSearchingRadio, setCheckedSearchingRadio] = useState(false);

    const filterSearchingCategoryHandler = (name) => {
        setCheckedSearchingRadio(true);
        localStorage.setItem("filteringSearching", JSON.stringify(name));
    }

    useEffect(() => {
        if (!localSearchingFiltering) {
            localStorage.setItem("filteringSearching", JSON.stringify("all"));
        }

        if (localSearchingFiltering === name) {
            setCheckedSearchingRadio(true);
        }
    }, [])

    return (
        <li className="filtering-category-item">
            <input
                id={`${id}-radio`}
                type="radio"
                style={{ color: "#50C878", }}
                name="radio-filtering-searching-btn"
                checked={checkedSearchingRadio}
                onChange={() => {
                    if (localSearchingFiltering === name) {
                        setCheckedSearchingRadio(true);
                    }
                }}
                onClick={() => filterSearchingCategoryHandler(name)}
            />
            <label htmlFor={`${id}-radio`}>{name}</label>
        </li>
    );
}

export default FilteringSearchingItem;