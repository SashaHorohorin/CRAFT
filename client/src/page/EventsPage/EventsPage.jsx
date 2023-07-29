import React, { useContext, useEffect, useState } from "react";
import "./EventsPage.scss";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import Event from "../../components/EventComponent/Event/Event";
import DataService from "../../API/DataService";
import { useFetching } from "../../hooks/useFetching";

const EventsPage = () => {
    const [events, setEvents] = useState([]);
    const [countPage, setCountPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    // const [flagOpenModal, setFlagOpenModal] = useState(false);
    const { eventStore } = useContext(Context);
    const [fetchingEvents, isLoadingEvents, errorEvents] = useFetching(
        async (pageNum) => {
            // console.log('saskfhjahfshahfjshfkjshkj');
            const response = await DataService.getEvents(pageNum);
            // console.log(response.data);
            setEvents((current) => {
                console.log(current);
                return [...current, ...response.data.news];
            })
            setTotalPages(response.data.totalPages)
            // console.log('saskfhjahfshahfjshfkjshkj');
            // let complex = [...response.data];
        }
    );

    useEffect(() => {
        fetchingEvents(countPage);

        console.log(events);
    }, [countPage])
    
    let closeModal = () => {
        document.body.classList.remove('stop');
        eventStore.setFlagOpenModal(false);
    }

    let nextPage = () => {
        setCountPage(countPage + 1);
    }

    return (
        <>
            <div className="events">
                <div className="container">
                    <div className="events__title">Мероприятия</div>
                    <div className="events__row">
                        {events.map((event, index) => (
                            <Event key={index} event={event}/>
                        ))}
                    </div>
                    <div className="container-btn">
                        {totalPages !== countPage ? (
                            <div onClick={() => nextPage()} className="events__button">Показать больше</div>
                        ) : null}
                        
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
