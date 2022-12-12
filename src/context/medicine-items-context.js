import React, { useEffect, useState } from "react";

import Swal from "sweetalert2";

const MedicineItemsContext = React.createContext({
    addToCart: (id, category) => {},
    deleteFromCart: (id) => {},
    fetchingCategoryData: (category) => {},
    fetchingSearchingItems: (word) => {},
    fetchingSearchingFiltering: (category, name) => {},
    fetchingCategoryFiltering: (category, name) => {},
    fetchingNewCategoryItem: (category, body) => {},
    deleteMedicineItemFromServer: (category, id) => {},
    effectData: () => {},
});

export const MedicineItemsContextProvider = ({ children }) => {
    const [pillsItems, setPillsItems] = useState([]);
    const [tinctureItems, setTinctureItems] = useState([]);
    const [mixtureItems, setMixtureItems] = useState([]);
    const [gelItems, setGelItems] = useState([]);
    const [pillsFilteringNames, setPillsFilteringNames] = useState([]);
    const [tinctureFilteringNames, setTinctureFilteringNames] = useState([]);
    const [mixtureFilteringNames, setMixtureFilteringNames] = useState([]);
    const [gelFilteringNames, setGelFilteringNames] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [searchingItems, setSearchingItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filteringLoading, setFilteringLoading] = useState(false);

    const addToCartHandler = (id, category) => {
        if (category === "PILL") {
            addNeededItemToCart(id, pillsItems);
        } else if (category === "TINCTURE") {
            addNeededItemToCart(id, tinctureItems);
        } else if (category === "SOLUTION") {
            addNeededItemToCart(id, mixtureItems);
        } else if (category === "GEL") {
            addNeededItemToCart(id, gelItems);
        }
    }

    const addNeededItemToCart = (id, neededItems) => {
        for (let item of neededItems) {
            if (item.id === id) {
                setCartItems(prevItem => {
                    return [ ...prevItem, item ];
                })
            }
        }
    }

    const fetchingCategoryData = (category) =>  {
        setLoading(true);

        if (localStorage.getItem("token")) {
            fetch(`https://api-apteka.herokuapp.com/${category}`, {
                method: "GET",
                headers: {
                    Authorization: localStorage.getItem("token"),
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (category === "pill") {
                        setPillsItems(data);
                    } else if (category === "tincture") {
                        setTinctureItems(data);
                    } else if (category === "solution") {
                        setMixtureItems(data);
                    } else if (category === "gel") {
                        setGelItems(data);
                    }

                    setLoading(false);
                })
                .catch(error => {
                    setLoading(false);
                })
        }
    }

    const deleteItemFromCartHandler = (id) => {
        setCartItems(cartItems.filter(cartItem => cartItem.id !== id));
    }

    const fetchingSearchingItems = (word) => {
        setLoading(true);

        if (localStorage.getItem("token")) {
            fetch(`https://api-apteka.herokuapp.com/search/${word}`, {
                method: "GET",
                headers: {
                    Authorization: localStorage.getItem("token"),
                }
            })
                .then(response => response.json())
                .then(data => {
                    setSearchingItems(data);
                    setLoading(false);
                })
                .catch(error => {
                    // alert(error);
                    setLoading(false);
                })
        }
    }

    const fetchingSearchingFiltering = (category, name) => {
        setLoading(true);

        if (name !== "all") {
            fetch(`https://api-apteka.herokuapp.com/${category}/byName/${name}`, {
                method: "GET",
                headers: {
                    Authorization: localStorage.getItem("token"),
                }
            })
                .then(response => response.json())
                .then(data => {
                    setSearchingItems(data);
                    setLoading(false);
                })
                .catch(error => {
                    // alert(error);
                    setLoading(false);
                })
        } else {
            fetch(`https://api-apteka.herokuapp.com/search/${name}`, {
                method: "GET",
                headers: {
                    Authorization: localStorage.getItem("token"),
                }
            })
                .then(response => response.json())
                .then(data => {
                    setSearchingItems(data);
                    setLoading(false);
                })
                .catch(error => {
                    // alert(error);
                    setLoading(false);
                })
        }
    }

    const fetchingCategoryFilteringNames = (category) => {
        setFilteringLoading(true);

        if (localStorage.getItem("token")) {
            fetch(`https://api-apteka.herokuapp.com/${category}/allGoods`, {
                method: "GET",
                headers: {
                    Authorization: localStorage.getItem("token"),
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (category === "pill") {
                        setPillsFilteringNames(data);
                    } else if (category === "tincture") {
                        setTinctureFilteringNames(data);
                    } else if (category === "solution") {
                        setMixtureFilteringNames(data);
                    } else if (category === "gel") {
                        setGelFilteringNames(data);
                    }

                    setFilteringLoading(false);
                })
                .catch(error => {
                    setFilteringLoading(false);
                } )
        }
    }

    const fetchingCategoryFiltering = (category, name) => {
        setLoading(true);

        if (name === "All") {
            fetchingCategoryData(category);
        } else {
            fetch(`https://api-apteka.herokuapp.com/${category}/byAllGoods/${name}`, {
                method: "GET",
                headers: {
                    Authorization: localStorage.getItem("token"),
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (category === "pill") {
                        setPillsItems(data);
                    } else if (category === "tincture") {
                        setTinctureItems(data);
                    } else if (category === "solution") {
                        setMixtureItems(data);
                    } else if (category === "gel") {
                        setGelItems(data);
                    }

                    setLoading(false);
                })
                .catch(error => {
                    if (category === "pill") {
                        setPillsItems([]);
                    } else if (category === "tincture") {
                        setTinctureItems([]);
                    } else if (category === "solution") {
                        setMixtureItems([]);
                    } else if (category === "gel") {
                        setGelItems([]);
                    }

                    setLoading(false);
                })
        }
    }

    const fetchingNewCategoryItem = (category, body) => {
        setLoading(true);

        fetch(`https://api-apteka.herokuapp.com/${category}`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                Authorization: localStorage.getItem("token"),
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return res.json().then((data) => {
                        let errorMessage = "Adding failed!";

                        throw new Error(errorMessage);
                    });
                }

                setLoading(false);
                Swal.fire({
                    title: "Great",
                    text: "You successful add new medicine item",
                    icon: "success",
                    width: 460,
                    height: 400,
                })
            })
            .catch(error => {
                setLoading(false);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                    width: 460,
                    height: 400,
                })
            })
    }

    const deleteMedicineItemFromServer = async (category, id) => {
        await fetch(`https://api-apteka.herokuapp.com/${category}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                Authorization: localStorage.getItem("token")
            },
        })
            .catch(error => {
                setLoading(false);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                    width: 460,
                    height: 400,
                })
            })
    }

    const filteringCategoryItems = JSON.parse(localStorage.getItem("filteringCategory"));

    const effectData = () => {
        if (filteringCategoryItems[0].filteringName === "All") {
            fetchingCategoryData("pill");
        } else {
            fetchingCategoryFiltering("pill", filteringCategoryItems[0].filteringName);
        }

        if (filteringCategoryItems[1].filteringName === "All") {
            fetchingCategoryData("tincture");
        } else {
            fetchingCategoryFiltering("tincture", filteringCategoryItems[1].filteringName);
        }

        if (filteringCategoryItems[2].filteringName === "All") {
            fetchingCategoryData("solution");
        } else {
            fetchingCategoryFiltering("solution", filteringCategoryItems[2].filteringName);
        }

        if (filteringCategoryItems[3].filteringName === "All") {
            fetchingCategoryData("gel");
        } else {
            fetchingCategoryFiltering("gel", filteringCategoryItems[3].filteringName);
        }

        fetchingCategoryFilteringNames("pill");
        fetchingCategoryFilteringNames("tincture");
        fetchingCategoryFilteringNames("solution");
        fetchingCategoryFilteringNames("gel");
        fetchingSearchingItems(JSON.parse(localStorage.getItem("search")));
    }

    useEffect(() => {
        effectData();
    }, [])

    const contextValue = {
        pillsItems: pillsItems,
        tinctureItems: tinctureItems,
        mixtureItems: mixtureItems,
        gelItems: gelItems,
        pillsFilteringNames: pillsFilteringNames,
        tinctureFilteringNames: tinctureFilteringNames,
        mixtureFilteringNames: mixtureFilteringNames,
        gelFilteringNames: gelFilteringNames,
        cartItems: cartItems,
        searchingItems: searchingItems,
        addToCart: addToCartHandler,
        deleteFromCart: deleteItemFromCartHandler,
        fetchingCategoryData: fetchingCategoryData,
        fetchingSearchingItems: fetchingSearchingItems,
        fetchingSearchingFiltering: fetchingSearchingFiltering,
        fetchingCategoryFiltering: fetchingCategoryFiltering,
        fetchingNewCategoryItem: fetchingNewCategoryItem,
        deleteMedicineItemFromServer: deleteMedicineItemFromServer,
        loading: loading,
        filteringLoading: filteringLoading,
        effectData: effectData,
    }

    return (
        <MedicineItemsContext.Provider value={contextValue}>
            {children}
        </MedicineItemsContext.Provider>
    )
}

export default MedicineItemsContext;