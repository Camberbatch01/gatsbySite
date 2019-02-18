import React from "react"
import "../components/styles/banner.scss"

const pageInfo = (name, desc) => {
    return (
        <div className="banner">
            <h1>{name}</h1>
            <p>{desc}</p>
        </div>
    );
}

export default pageInfo;