import React from "react";

const InviteItem = ({ type, request, func, setFlag, labId}) => {
    const getDateYear = (date) => {
        let d = new Date(date);
        let time = `${d.getDate() < 10 ? `0${d.getDate()}` : d.getDate()}.${
            d.getMonth() < 10 ? `0${d.getMonth()}` : d.getMonth()
        }.${d.getFullYear()}`;
        return time;
    };

    const getTime = (date) => {
        let d = new Date(date);
        let time = `${d.getHours()}:${d.getMinutes()}`;
        return time;
    };

    const funcAcceptInvite = async() => {
        if(localStorage.getItem('labId') == 'null'){
            setFlag(true)
        }else{
            await func[3](request.pairId, localStorage.getItem('username'));
            // console.log(flagSucces);
        }
    }
    const funcAcceptInviteJoin = async() => {
        if(localStorage.getItem('labId') == 'null'){
            setFlag(true)
        }else{
            await func[2](request.pairId, localStorage.getItem('username'));
            // console.log(flagSucces);
        }
    }

    return (
        <div className="invite-pair__item item-invite">
            <div className="item-invite__title">{request.type + ' ' + request.category}</div>
            <div className="item-invite__date date-item">
                <div className="date-item__label">Дата:</div>
                <div className="date-item__date">
                    {getDateYear(request.startCompetition)}
                </div>
            </div>
            <div className="item-invite__time time-item">
                <div className="time-item__label">Время:</div>
                <div className="time-item__time">
                    {getTime(request.startCompetition)}
                </div>
            </div>
            <div className="item-invite__label">
                {type == "join" ? `Приглашение от:` : `Приглашение кому:`}
            </div>
            <div className="item-invite__name">
                {request.request.firstName + " " + request.request.lastName}
            </div>
            {type == "join" ? (
                <>
                    <div className="item-invite__label">Рейтинг:</div>
                    <div className="item-invite__name">
                        {request.request.rating}
                    </div>
                </>
            ) : null}
            <div
                className={
                    type == "join"
                        ? "item-invite__btns btns-item"
                        : "item-invite__btns btns-join"
                }
            >
                {type == "join" ? (
                    request.typeOfRequest == "INVITE" ? (
                        <>
                            <div onClick={() => funcAcceptInvite()} className="btns-item__btn">Принять</div>
                            <div onClick={() => func[1](request.pairId, localStorage.getItem('username'))} className="btns-item__btn">Отклонить</div>
                        </>
                    ) : (
                        <>
                            <div onClick={() => funcAcceptInviteJoin()} className="btns-item__btn">Принять</div>
                            <div onClick={() => func[0](request.pairId, request.request.username)} className="btns-item__btn">Отклонить</div>
                        </>
                    )
                ) : request.typeOfRequest == "INVITE" ? (
                    <div
                        onClick={() =>
                            func[1](request.pairId, request.request.username)
                        }
                        className="btns-join__btn"
                    >
                        Отклонить
                    </div>
                ) : (
                    <div
                        onClick={() =>
                            func[0](request.pairId, localStorage.getItem('username'))
                        }
                        className="btns-join__btn"
                    >
                        Отклонить
                    </div>
                )}
            </div>
        </div>
    );
};

export default InviteItem;
