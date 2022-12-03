import React from "react";

import MedicineItemCard from "./MedicineItemCard";

const MedicineItemsList = ({ data }) => {
    return (
        <div className="list-of-medicine-items-container">
            <ul>
                {data.map(medicineItem => (
                    <li key={medicineItem.id}>
                        <MedicineItemCard
                            id={medicineItem.id}
                            title={medicineItem.name}
                            price={medicineItem.price}
                            // img={medicineItem.img}
                            link={`/${medicineItem.releaseForm.toLowerCase()}/${medicineItem.id}`}
                            category={medicineItem.releaseForm}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MedicineItemsList;