import React, { useContext, useEffect, useState } from "react";
import "./TrainingPage.scss";
import DataService from "../../API/DataService";
import { useFetching } from "../../hooks/useFetching";
import Workouts from "../../components/Workouts/Workouts";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import TrainingTabs from "../../components/TrainingTabs/TrainingTabs";
import TrainingTabsMobile from "../../components/TrainingTabsMobile/TrainingTabsMobile";

const TrainingPage = () => {
    const [arrDate, setArrDate] = useState([]);
    const [training, setTraining] = useState([]);
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const { eventStore } = useContext(Context);

    const [moreInfoFlag, setMoreInfoFlag] = useState(false);
    const [modalWorkout, setModalWorkout] = useState({});

    const [fetchingTraining, isLoadingTraining, errorTraining] = useFetching(
        async () => {
            // console.log('saskfhjahfshahfjshfkjshkj');
            const response = await DataService.getTrainingCalendar();
            // console.log('saskfhjahfshahfjshfkjshkj');
            // let complex = [...response.data];
            setTraining(Object.entries(response.data));
            console.log(Object.entries(response.data));
            console.log(setArrayData()[0].getDate());
            setArrDate(setArrayData());
        }
    );

    const setArrayData = () => {
        let arrayDate = [];
        let date = new Date();
        var dayNames = [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
        ];
        let day =
            date.getDate() -
            dayNames.indexOf(
                date.toLocaleDateString("en-US", { weekday: "long" })
            );
        // console.log(day);
        for (let i = 0; i < 7; i++) {
            let date1 = new Date(date.getFullYear(), date.getMonth(), day + i);
            arrayDate.push(date1);
        }

        // console.log(arrayDate);
        return arrayDate;
    };

    useEffect(() => {
        fetchingTraining();
    }, []);

    const activate = (index) => {
        // console.log(activeTabIndex);
        setActiveTabIndex(index);
    };

    const coord = (event) => {
        console.log(event.target);
    };

    const openModal = (type) => {
        console.log(type);
        setModalWorkout(type);
        setMoreInfoFlag(true);
    };

    return (
        <>
            {isLoadingTraining ? (
                <div>Грузится</div>
            ) : (
                <div
                    onClick={(event) => eventStore.closePlaers(event)}
                    className="trainingPage"
                >
                    <div
                        onClick={() => setMoreInfoFlag(false)}
                        className={
                            moreInfoFlag
                                ? "trainingPage__bg active"
                                : "trainingPage__bg"
                        }
                    >
                        <div className="trainingPage__modal modal-more-info">
                            {modalWorkout.type == "Игровая" ? (
                                <p>
                                    Игровая для любого уровня. Но вы должны
                                    знать правила, и играть с тренером не менее
                                    полугода. Распределение идет по уровням
                                    <br />
                                    <br />
                                    Стоимость игровой - 650 рублей. Уровень
                                    игроков - любой на летний период. Отдельные
                                    корты будут отданы игрокам с рейтингом не
                                    менее 500 по ЛАБ. Для девушек рейтинг не
                                    ниже 400. (любительская ассоциация
                                    бадминтона) http://badminton4u.ru/players/
                                    <br />
                                    <br />
                                    Максимальное количество на лето - 30
                                    человека на игры. Приходите к 20-45, чтобы
                                    размяться.
                                    <br/><br/>Оплата тренировки происходит переводом на тинькоф по номеру: <a href="tel:+79030975817">+7(903) 097 58 17</a>
                                </p>
                            ) : modalWorkout.type == "Игровая с тренером" ? (
                                <p>
                                    Игровая с тренером Александром Хорохориным
                                    на 1 корте в мини группе.
                                    <br />
                                    <br />
                                    Что даёт такая игровая? Постоянную
                                    корректировку от тренера: игра по зонам,
                                    парные перемещения, выбор удара . Наиболее
                                    эффективно приобретённый навык закрепляется,
                                    если его сразу же начать применять в игре и
                                    желательно под чутким руководством тренера.
                                    <br />
                                    <br />
                                    Чтобы тренировка состоялась, необходим
                                    кворум 3 человека. В группе максимум 5
                                    человек. Уровень игроков - не менее 250 по
                                    ЛАБ. Если нет рейтинга, допуск на усмотрение
                                    организаторов.
                                    <br />
                                    <br />
                                    Стоимость - 950 рублей разово, 750 рублей
                                    первая тренировка, 850 рублей при покупке
                                    абонемента на занятие 2 раза в неделю (7650
                                    рублей единоразово 9 занятий), 800 рублей -
                                    3 раза в неделю (9600, 12 занятий). Аренда
                                    ракетки - 150 рублей.
                                    <br />
                                    <br />
                                    Если вас 3-е, то добавляете 200 рублей за
                                    тренировку. например. разово - 1150 рублей!
                                    <br />
                                    <br />
                                    Обращайтесь по всем вопросам 89030975817
                                    <br/><br/>Оплата тренировки происходит переводом на тинькоф по номеру: <a href="tel:+79030975817">+7(903) 097 58 17</a>
                                </p>
                            ) : (
                                <p>
                                    Тренировка с тренером на 1 или 2 кортах в
                                    мини группе.
                                    <br />
                                    <br />
                                    Тренеры - Ирина Онегина, Дмитрий Решетников,
                                    Александр Хорохорин. Стоимость - 950 рублей
                                    разово, 850 рублей при покупке абонемента на
                                    занятие 2 раза в неделю (7650 рублей
                                    единоразово 9 занятий), 800 рублей - 3 раза
                                    в неделю (9600, 12 занятий). Аренда ракетки
                                    - 150 рублей.
                                    <br />
                                    <br />
                                    Обращайтесь по всем вопросам 89062783095
                                    <br />
                                    <br />
                                    Необходим кворум 4 человека, чтобы
                                    тренировка состоялась!
                                    <br/><br/>Оплата тренировки происходит переводом на тинькоф по номеру: <a href="tel:+79030975817">+7(903) 097 58 17</a>
                                </p>
                            )}
                        </div>
                    </div>
                    <div
                        onClick={() => eventStore.setFlagOpenModalSale(false)}
                        className={
                            eventStore.flagOpenModalSale
                                ? "trainingPage__bg active"
                                : "trainingPage__bg"
                        }
                    >
                        <div className="trainingPage__modal modal-more-info">
                            Пробная тренировка по цене 750 руб, акция работает
                            на ТРЕНИРОВКА С ТРЕНЕРОМ и ТАКТИЧЕСКАЯ ИГРОВАЯ.
                            <br /> Записаться вы можете на этой странице. <br />
                            Чтобы закрыть информационное окно нажмите на любую
                            часть экрана.
                            <br />
                            <br />
                            Оплата тренировки происходит переводом на тинькофф по
                            номеру:{" "}
                            <a href="tel:+79030975817">+7(903) 097 58 17</a>
                        </div>
                    </div>

                    <div className="container">
                        <div className="trainingPage__title">Расписание</div>

                        <TrainingTabs
                            openModal={(type) => openModal(type)}
                            training={training}
                            arrDate={arrDate}
                        />
                        <TrainingTabsMobile
                            openModal={(type) => openModal(type)}
                            training={training}
                            arrDate={arrDate}
                        />
                    </div>
                    <ul className="people-actions__list">
                        <div className="people-actions__exit">
                            <span></span>
                            <span></span>
                        </div>

                        {eventStore.players.map((sportsmen, index) => (
                            <li className="people-actions__item item-people">
                                <div className="item-people__img"></div>
                                <div className="item-people__name">
                                    {sportsmen.firstName}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
};

export default observer(TrainingPage);
