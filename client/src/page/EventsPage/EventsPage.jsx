import React, { useContext, useState } from "react";
import "./EventsPage.scss";
import { Context } from "../..";
import { observer } from "mobx-react-lite";

const EventsPage = () => {
    // const [flagOpenModal, setFlagOpenModal] = useState(false);
    const { eventStore } = useContext(Context);

    let openModal = () => {
        document.body.classList.add('stop');
        eventStore.setFlagOpenModal(true);
    }
    let closeModal = () => {
        document.body.classList.remove('stop');
        eventStore.setFlagOpenModal(false);
    }

    return (
        <>
            <div className="events">
                <div className="container">
                    <div className="events__title">Мероприятия</div>
                    <div className="events__row">
                        <div className="events__event event">
                            <div className="event__content content-event">
                                <div className="content-event__header">
                                    <div className="content-event__title">
                                        Друзья! Приглашаем вас на парный турнир
                                        CDСК в Динамит.
                                    </div>
                                    <div
                                        onClick={() =>
                                            openModal()
                                        }
                                        className="content-event__button"
                                    >
                                        Читать
                                    </div>
                                </div>
                                <div className="content-event__img">
                                    <img
                                        src="./images/EventPage/1.png"
                                        alt=""
                                    />
                                </div>
                                <div className="content-event__time time-event">
                                    <div className="time-event__time">
                                        18:23
                                    </div>
                                    <div className="time-event__date">
                                        21.06.23
                                    </div>
                                </div>
                            </div>
                            <div className="event__info info-event">
                                <div className="info-event__left left-info">
                                    <div className="left-info__label">
                                        Предстоящие соревнования
                                    </div>
                                    <div className="left-info__start">
                                        Начало 20.06 в 18:30
                                    </div>
                                </div>
                                <div className="info-event__right right-info">
                                    <div className="right-info__date">
                                        20.06
                                    </div>
                                    <div className="right-info__label">
                                        Дата проведения
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="events__event event">
                            <div className="event__content content-event">
                                <div className="content-event__header">
                                    <div className="content-event__title">
                                        Друзья! Приглашаем вас на парный турнир
                                        CDСК в Динамит.
                                    </div>
                                    <div
                                        onClick={() =>
                                            eventStore.setFlagOpenModal(true)
                                        }
                                        className="content-event__button"
                                    >
                                        Читать
                                    </div>
                                </div>
                                <div className="content-event__img">
                                    <img
                                        src="./images/EventPage/1.png"
                                        alt=""
                                    />
                                </div>
                                <div className="content-event__time time-event">
                                    <div className="time-event__time">
                                        18:23
                                    </div>
                                    <div className="time-event__date">
                                        21.06.23
                                    </div>
                                </div>
                            </div>
                            <div className="event__info info-event">
                                <div className="info-event__left left-info">
                                    <div className="left-info__label">
                                        Предстоящие соревнования
                                    </div>
                                    <div className="left-info__start">
                                        Начало 20.06 в 18:30
                                    </div>
                                </div>
                                <div className="info-event__right right-info">
                                    <div className="right-info__date">
                                        20.06
                                    </div>
                                    <div className="right-info__label">
                                        Дата проведения
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="events__event event">
                            <div className="event__content content-event">
                                <div className="content-event__header">
                                    <div className="content-event__title">
                                        Друзья! Приглашаем вас на парный турнир
                                        CDСК в Динамит.
                                    </div>
                                    <div
                                        onClick={() =>
                                            eventStore.setFlagOpenModal(true)
                                        }
                                        className="content-event__button"
                                    >
                                        Читать
                                    </div>
                                </div>
                                <div className="content-event__img">
                                    <img
                                        src="./images/EventPage/1.png"
                                        alt=""
                                    />
                                </div>
                                <div className="content-event__time time-event">
                                    <div className="time-event__time">
                                        18:23
                                    </div>
                                    <div className="time-event__date">
                                        21.06.23
                                    </div>
                                </div>
                            </div>
                            <div className="event__info info-event">
                                <div className="info-event__left left-info">
                                    <div className="left-info__label">
                                        Предстоящие соревнования
                                    </div>
                                    <div className="left-info__start">
                                        Начало 20.06 в 18:30
                                    </div>
                                </div>
                                <div className="info-event__right right-info">
                                    <div className="right-info__date">
                                        20.06
                                    </div>
                                    <div className="right-info__label">
                                        Дата проведения
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="events__event event">
                            <div className="event__content content-event">
                                <div className="content-event__header">
                                    <div className="content-event__title">
                                        Друзья! Приглашаем вас на парный турнир
                                        CDСК в Динамит.
                                    </div>
                                    <div
                                        onClick={() =>
                                            eventStore.setFlagOpenModal(true)
                                        }
                                        className="content-event__button"
                                    >
                                        Читать
                                    </div>
                                </div>
                                <div className="content-event__img">
                                    <img
                                        src="./images/EventPage/1.png"
                                        alt=""
                                    />
                                </div>
                                <div className="content-event__time time-event">
                                    <div className="time-event__time">
                                        18:23
                                    </div>
                                    <div className="time-event__date">
                                        21.06.23
                                    </div>
                                </div>
                            </div>
                            <div className="event__info info-event">
                                <div className="info-event__left left-info">
                                    <div className="left-info__label">
                                        Предстоящие соревнования
                                    </div>
                                    <div className="left-info__start">
                                        Начало 20.06 в 18:30
                                    </div>
                                </div>
                                <div className="info-event__right right-info">
                                    <div className="right-info__date">
                                        20.06
                                    </div>
                                    <div className="right-info__label">
                                        Дата проведения
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container-btn">
                        <div className="events__button">Показать больше</div>
                    </div>
                </div>
            </div>
            <div
                onClick={() => closeModal()}
                className={
                    eventStore.flagOpenModal
                        ? "modal-window-event__bg active"
                        : "modal-window-event__bg"
                }
            ></div>
            <div
                className={
                    eventStore.flagOpenModal
                        ? "modal-window-event active"
                        : "modal-window-event"
                }
            >
                <div className="modal-window-event__info info-modal">
                    <div className="info-modal__title">
                        Вчера завершился 5 этап Гран-При "Петербург Опен"
                    </div>
                    <div className="info-modal__date date-modal">
                        <div className="date-modal__date">20.06</div>
                        <div className="date-modal__label">Дата проведения</div>
                    </div>
                </div>
                <div className="modal-window-event__content content-modal">
                    <div className="content-modal__text">
                        <p>
                            Наши игроки и тренеры сыграли со следующими
                            результатами:
                            <br />
                            <br />
                            Женский одиночный разряд группа B <br />
                            1 место - Хорохорин А.И. <br />
                            <br />
                            Одиночный разряд группа С <br />
                            1 место - Хорохорин А.И. <br />
                            <br />
                            Мужские пары группа С <br />
                            1 место - Хорохорин А.И. и Хорохорин А.И. <br />
                            <br />
                            Женский парный разряд группа А <br />
                            1 место - Хорохорин А.И. и Хорохорин А.И. <br />
                            <br />
                            Женский парный разряд группа С <br />
                            1 место - Хорохорин А.И. и Хорохорин А.И. <br />
                            <br />
                            Смешанный разряд группа А <br />
                            1 место - Хорохорин А.И. и Хорохорин А.И.
                            <br />
                            <br />
                            Смешанный разряд группа B <br />
                            1 место - Хорохорин А.И. и Хорохорин А.И.
                            <br />
                            <br />
                            Смешанный разряд группа С <br />
                            1 место - Хорохорин А.И. и Хорохорин А.И. <br />
                            <br />
                            Все большие молодцы! Действительно много хороших
                            результатов! Впереди длительный перерыв, следующий
                            этап состоится только в конце октября.А мы не
                            сбавляем обороты, сохраняем форму и приглашаем на
                            крафтовые турниры!
                        </p>
                    </div>
                    <div className="content-modal__img">
                        <img src="./images/EventPage/1.png" alt="" />
                    </div>
                    <div className="content-modal__time time-modal">
                        <div className="time-modal__time">18:23</div>
                        <div className="time-modal__date">21.06.23</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default observer(EventsPage);
