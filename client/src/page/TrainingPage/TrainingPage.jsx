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
    const [modalType, setModalType] = useState("");

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
        setModalType(type);
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
                            {modalType == "Игровая" ? (
                                <div>{`Описание
                                 игровой`}</div>
                            ) : modalType == "Игровая с тренером" ? (
                                <p>Описание игровой с тренером</p>
                            ) : (
                                <p>
                                    Описание тренировки для начинающих и
                                    продолжающих
                                </p>
                            )}
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
