import React, { useEffect } from "react";
import fly from "../../../script";
import './Shuttlecocks.scss'

const Shuttlecocks = () => {
    useEffect(() => {
        window.addEventListener('load', function(){
          fly();
        });
    });
    return (
        <div className="containerBall">
            <div id="ball"></div>
            <div id="ball2"></div>
        </div>
    );
};

export default Shuttlecocks;
