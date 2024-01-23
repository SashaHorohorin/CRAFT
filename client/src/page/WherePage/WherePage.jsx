import React from "react";
import MapYandex from "../../components/WhereWe/MapYandex/MapYandex";

const WherePage = () => 
        <div className="where where-page">
            <div className="container">
                <div className="where__title">Как нас найти?</div>

                <div className="where__row">
                    <MapYandex type='page'/>
                </div>
            </div>
        </div>


export default WherePage;
