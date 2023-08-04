import React from "react";

const PeopleAction = ({classAdd, sportsmens}) => {
    // console.log(sportsmens);
    return (
        <div className={classAdd ? `actions-workout__people people-actions ${classAdd}` : `actions-workout__people people-actions`}>
            <div className="people-actions__circles">
                <div className="people-actions__circle"></div>
                <div className="people-actions__circle"></div>
                <div className="people-actions__circle"></div>
            </div>
            <div className="people-actions__count count-people">
                <div className="count-people__title">{`и еще ${sportsmens?.length} человек`}</div>
                <div className="count-people__text">пойдут на тренировку</div>
            </div>
        </div>
    );
};

export default PeopleAction;
