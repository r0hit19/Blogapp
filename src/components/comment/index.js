import React from "react";
import "./style.css";

export default function Comment({username,caption,email}){
    return <div className="comment">
          <p style={{marginTop:"10px"}}>
            <span style={{fontWeight:"500",marginRight:"8px"}} >{username}  :</span>
            <p style={{color:"maroon",backgroundColor:"white", padding:"5px 10px",marginTop:"10px"}}>"{caption}"</p>
        </p>  
    </div>;
}