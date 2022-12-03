import { Link } from "react-router-dom";

import { Card } from "@mui/material";

import "./MainLinkCard.css";

const MainLinkCard = ({ title, link, img }) => {
    return (
        <div className="category-card">
            <Link to={`${link}`}>
                <Card
                    sx={{
                        width: 250,
                        height: 250,
                        margin: "5px",
                    }}
                    className="card"
                >
                    <div className="card-wrapper"></div>
                    <img src={img} alt="category" />
                </Card>
            </Link>
            <p>{title}</p>
        </div>
    );
}

export default MainLinkCard;