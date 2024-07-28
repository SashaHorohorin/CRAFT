import React, { useState } from 'react'

const Coach = ({coach, deleteCoach, changeModalOpen}) => {
    const [flagMenu, setFlagMenu] = useState(false);

    return (
        <div className="admin__item item-admin">
            <div className="item-admin__name">{coach.name}</div>
            <div onClick={() => setFlagMenu(true)} className="item-admin__func">
                <img src="../images/CompetitionPage/dots.svg" alt="" />
            </div>
            <div className={flagMenu ? "item-admin__more more-item active" : "item-admin__more more-item"}>
                <div className="more-item__header">
                    <div onClick={() => changeModalOpen(coach?.id, coach)} className="more-item__edit">Изменить</div>
                    <div onClick={() => setFlagMenu(false)} className="more-item__close">
                        <img src="../images/CompetitionPage/close.svg" alt="" />
                    </div>
                </div>
                <div onClick={() => deleteCoach(coach?.id)} className="more-item__delete">Удалить</div>
            </div>
        </div>
    );
}

export default Coach