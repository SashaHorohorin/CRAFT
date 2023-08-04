import React from "react";
import { Link } from "react-router-dom";

const Competition = ({competition}) => {

    const getDateYear = (date) => {
        let d = new Date(date);
        let time = `${d.getDate() < 10 ? `0${d.getDate()}` : d.getDate()}.${d.getMonth() < 10 ? `0${d.getMonth()}` : d.getMonth()}.${d.getFullYear()}`;
        return time;
    };

    const getTime = (date) => {
        let d = new Date(date);
        let time = `${d.getHours()}:${d.getMinutes()}`;
        return time;
    };

    return (
        <div className="competitions__event event-competitions">
            <div className="event-competitions__title">Все против всех DE</div>
            {/* <div className="event-competitions__title">{competition.type}</div> */}
            <div className="event-competitions__date">{getDateYear(competition.startCompetition)}</div>
            <div className="event-competitions__time">{getTime(competition.startCompetition)}</div>
            <div className="event-competitions__btns">
                <Link to='applications' className="event-competitions__list">Заявки</Link>
                <button className="event-competitions__follow">
                    Записаться
                </button>
            </div>
        </div>
    );
};

export default Competition;
