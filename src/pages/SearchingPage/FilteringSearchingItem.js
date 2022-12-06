import React, {useState, useEffect, useContext} from "react";

import MedicineItemsContext from "../../context/medicine-items-context";

const FilteringSearchingItem = ({ name, id, category }) => {
    const medicineCtx = useContext(MedicineItemsContext);
    let localSearchingFiltering = JSON.parse(localStorage.getItem("filteringSearching"));
    const [checkedSearchingRadio, setCheckedSearchingRadio] = useState(false);

    const filterSearchingCategoryHandler = (category) => {
        setCheckedSearchingRadio(true);
        localStorage.setItem("filteringSearching", JSON.stringify(category));

        if (localSearchingFiltering === category) {
            setCheckedSearchingRadio(true);
        }

        medicineCtx.fetchingSearchingFiltering(category, name);
    }

    useEffect(() => {
        if (!localSearchingFiltering) {
            localStorage.setItem("filteringSearching", JSON.stringify("all"));
        }

        if (localSearchingFiltering === category) {
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
                    if (localSearchingFiltering === category) {
                        setCheckedSearchingRadio(true);
                    }
                }}
                onClick={() => filterSearchingCategoryHandler(category, name)}
            />
            <label htmlFor={`${id}-radio`}>{category}</label>
        </li>
    );
}

export default FilteringSearchingItem;