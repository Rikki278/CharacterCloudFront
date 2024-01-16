import React from 'react';
import MasonryLayout from "./masonryLayout";

function CardWrapper({className}) {

    return (
        <div className={className}>
            <MasonryLayout/>
        </div>
    );
}

export default CardWrapper;