import React from "react";
import "./CompetitionsPage.scss";
import Competition from "../../components/CompetitionComponent/Competition/Competition";

const СompetitionsPage = () => {
    return (
        <div className="competitions">
            <div className="container">
                <div className="competitions__container">
                    <div className="competitions__title">Соревнования</div>
                    <div className="competitions__row">
                        
                        <Competition/>
                        <Competition/>
                        <Competition/>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default СompetitionsPage;
