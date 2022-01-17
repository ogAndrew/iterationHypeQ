import React, { useState } from "react";
import Card from "../components/Card.js"

function List({ allMedia }) { 
    const components = allMedia.map(obj => {
        return (
            <div>
                <Card media_id={obj.media_id} title={obj.title} category={obj.category} duration={obj.duration} priority={obj.priority} url={obj.url} user_id={obj.user_id}/>
            </div>
        // <div>{obj.title}</div></h1 >))
        )
    });

    return ( 
        <div>
            <h2>All Media Items</h2>
            <div className="flex-container">
                <h3>{components}</h3>
            </div>
        </div>
    )
};

export default List;