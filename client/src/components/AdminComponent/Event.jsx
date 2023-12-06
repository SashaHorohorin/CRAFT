import React, { useState } from "react";

const Event = ({deleteEvent, changeModalOpen, event}) => {
    const [flagMenu, setFlagMenu] = useState(false);
    const getDateYear = (date) => {
        let d = new Date(date);
        let time = `${d.getDate() < 10 ? `0${d.getDate()}` : d.getDate()}.${d.getMonth() < 9 ? `0${d.getMonth() + 1}` : d.getMonth() + 1}.${d.getFullYear()}`;
        return time;
    };

    const getTime = (date) => {
        let d = new Date(date);
        let time = `${d.getHours() < 10 ? `0${d.getHours()}`:d.getHours()}:${d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes()}`;
        return time;
    };
    return (
        <div className="admin-event">
            <div className="admin-event__header">
                <div className="admin-event__lable">
                    {event?.type}
                </div>
                <div
                    onClick={() => setFlagMenu(true)}
                    className="item-admin__func"
                >
                    <img src="../images/CompetitionPage/dots.svg" alt="" />
                </div>
            </div>
            <div className="admin-event__title">
                {event?.title}
            </div>
            <div className="admin-event__timelab">
                <div className="admin-event__date">{getDateYear(event?.createdDate)}</div>
                <div className="admin-event__time">{getTime(event?.createdDate)}</div>
            </div>
            <div onClick={() => setFlagMenu(false)} className={flagMenu ? "item-admin__more more-item change-event active" : "item-admin__more more-item change-event"}>
                <div className="more-item__header">
                    <div onClick={() => changeModalOpen()} className="more-item__edit">Изменить</div>
                    <div onClick={() => setFlagMenu(false)} className="more-item__close">
                        <img src="../images/CompetitionPage/close.svg" alt="" />
                    </div>
                </div>
                <div onClick={() => deleteEvent(event.id)} className="more-item__delete">Удалить</div>
            </div>
        </div>
    );
};

export default Event;
