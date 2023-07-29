import React from "react";

const PeopleAction = () => {
    return (
        <div className="actions-workout__people people-actions">
            <div className="people-actions__circles">
                <div className="people-actions__circle"></div>
                <div className="people-actions__circle"></div>
                <div className="people-actions__circle"></div>
            </div>
            <div className="people-actions__count count-people">
                <div className="count-people__title">и еще 7 человек</div>
                <div className="count-people__text">пойдут на тренировку</div>
            </div>
        </div>
    );
};

export default PeopleAction;
