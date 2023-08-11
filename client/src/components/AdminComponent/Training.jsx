import React, { useState } from "react";

const Training = ({deleteTrain, train, changeModalOpen}) => {
    const [flagMenu, setFlagMenu] = useState(false);
    const getDateYear = (date) => {
        let d = new Date(date);
        let time = `${d.getDate() < 10 ? `0${d.getDate()}` : d.getDate()}.${d.getMonth() < 9 ? `0${d.getMonth() + 1}` : d.getMonth() + 1}.${d.getFullYear()}`;
        return time;
    };

    const getTime = (date) => {
        let d = new Date(date);
        let time = `${d.getHours()}:${d.getMinutes()}`;
        return time;
    };

    return (
        <div className="admin__item item-admin">
            <div className="item-admin__name">{train.type}</div>
            <div className="item-admin__people">{train.nowParticipant}/{train.maxParticipant}</div>
            <div className="item-admin__trainer">{train.trainers[0]?.name}</div>
            <div className="item-admin__date">{getDateYear(train.startTrain)}</div>
            <div className="item-admin__time">{`${getTime(train.startTrain)}-${getTime(train.endTrain)}`}</div>
            <div onClick={() => setFlagMenu(true)} className="item-admin__func">
                <img src="./images/CompetitionPage/dots.svg" alt="" />
            </div>
            <div className={flagMenu ? "item-admin__more more-item active" : "item-admin__more more-item"}>
                <div className="more-item__header">
                    <div onClick={() => changeModalOpen(train.id, train)} className="more-item__edit">Изменить</div>
                    <div onClick={() => setFlagMenu(false)} className="more-item__close">
                        <img src="./images/CompetitionPage/close.svg" alt="" />
                    </div>
                </div>
                <div onClick={() => deleteTrain(train.id)} className="more-item__delete">Удалить</div>
            </div>
        </div>
    );
};

export default Training;
