import React, { useState } from 'react'

const Competition = ({deleteTrain, competition, changeModalOpen}) => {
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
        <div className="admin__item item-admin">
            <div className="item-admin__name">{competition?.type}</div>
            <div className="item-admin__people">{`${competition?.nowParticipant}/${competition?.maxParticipant}`}</div>
            <div className="item-admin__date">{getDateYear(competition?.startCompetition)}</div>
            <div className="item-admin__time">{`${getTime(competition?.startCompetition)}`}</div>
            <div onClick={() => setFlagMenu(true)} className="item-admin__func">
                <img src="../images/CompetitionPage/dots.svg" alt="" />
            </div>
            <div className={flagMenu ? "item-admin__more more-item active" : "item-admin__more more-item"}>
                <div className="more-item__header">
                    <div onClick={() => changeModalOpen(competition?.id, competition)} className="more-item__edit">Изменить</div>
                    <div onClick={() => setFlagMenu(false)} className="more-item__close">
                        <img src="../images/CompetitionPage/close.svg" alt="" />
                    </div>
                </div>
                <div onClick={() => deleteTrain(competition?.id)} className="more-item__delete">Удалить</div>
            </div>
        </div>
    );
}

export default Competition