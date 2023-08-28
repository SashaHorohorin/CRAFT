import React, { useContext, useState } from "react";
import "./WhereWe.scss";
import MapYandex from "./MapYandex/MapYandex";
import Button from "../UI/Button/Button";
import { Link } from "react-router-dom";
import { Context } from "../..";
import { observer } from "mobx-react-lite";

const WhereWe = () => {
    const { eventStore } = useContext(Context);
    return (
        <div className="where">
            <div className="container">
                <div className="where__title">Как нас найти?</div>

                <div className="where__row">
                    <MapYandex />
                </div>
                <div className="where__btns">
                    <Link
                        to='training'
                        onClick={() => eventStore.setFlagOpenModalSale(true)}
                        className="where__btn btn"
                    >Записаться на пробную тренировку</Link>
                    <Link
                        to='training'
                        className="where__btn btn"
                    >Записаться тренировку</Link>
                </div>
            </div>
        </div>
    );
};

export default observer(WhereWe);
