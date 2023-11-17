import React, { useContext, useEffect, useState } from "react";
import Workouts from "../Workouts/Workouts";
import { useFetching } from "../../hooks/useFetching";
import DataService from "../../API/DataService";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import Loader from "../Loader/Loader";

const TrainingTabs = ({ openModal }) => {
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [arrDate, setArrDate] = useState([]);
    const [training, setTraining] = useState([]);
    const [count, setCount] = useState(0);
    const { eventStore } = useContext(Context);

    // const [indexDay, setIndexDay] = useState(-1);
    let indexDay = -1;
    let indexWorkout = 1;
    const activate = (index) => {
        // console.log(training);
        setActiveTabIndex(index);
        // console.log(i);
        eventStore.setIndexMap(index + 1);
    };
    const [fetchingTraining, isLoadingTraining, errorTraining] = useFetching(
        async (count) => {
            // console.log('saskfhjahfshahfjshfkjshkj');
            // console.log(count);
            const response = await DataService.getTrainingCalendar(count);
            // console.log(response.data);
            // let complex = [...response.data];
            setTraining((currentTraining) => {
                if (count == 0) {
                    return Object.entries(response.data);
                } else {
                    let newArr = Object.entries(response.data);
                    currentTraining[0].push(newArr[0][1]);
                    currentTraining[1].push(newArr[1][1]);
                    currentTraining[2].push(newArr[2][1]);
                    return currentTraining;
                    // training[activeTabIndex][indexWorkout]?.[dayTraining[indexDay]]
                }
            });
            // console.log([...training, ...Object.entries(response.data)]);
            // console.log(setArrayData()[0].getDate());
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
        for (let i = 0; i < 7 * (count + 1); i++) {
            let date1 = new Date(date.getFullYear(), date.getMonth(), day + i);
            // console.log(date1);
            arrayDate.push(date1);
        }

        // console.log(arrayDate);
        return arrayDate;
    };

    useEffect(() => {
        fetchingTraining(count);
    }, [count]);

    useEffect(() => {
        fetchingTraining(count);
        eventStore.setIndexMap(1);
    }, []);

    let dayTraining = [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
    ];

    let text = {
        morning: 1,
        morning: 2,
    };
    let trainingComplex = ["СК Динамит", "СК Импульс", "СК Алексеева"];

    const cities = [
        {
            id: 1,
            address:
                "СК Динамит, переулок Челиева, 13В, Санкт-Петербург, м.Дыбенко, м.Большевиков",
            text: "Отличный зал: хороший свет, профессиональное покрытие, есть парковка на территории, раздевалки, душ, бесплатная сауна и кулер с водой.",
        },
        {
            id: 2,
            address:
                "СК Импульс, Песочное шоссе, 99 б, м Озерки, пр. Просвещения.",
            text: "На автобусе 25-35 минут, на машине 10-20 минут от метро Озерки. Отличный зал: хороший свет, профессиональное покрытие, есть парковка на территории, раздевалки, душ.",
        },
        {
            id: 3,
            address: "СК Алексеева, просп. Раевского, 16.",
            text: "Отличный зал: хороший свет, профессиональное покрытие, раздевалки, душ.",
        },
    ];

    return (
        <>
            {(isLoadingTraining && (count == 0)) ? (
                <Loader />
            ) : (
                <div className="trainingPage__tabs tabs-info">
                    <Link to="/where-we" className="trainingPage__adress">
                        {cities[activeTabIndex].address}
                    </Link>
                    <div className="trainingPage__description">
                        {cities[activeTabIndex].text}
                    </div>

                    <ul className="tabs-info__labels">
                        {trainingComplex.map((tab, index) => (
                            <li
                                key={index}
                                className={
                                    index === activeTabIndex
                                        ? "tabs-info__tab active"
                                        : "tabs-info__tab"
                                }
                                onClick={() => activate(index)}
                            >
                                {tab}
                            </li>
                        ))}
                    </ul>
                    <div className="tabs-info__content active">
                        {arrDate.map((day, index) => {
                            if (indexDay > 5) {
                                indexDay = -1;
                                indexWorkout = indexWorkout + 1;
                            }
                            indexDay = indexDay + 1;

                            // console.log(indexDay + " " + indexWorkout);
                            return (
                                <Workouts
                                    key={index}
                                    workouts={
                                        training[activeTabIndex][
                                            indexWorkout
                                        ]?.[dayTraining[indexDay]]
                                    }
                                    date={day}
                                    openModal={(type) => openModal(type)}
                                />
                            );
                        })}
                    </div>
                    <div className="trainingPage__btns">
                        <div
                            onClick={() => setCount(count + 1)}
                            className="trainingPage__more-btn"
                        >
                            Показать расписание на следующую неделю
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default observer(TrainingTabs);
