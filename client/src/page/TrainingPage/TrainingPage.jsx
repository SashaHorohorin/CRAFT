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
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const { eventStore } = useContext(Context);

    const [moreInfoFlag, setMoreInfoFlag] = useState(false);
    const [modalWorkout, setModalWorkout] = useState({});

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

    const nameMode = (name) => {
        switch (name) {
            case "ALEKSEEVA":
                return "СК Алексеева";
            case "ARENA300":
                return "Арена 300";
            case "DINAMIT":
                return "СК Динамит";
            default:
                break;
        }
    };

    return (
        <>
            <div
                onClick={(event) => eventStore.closePlaers(event)}
                className="trainingPage"
            >
                <div
                    className={
                        eventStore.flagErrorTraining
                            ? "modal-window active"
                            : "modal-window"
                    }
                >
                    <div
                        onClick={() => eventStore.setFlagErrorTraining(false)}
                        className="modal-window__close"
                    >
                        <span></span>
                        <span></span>
                    </div>
                    <div className="modal-window__title">
                        {eventStore.errorTraining}
                    </div>
                </div>
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
                                Игровая для любого уровня. Но вы должны знать
                                правила, и играть с тренером не менее полугода.
                                Распределение идет по уровням
                                <br />
                                <br />
                                Стоимость игровой - 650 рублей. Уровень игроков
                                - любой на летний период. Отдельные корты будут
                                отданы игрокам с рейтингом не менее 500 по ЛАБ.
                                Для девушек рейтинг не ниже 400. (любительская
                                ассоциация бадминтона)
                                http://badminton4u.ru/players/
                                <br />
                                <br />
                                Максимальное количество на лето - 30 человека на
                                игры. Приходите к 20-45, чтобы размяться.
                                <br />
                                <br />
                                Оплата происходит переводом на корпоративную карту Тинькофф:{" "}
                                    <a href="#">
                                        5534 2000 3456 1456 
                                    </a>
                            </p>
                        ) : modalWorkout.type == "Тактическая игровая" ? (
                            <p>
                                Тактическая игровая.
                                <br />
                                <br />
                                Тренер участвует в игре, либо наблюдает за игрой
                                со стороны. Фиксирует ошибки и в конце розыгрыша
                                комментирует их. Создаёт похожие игровые
                                ситуации, чтобы игрок учился правильно
                                реагировать по месту, выбирать удар, видеть
                                свободную зону. Корректирует перемещения в
                                парном взаимодействии.
                                <br />
                                <br />
                                Данные игровые для продвинутых игроков, от
                                уровня ЕD.
                                <br />
                                Основная цель - научиться применять в игре
                                навыки приобретённые на тренировке.
                                <br />
                                Стоимость в филиале{" "}
                                {nameMode(modalWorkout.sportComplex)} – 950
                                разовая – есть система абонементов. В других
                                филиалах – от 1100 до 1300 в мини-группах.
                                <br />
                                <br />
                                Минимальный кворум для тренировки – 3 человека
                                По всем вопросам обращайтесь
                                <a href="tel:+79030975817">+7(903) 097 58 17</a>
                                <br />
                                <br />
                                Оплата происходит переводом на корпоративную карту Тинькофф:{" "}
                                    <a href="#">
                                        5534 2000 3456 1456 
                                    </a>
                            </p>
                        ) : modalWorkout.type ==
                          "Тренировка для продолжающих" ? (
                            <p>
                                Тренировки для продвинутых игроков.
                                <br />
                                <br />
                                Для кого подходят ?<br />
                                <br />
                                Для игроков владеющих всеми ударами и парными
                                перемещениями, регулярно участвующих в
                                соревнованиях.
                                <br />
                                Уровень B, C.
                                <br />
                                Стоимость в филиале{" "}
                                {nameMode(modalWorkout.sportComplex)} – 950
                                разовая – есть система абонементов. В других
                                филиалах – от 1100 до 1300 в мини-группах.
                                <br />
                                <br />
                                Минимальный кворум для тренировки – 3 человека
                                По всем вопросам обращайтесь
                                <a href="tel:+79030975817">+7(903) 097 58 17</a>
                                <br />
                                <br />
                                Оплата происходит переводом на корпоративную карту Тинькофф:{" "}
                                    <a href="#">
                                        5534 2000 3456 1456 
                                    </a>
                            </p>
                        ) : (
                            <p>
                                Тренировки для начинающих.
                                <br />
                                <br />
                                Для кого подходят ?<br />
                                <br />
                                Если вы не играли в спортивный бадминтон, либо
                                пробовали, но не знаете правил, не владеете
                                ударами и хотите научиться. А также для игроков
                                занимающихся менее полугода. Уровень EF.
                                <br />
                                <br />
                                Стоимость в филиале{" "}
                                {nameMode(modalWorkout.sportComplex)} – 950
                                разовая – есть система абонементов. В других
                                филиалах – от 1100 до 1300 в мини-группах.
                                <br />
                                <br />
                                Минимальный кворум для тренировки – 3 человека
                                По всем вопросам обращайтесь
                                <a href="tel:+79030975817">+7(903) 097 58 17</a>
                                <br />
                                <br />
                                Оплата происходит переводом на корпоративную карту Тинькофф:{" "}
                                    <a href="#">
                                        5534 2000 3456 1456 
                                    </a>
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
                        Что нужно на первую тренировку 🏸?
                        <br />
                        <br />
                        Вам понадобятся:
                        <br />
                        Форма. Свободная, не сковывающая движения. Это может
                        быть спортивная футболка и шорты/юбка/тренировочные
                        штаны.
                        <br />
                        <br />
                        Кроссовки. Для первых тренировок не обязательно иметь
                        бадминтонные кроссовки, достаточно чтобы они были на
                        светлой подошве, не скользящие. Подойдут зальные
                        кроссовки.
                        <br />
                        <br />
                        Ракетка. Если у вас нет ракетки, можно взять у тренера в
                        аренду. В последствии приобрете подходящую своему
                        уровню, стилю игры. В клубе есть услуга - подбор
                        ракетки.
                        <br />
                        <br />
                        Бутылка воды.
                        <br />
                        <br />
                        Воланы - на тренировку не нужны. Сам тренировочный
                        процесс тренер обеспечивает перьевыми воланами.
                        <br />
                        <br />
                        Позитивный настрой и желание научиться играть в
                        бадминтон - берите с собой обязательно!
                        <br />
                        <br />
                        По всем вопросам обращайтесь
                        <a href="tel:+79030975817">+7(903) 097 58 17</a>
                        <br />
                        <br />
                        Оплата происходит переводом на корпоративную карту Тинькофф:{" "}
                                    <a href="#">
                                        5534 2000 3456 1456 
                                    </a>
                    </div>
                </div>

                <div className="container">
                    <div className="trainingPage__title">Расписание</div>

                    <TrainingTabs
                        openModal={(type) => openModal(type)}
                    />
                    <TrainingTabsMobile
                        openModal={(type) => openModal(type)}
                    />
                </div>
                <ul className="people-actions__list">
                    <div className="people-actions__exit">
                        <span></span>
                        <span></span>
                    </div>

                    {eventStore.players.map((sportsmen, index) => (
                        <li
                            key={index}
                            className="people-actions__item item-people"
                        >
                            {/* <div className="item-people__img"></div> */}
                            <div className="item-people__name">
                                {sportsmen.firstName + " " + sportsmen.lastName}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default observer(TrainingPage);
