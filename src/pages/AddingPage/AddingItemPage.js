import React, { useState } from "react";

import AddingItemForm from "./AddingItemForm";
import "./AddingItemPage.css";

const AddingItemPage = () => {
    const categories = ["pill", "solution", "tincture", "gel"];
    const [chosenCategory, setChosenCategory] = useState(categories[0]);

    return (
        <div className="main-wrapper">
            <div className="adding-form-container">
                <h3>What do you want to add?</h3>
                <ul>
                    {categories.map(name => (
                        <li key={Math.random()}>
                            <input
                                id={`${name}-add`}
                                name="adding-radio"
                                checked={name === chosenCategory}
                                onChange={() => {
                                    setChosenCategory(name)
                                }}
                                type="radio"
                            />
                            <label htmlFor={`${name}-add`}>{name}</label>
                        </li>
                    ))}
                </ul>
                <AddingItemForm
                    category={chosenCategory}
                />
            </div>
        </div>
    );
}

export default AddingItemPage;