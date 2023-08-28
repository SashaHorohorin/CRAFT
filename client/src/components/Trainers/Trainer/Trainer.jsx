import React from "react";

const Trainer = ({trainer}) => {
    return (
        <div className="trainer__card card-trainer">
            <div className="card-trainer__img">
                <img src={trainer.photoURL} alt="" />
            </div>
            <div className="card-trainer__info info-trainer">
                <div className="info-trainer__name">{trainer.name}</div>
                <div className="info-trainer__text">
                    {trainer.textFront}
                </div>
            </div>
        </div>
    );
};

export default Trainer;
