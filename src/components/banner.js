import React from "react"

const pageInfo = (name, desc) => {
    return (
        <div className="banner" style={{backgroundColor: 'lightblue'}}>
            <h1>{name}</h1>
            <p>{desc}</p>
        </div>
    );
}

export default pageInfo;