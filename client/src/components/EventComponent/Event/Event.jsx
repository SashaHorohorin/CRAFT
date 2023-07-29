import React, { useContext } from "react";
import { Context } from "../../..";
import { observer } from "mobx-react-lite";


const Event = () => {
    const { eventStore } = useContext(Context);
    let openModal = () => {
        document.body.classList.add('stop');
        eventStore.setFlagOpenModal(true);
    }
    return (
        <div className="events__event event">
            <div className="event__content content-event">
                <div className="content-event__header">
                    <div className="content-event__title">
                        Друзья! Приглашаем вас на парный турнир CDСК в Динамит.
                    </div>
                    <div
                        onClick={() => openModal()}
                        className="content-event__button"
                    >
                        Читать
                    </div>
                </div>
                <div className="content-event__img">
                    <img src="./images/EventPage/1.png" alt="" />
                </div>
                <div className="content-event__time time-event">
                    <div className="time-event__time">18:23</div>
                    <div className="time-event__date">21.06.23</div>
                </div>
            </div>
            <div className="event__info info-event">
                <div className="info-event__left left-info">
                    <div className="left-info__label">
                        Предстоящие соревнования
                    </div>
                    <div className="left-info__start">Начало 20.06 в 18:30</div>
                </div>
                <div className="info-event__right right-info">
                    <div className="right-info__date">20.06</div>
                    <div className="right-info__label">Дата проведения</div>
                </div>
            </div>
        </div>
    );
};

export default observer(Event);
