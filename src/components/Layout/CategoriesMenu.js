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
                <Link style={{ width: "140px", }} onClick={handleClose} to="/pill">
                    <MenuItem style={{ color: "#464646", display: "block", width: "120px", }}>Pills</MenuItem>
                </Link>
                <Link onClick={handleClose} to="/tincture">
                    <MenuItem style={{ color: "#464646", display: "block", width: "120px", }}>Tincture</MenuItem>
                </Link>
                <Link onClick={handleClose} to="/solution">
                    <MenuItem style={{ color: "#464646", display: "block", width: "120px", }}>Solution</MenuItem>
                </Link>
                <Link onClick={handleClose} to="/gel">
                    <MenuItem style={{ color: "#464646", display: "block", width: "120px", }}>Gel</MenuItem>
                </Link>
            </Menu>
        </div>
    );
}

export default CategoriesMenu;