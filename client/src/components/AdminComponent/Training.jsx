import React, { useState } from "react";

const Training = () => {
    const [flagMenu, setFlagMenu] = useState(false);

    return (
        <div className="admin__item item-admin">
            <div className="item-admin__name">Тренировка</div>
            <div className="item-admin__people">7/10</div>
            <div className="item-admin__trainer">Хорохорин Александр</div>
            <div className="item-admin__date">21.08.2001</div>
            <div className="item-admin__time">19:30-21:30</div>
            <div onClick={() => setFlagMenu(true)} className="item-admin__func">
                <img src="./images/CompetitionPage/dots.svg" alt="" />
            </div>
            <div className={flagMenu ? "item-admin__more more-item active" : "item-admin__more more-item"}>
                <div className="more-item__header">
                    <div className="more-item__edit">Изменить</div>
                    <div onClick={() => setFlagMenu(false)} className="more-item__close">
                        <img src="./images/CompetitionPage/close.svg" alt="" />
                    </div>
                </div>
                <div className="more-item__delete">Удалить</div>
            </div>
        </div>
    );
};

export default Training;
