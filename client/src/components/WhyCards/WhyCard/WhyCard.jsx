import React, { useState } from "react";
import Button from "../../UI/Button/Button";
import "./WhyCard.scss";

const WhyCard = ({ card, classChange }) => {
    const [flagRotate, setFlagRotate] = useState(false);

    return (
        <div
            onClick={() => setFlagRotate(!flagRotate)}
            className={
                flagRotate
                    ? `why-club__card card ${classChange} active`
                    : `why-club__card card ${classChange}`
            }
        >
            <div className={`card__front ${classChange}`}>
                <div className={`card__img ${classChange}`}>
                    <img src={card?.photoURL} alt="" />
                </div>
                <div className={`card__content content-card-${classChange}`}>
                    <div className={`content-card-${classChange}__title`}>
                        {card?.titleFront}
                    </div>
                    {classChange === 'left' ? <div className={`content-card-${classChange}__text`}>{card?.textFront}</div> : ''}
                    
                    <Button
                        text="Подробнее"
                        classAdd={`content-card-${classChange}__btn`}
                    />
                </div>
            </div>
            <div className="card__back back-card">
                <div className="back-card__title">{card?.titleBack}</div>
                <div className="back-card__text">{card?.textBack}</div>
            </div>
        </div>
    );
};

export default WhyCard;
