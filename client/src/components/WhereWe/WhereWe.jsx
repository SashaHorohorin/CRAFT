import React, { useState } from "react";
import "./WhereWe.scss";
import MapYandex from "./MapYandex/MapYandex";
import Button from "../UI/Button/Button";

const WhereWe = () => {
    return (
        <div className="where">
            <div className="container">
                <div className="where__title">Как нас найти?</div>

                <div className="where__row">
                    <MapYandex />
                </div>
                <div className="where__btns">
                    <Button
                        text="Записаться на пробную тренировку"
                        classAdd="where__btn"
                    />
                    <Button
                        text="Записаться тренировку"
                        classAdd="where__btn"
                    />
                </div>
            </div>
        </div>
    );
};

export default WhereWe;
