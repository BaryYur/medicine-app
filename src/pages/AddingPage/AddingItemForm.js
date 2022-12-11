import React, { useContext, useEffect, useState } from "react";

import MedicineItemsContext from "../../context/medicine-items-context";

import "./AddingItemForm.css";

const AddingItemForm = ({category}) => {
    const medicineCtx = useContext(MedicineItemsContext);
    const [numberOfTablets, setNumberOfTablets] = useState(true);
    const [imageInput, setImageInput] = useState("");
    const [activeSubmitBtn, setActiveSubmitBtn] = useState(false);
    const [nameInput, setNameInput] = useState("");
    const [producingCountryInput, setProducingCountryInput] = useState("");
    const [allGoodsInput, setAllGoodsInput] = useState("");
    const [activeSubstanceInput, setActiveSubstanceInput] = useState("");
    const [dosageInput, setDosageInput] = useState("");
    const [quantityInput, setQuantityInput] = useState("");
    const [numberOfTabletsInput, setNumberOfTabletsInput] = useState("");
    const [priceInput, setPriceInput] = useState("");
    const [volumeInput, setVolumeInput] = useState("");
    const [manufactureInput, setManufactureInput] = useState("");

    useEffect(() => {
        if (category === "pill") {
            setNumberOfTablets(true)
        } else {
            setNumberOfTablets(false);
        }

        let active = nameInput !== ""
            && imageInput !== ""
            && producingCountryInput !== ""
            && allGoodsInput !== ""
            && activeSubstanceInput !== ""
            && dosageInput !== ""
            && priceInput !== ""
            && quantityInput !== ""
            && manufactureInput !== ""


        if (category === "pill") {
            if (active && numberOfTabletsInput!== "") {
                setActiveSubmitBtn(false);
            } else {
                setActiveSubmitBtn(true);
            }
        } else {
            if (active && volumeInput !== "") {
                setActiveSubmitBtn(false);
            } else {
                setActiveSubmitBtn(true);
            }
        }

    }, [
        category,
        activeSubmitBtn,
        nameInput,
        producingCountryInput,
        allGoodsInput,
        activeSubstanceInput,
        dosageInput,
        priceInput,
        quantityInput,
        manufactureInput,
        numberOfTabletsInput,
        volumeInput,
        imageInput,
    ])

    const imageUploadedHandler = (e) => {
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImageInput(reader.result);
        }
    }

    const submitNewItemHandler = async (event) => {
        event.preventDefault();

        let body = {
            activeSubstances: activeSubstanceInput,
            allGoods: allGoodsInput,
            dosage: dosageInput,
            manufacturer: manufactureInput,
            name: nameInput,
            file: imageInput,
            price: Number(priceInput),
            producingCountry: producingCountryInput,
            quantity: Number(quantityInput),
            releaseForm: category.toUpperCase(),
            termsOfSale: "BY_PRESCRIPTION",
        }

        if (category === "pill") {
            body = {
                ...body,
                numberOfTablets: numberOfTabletsInput,
            }
        } else if (category === "gel") {
            body = {
                ...body,
                weight: Number(volumeInput),
            }
        } else {
            body = {
                ...body,
                volume: Number(volumeInput),
            }
        }

        medicineCtx.fetchingNewCategoryItem(category, body);
        setActiveSubmitBtn(true);

        setNameInput("");
        setProducingCountryInput("");
        setAllGoodsInput("");
        setActiveSubstanceInput("");
        setDosageInput("");
        setPriceInput("");
        setQuantityInput("");
        setManufactureInput("");
        setNumberOfTabletsInput("");
        setVolumeInput("");
        setImageInput("");
    }

    return (
           <form onSubmit={submitNewItemHandler} encType="multipart/form-data" id="myForm">
               <div className="input-box">
                   <label>Name:</label>
                   <input
                       type="text"
                       value={nameInput}
                       onChange={(e) => setNameInput(e.target.value)}
                   />
               </div>
               <div className="input-box">
                   <label>Producing country:</label>
                   <input
                       type="text"
                       value={producingCountryInput}
                       onChange={(e) => setProducingCountryInput(e.target.value)}
                   />
               </div>
               <div className="input-box">
                   <label>All goods:</label>
                   <input
                       type="text"
                       value={allGoodsInput}
                       onChange={(e) => setAllGoodsInput(e.target.value)}
                   />
               </div>
               <div className="input-box">
                   <label>Manufacture:</label>
                   <input
                       type="text"
                       value={manufactureInput}
                       onChange={(e) => setManufactureInput(e.target.value)}
                   />
               </div>
               <div className="input-box">
                   <label>Active substance:</label>
                   <input
                       type="text"
                       value={activeSubstanceInput}
                       onChange={(e) => setActiveSubstanceInput(e.target.value)}
                   />
               </div>
               <div className="inputs-with-numbers">
                   <div className="input-box">
                       <label>Dosage:</label>
                       <input
                           type="number"
                           min="0"
                           value={dosageInput}
                           onChange={(e) => setDosageInput(e.target.value)}
                       />
                   </div>
                   <div className="input-box">
                       <label>Quantity:</label>
                       <input
                           type="number"
                           min="0"
                           value={quantityInput}
                           onChange={(e) => setQuantityInput(e.target.value)}
                       />
                   </div>
                   <div className="input-box">
                       <label>Price:</label>
                       <input
                           type="number"
                           min="0"
                           value={priceInput}
                           onChange={(e) => setPriceInput(e.target.value)}
                       />
                   </div>
                   {numberOfTablets && <div className="input-box">
                       <label>Number of tablets:</label>
                       <input
                           type="number"
                           min="0"
                           value={numberOfTabletsInput}
                           onChange={(e) => setNumberOfTabletsInput(e.target.value)}
                       />
                   </div>}
                   {!numberOfTablets && <div className="input-box">
                       <label>Volume:</label>
                       <input
                           type="number"
                           min="0"
                           value={volumeInput}
                           onChange={(e) => setVolumeInput(e.target.value)}
                       />
                   </div>}
               </div>
               <div className="input-box">
                   <label style={{ display: "inline", marginRight: "5px", }}>Image:</label>
                   <input
                       id="imageUploader"
                       type="file"
                       name="image"
                       onChange={imageUploadedHandler}
                   />
               </div>
               {!medicineCtx.loading &&
                   <button
                       type="submit"
                       disabled={activeSubmitBtn}
                       variant="contained"
                    >Add new one</button>
               }
               {medicineCtx.loading && <p className="adding-loading">Sending request...</p>}
           </form>
    );
}

export default AddingItemForm;