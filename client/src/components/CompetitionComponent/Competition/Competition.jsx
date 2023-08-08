import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Context } from "../../..";

const Competition = ({competition, type, deletePair}) => {

    const { eventStore } = useContext(Context);

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

    const searchIdPair = () => {
        for(let i = 0; i < competition.competitionPairs.length; i++){
            for(let j = 0; j < competition.competitionPairs[i].player.length; j++){
                if(competition.competitionPairs[i].player[j].username == localStorage.getItem('username')){
                    deletePair(competition.competitionPairs[i].id)
                }
            }
        }
    }

    return (
        <div className="competitions__event event-competitions">
            <div className="event-competitions__title">{competition.type}</div>
            {/* <div className="event-competitions__title">{competition.type}</div> */}
            <div className="event-competitions__date">{getDateYear(competition.startCompetition)}</div>
            <div className="event-competitions__time">{getTime(competition.startCompetition)}</div>
            <div className="event-competitions__btns">
                <Link onClick={() => eventStore.setCompetition(competition)} to={`/competitions/applications/${competition.id}`} className="event-competitions__list">Заявки</Link>
                {type == 'delete' ? (
                    <button onClick={() => searchIdPair()} className="event-competitions__follow">
                        Выписаться
                    </button>
                ) : (
                    <button className="event-competitions__follow">
                        Записаться
                    </button>
                )}
            </div>
        </div>
    );
};

export default observer(Competition);
