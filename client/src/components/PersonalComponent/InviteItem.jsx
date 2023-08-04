import React from "react";

const InviteItem = ({ type }) => {
    return (
        <div className="invite-pair__item item-invite">
            <div className="item-invite__title">Все против всех DE</div>
            <div className="item-invite__date date-item">
                <div className="date-item__label">Дата:</div>
                <div className="date-item__date">21.08.2023</div>
            </div>
            <div className="item-invite__time time-item">
                <div className="time-item__label">Время:</div>
                <div className="time-item__time">19:30</div>
            </div>
            <div className="item-invite__label">{type == "invite" ? `Приглашение от:` : `Приглашение кому:`}</div>
            <div className="item-invite__name">Хорохорин Александр</div>
            <div className={type == "invite" ? "item-invite__btns btns-item" : "item-invite__btns btns-join"}>
                {type == "invite" ? (
                    <>
                        <div className="btns-item__btn">Принять</div>
                        <div className="btns-item__btn">Отклонить</div>
                    </>
                ) : (
                    <div className="btns-join__btn">Отклонить</div>
                )}
            </div>
        </div>
    );
};

export default InviteItem;
