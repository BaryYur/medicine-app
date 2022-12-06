import React, { useState } from "react";

import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import "./CategoriesMenu.css";

const CategoriesMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="categories-menu-box">
            <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                variant="contained"
                style={{ marginRight: "15px" }}
                endIcon={<KeyboardArrowDownIcon />}
                size="small"
            >
                Categories
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{ "aria-labelledby": "basic-button" }}
                style={{ marginTop: "5px" }}
            >
                <MenuItem style={{ width: "124px" }} onClick={handleClose}>
                    <Link style={{ color: "#464646", display: "block", width: "100%" }} to="/pill">Pills</Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Link style={{ color: "#464646", display: "block", width: "100%" }} to="/tincture">Tincture</Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Link style={{ color: "#464646", display: "block", width: "100%" }} to="/mixture">Mixture</Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Link style={{ color: "#464646", display: "block", width: "100%" }} to="/gel">Gel</Link>
                </MenuItem>
            </Menu>
        </div>
    );
}

export default CategoriesMenu;