import React, { useContext, useState } from "react";
import { Context } from "../../..";
import { observer } from "mobx-react-lite";
import { set } from "mobx";

const Event = ({ event, setLoader }) => {
    const { eventStore } = useContext(Context);
    const [flagOpenModal, setFlagOpenModal] = useState(false);

    let openModal = () => {
        document.body.classList.add("stop");
        setFlagOpenModal(true);
    };
    const getDate = (date) => {
        let d = new Date(date);
        let time = `${d.getDate() < 10 ? `0${d.getDate()}` : d.getDate()}.${
            d.getMonth() < 10 ? `0${d.getMonth()}` : d.getMonth()
        }`;
        return time;
    };
    const getDateYear = (date) => {
        let d = new Date(date);
        let time = `${d.getDate() < 10 ? `0${d.getDate()}` : d.getDate()}.${
            d.getMonth() < 10 ? `0${d.getMonth()}` : d.getMonth()
        }.${d.getFullYear()}`;
        return time;
    };
    const getTime = (date) => {
        let d = new Date(date);
        let time = `${d.getHours() < 10 ? `0${d.getHours()}` : d.getHours()}:${
            d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes()
        }`;
        return time;
    };
    let closeModal = () => {
        console.log(event);
        document.body.classList.remove("stop");
        setFlagOpenModal(false);
    };

    return (
        <>
            <div className="events__event event">
                <div className="event__content content-event">
                    <div className="content-event__header">
                        <div className="content-event__title">
                            {event.title}
                        </div>
                        <div
                            onClick={() => openModal()}
                            className="content-event__button"
                        >
                            Читать
                        </div>
                    </div>
                    <div className="content-event__img">
                        <img onLoad={setLoader} src={event.photoUrl} alt="" />
                    </div>
                    <div className="content-event__time time-event">
                        <div className="time-event__time">
                            {getTime(event.createdDate)}
                        </div>
                        <div className="time-event__date">
                            {getDateYear(event.createdDate)}
                        </div>
                    </div>
                </div>
                <div className="event__info info-event" style={
                            {background: `${event.type == "Новости"
                            ? "#E5EFFF" 
                            : event.type == "Предстоящие соревнования"
                            ? "#E5FFE7"
                            : "#FFE5E5"}`}
                        }>
                    <div className="info-event__left left-info">
                        <div className="left-info__label">{event.type}</div>
                        {event.type == "Предстоящие соревнования" ? (
                            <div className="left-info__start">
                                Начало {getDate(event.eventDate)} в{" "}
                                {getTime(event.eventDate)}
                            </div>
                        ) : null}
                    </div>
                    {event.type != "Новости" ? (
                        <div className="info-event__right right-info">
                            <div className="right-info__date">{`${getDate(
                                event.eventDate
                            )}`}</div>
                            <div className="right-info__label">
                                Дата проведения
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
            <div
                onClick={() => closeModal()}
                className={
                    flagOpenModal
                        ? "modal-window-event__bg active"
                        : "modal-window-event__bg"
                }
            >
                <div
                    className={
                        flagOpenModal
                            ? "modal-window-event active"
                            : "modal-window-event"
                    }
                >
                    <div
                        className="modal-window-event__info info-modal"
                        style={
                            {background: `${event.type == "Новости"
                            ? "#E5EFFF" 
                            : event.type == "Предстоящие соревнования"
                            ? "#E5FFE7"
                            : "#FFE5E5"}`}
                        }
                    >
                        <div className="info-modal__title">{event.title}</div>
                        {event.type != "Новости" ? (
                            <div className="info-modal__date date-modal">
                                <div className="date-modal__date">
                                    {getDate(event.eventDate)}
                                </div>
                                <div className="date-modal__label">
                                    Дата проведения
                                </div>
                            </div>
                        ) : null}
                    </div>
                    <div className="modal-window-event__content content-modal">
                        <div className="content-modal__text">
                            <div>
                                {event.text.split("\n").map((str, index) => (
                                    <div key={index}>
                                        <span>{str}</span>
                                        <br />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="content-modal__img">
                            <img src={event.photoUrl} alt="" />
                        </div>
                        <div className="content-modal__time time-modal">
                            <div className="time-modal__time">
                                {getTime(event.createdDate)}
                            </div>
                            <div className="time-modal__date">
                                {getDateYear(event.createdDate)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default observer(Event);
