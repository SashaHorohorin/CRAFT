import React, { useContext } from "react";
import { Context } from "../../..";
import { observer } from "mobx-react-lite";

const PeopleAction = ({ classAdd, sportsmens }) => {
    const { eventStore } = useContext(Context);
    // console.log(sportsmens);
    return (
        <>
            <div
                className={`actions-workout__people people-actions ${classAdd}`}
                onClick={(event) => eventStore.coord(event, sportsmens)}
            >
                {/* <div className="people-actions__circles">
                    <div className="people-actions__circle"></div>
                    <div className="people-actions__circle"></div>
                    <div className="people-actions__circle"></div>
                </div> */}
                <div className="people-actions__count count-people">
                    <div className="count-people__title">{`${sportsmens?.length != 1 ? 'Записалось' : 'Записался'} ${sportsmens?.length} ${sportsmens?.length > 1 && sportsmens?.length < 4 ? 'человека' : 'человек'}`}</div>
                    {/* <div className="count-people__text">
                        пойдут на тренировку
                    </div> */}
                </div>
            </div>
            
        </>
    );
};

export default observer(PeopleAction);
