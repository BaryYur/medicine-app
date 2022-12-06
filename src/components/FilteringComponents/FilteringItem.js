import React, { useContext, useEffect, useState } from "react";

import MedicineItemsContext from "../../context/medicine-items-context";

import "./FilteringItem.css";

const FilteringItem = ({name, id, category}) => {
    const medicineCtx = useContext(MedicineItemsContext);
    const [checkedRadio, setCheckedRadio] = useState(false);

    const checkingHandler = () => {
        let filtering = JSON.parse(localStorage.getItem("filteringCategory"));

        for (let item of filtering) {
            if (item.filteringName === name && item.category === category) {
                setCheckedRadio(true);
            }
        }
    }

    const filterCategoryHandler = (name) => {
        setCheckedRadio(true);
        let filtering = JSON.parse(localStorage.getItem("filteringCategory"));

        for (let item of filtering) {
            if (item.category === category) {
                item.filteringName = name;
            }

            localStorage.setItem("filteringCategory", JSON.stringify(filtering));
        }

        medicineCtx.fetchingCategoryFiltering(category, name);
        checkingHandler();
    }

    useEffect(() => {
        checkingHandler();
    }, [])

    return (
        <li className="filtering-category-item">
            <input
                id={`${id}-radio`}
                type="radio"
                style={{ color: "#50C878", }}
                name="radio-filtering-category-btn"
                checked={checkedRadio}
                onChange={checkingHandler}
                onClick={() => filterCategoryHandler(name)}
            />
            <label htmlFor={`${id}-radio`}>{name}</label>
        </li>
    );
}

export default FilteringItem;