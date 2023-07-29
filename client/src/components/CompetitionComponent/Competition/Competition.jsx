import React from "react";

const Competition = () => {
    return (
        <div className="competitions__event event-competitions">
            <div className="event-competitions__title">Все против всех DE</div>
            <div className="event-competitions__date">21.08.2023</div>
            <div className="event-competitions__time">20:00</div>
            <div className="event-competitions__btns">
                <button className="event-competitions__list">Заявки</button>
                <button className="event-competitions__follow">
                    Записаться
                </button>
            </div>
        </div>
    );
};

export default Competition;
