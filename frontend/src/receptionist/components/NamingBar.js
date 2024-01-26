import React, { useEffect, useState } from "react";


const NamingBar=({name})=>{
    

    return(
        <div id="namingBar-container">
            <p id="name-in-namingBar">{name}</p>
        </div>
    )
}
export default NamingBar;