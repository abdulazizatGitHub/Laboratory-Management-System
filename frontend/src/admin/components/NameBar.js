import React from 'react';
import "../css/NameBar.css";

const NameBar=({name})=>{
    return(
        <div id="Admin-NameBar">
            <p id='Admin-name'>{name}</p>
        </div>
    )
}

export default NameBar;