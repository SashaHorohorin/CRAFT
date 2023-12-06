import React, { useContext, useEffect, useState } from "react";
import Workouts from "../Workouts/Workouts";
import DataService from "../../API/DataService";
import { useFetching } from "../../hooks/useFetching";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import Loader from "../Loader/Loader";

const TrainingTabsMobile = ({ openModal }) => {
    const [activeTabIndexComplex, setActiveTabIndexComplex] = useState(0);
    const { eventStore } = useContext(Context);
    const [activeTabIndexDay, setActiveTabIndexDay] = useState(0);
    // const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [arrDate, setArrDate] = useState([]);
    const [training, setTraining] = useState([]);
    const [count, setCount] = useState(0);

    let indexDay = -1;
    let indexWorkout = 1;
    let trainingComplex = ["СК Динамит", "Арена 300", "СК Алексеева"];

    const [fetchingTraining, isLoadingTraining, errorTraining] = useFetching(
        async (count) => {
            // console.log('saskfhjahfshahfjshfkjshkj');
            // console.log(count);
            const response = await DataService.getTrainingCalendar(count);
            // console.log(Object.entries(response.data));
            // let complex = [...response.data];
            setTraining((currentTraining) => {
                if (count == 0) {
                    return Object.entries(response.data);
                } else {
                    let newArr = Object.entries(response.data);
                    currentTraining[0].push(newArr[0][1]);
                    currentTraining[1].push(newArr[1][1]);
                    currentTraining[2].push(newArr[2][1]);
                    console.log(currentTraining);
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
        eventStore.setIndexMap(1);
        fetchingTraining(count);
    }, []);

    let days = [
        "Воскресенье",
        "Понедельник",
        "Вторник",
        "Среда",
        "Четверг",
        "Пятница",
        "Суббота",
    ];
    let dayTraining = [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
    ];
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

    const handleFunctionComplex = (e) => {
        let val = e.target.value;
        setActiveTabIndexComplex(val);
        // console.log("value: " + val);
        // console.log(arrDate);
    };
    const handleFunctionDay = (e) => {
        let val = e.target.value;
        setActiveTabIndexDay(val);
        // console.log("value: " + val);
    };
    const trainShow = (indexComplex, indexDay) => {
        let day = 0;
        // console.log(indexComplex);
        eventStore.setIndexMap(+indexComplex + 1);
        if (training[activeTabIndexComplex]) {
            if (indexDay < 7) {
                day = indexDay;
            } else {
                // console.log('До - indexDay: ' + indexDay + ' ' +  'day: ' + day + ' ' + 'indexWorkout: ' + indexWorkout + ' ' + 'count: ' + count);
                day = indexDay % 7;
                indexWorkout = indexWorkout + 1;
                // console.log('После - indexDay: ' + indexDay + ' ' +  'day: ' + day + ' ' + 'indexWorkout: ' + indexWorkout + ' ' + 'newCount: '  + 'count: ' + count);
            }

            // console.log(training[indexComplex][indexWorkout]?.[
            //     dayTraining[day]
            // ]);
            return (
                <Workouts
                    workouts={
                        training[indexComplex][indexWorkout]?.[dayTraining[day]]
                    }
                    type="mobile"
                    openModal={(type) => openModal(type)}
                    date={arrDate[indexDay]}
                />
            );
        }
    };
    const activate = (index) => {
        console.log(index);
        // setActiveTabIndex(index);
        // console.log(i);
    };
    return (
        <>
            {(isLoadingTraining && (count == 0)) ? (
                <Loader />
            ) : (
                <div className="trainingPage__mobile mobile-info">
                    <Link to="/where-we" className="trainingPage__adress">
                        {cities[activeTabIndexComplex].address}
                    </Link>
                    <div className="trainingPage__description">
                        {cities[activeTabIndexComplex].text}    
                    </div>
                    <div className="mobile-info__row">
                        <div className="mobile-info__container">
                            <div className="mobile-info__label">
                                Выберете спортзал:
                            </div>

                            <select
                                onChange={(e) => handleFunctionComplex(e)}
                                className="mobile-info__select"
                            >
                                {trainingComplex.map((tab, index) => (
                                    <option
                                        key={index}
                                        className="mobile-info__tab"
                                        // onClick={() => activate(index)}
                                        value={index}
                                    >
                                        {tab}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="trainingPage__btns">
                            <div
                                onClick={() => setCount(count + 1)}
                                className="trainingPage__more-btn"
                            >
                                Добавить следующую неделю
                            </div>
                        </div>
                        {/* <div className="mobile-info__container"> */}
                        {/* <div className="mobile-info__label">Выберете дату:</div>
                    <select
                        onChange={(e) => handleFunctionDay(e)}
                        className="mobile-info__select"
                    >
                        {arrDate.map((tab, index) => (
                            <option
                                key={index}
                                className="mobile-info__tab"
                                // onClick={() => activate(index)}
                                value={index}
                            >
                                {tab.getDate() + " " + days[tab.getDay()]}
                            </option>
                        ))}
                    </select> */}
                        {/* </div> */}
                    </div>

                    <div className="mobile-info__content active">
                        {/* {training[activeTabIndex] ? (training[activeTabIndex][1]?.sunday[0]?.type) : null} */}
                        {/* {trainShow(activeTabIndexComplex, activeTabIndexDay)} */}
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
                                        training[activeTabIndexComplex][
                                            indexWorkout
                                        ]?.[dayTraining[indexDay]]
                                    }
                                    date={day}
                                    openModal={(type) => openModal(type)}
                                />
                            );
                        })}
                        {/* {training[activeTabIndexComplex] ? (
                    <Workouts
                        workouts={
                            training[activeTabIndexComplex][1]?.[
                                dayTraining[activeTabIndexDay]
                            ]
                        }
                        openModal={(type) => openModal(type)}
                        date={arrDate[activeTabIndexDay]}
                    />
                ) : null} */}
                        {/* {training[activeTabIndexComplex] ? (
                    <Workouts
                        workouts={training[activeTabIndexComplex][1]?.tuesday}
                        date={arrDate[1]}
                    />
                ) : null}
                {training[activeTabIndexComplex] ? (
                    <Workouts
                        workouts={training[activeTabIndexComplex][1]?.wednesday}
                        date={arrDate[2]}
                    />
                ) : null}
                {training[activeTabIndexComplex] ? (
                    <Workouts
                        workouts={training[activeTabIndexComplex][1]?.thursday}
                        date={arrDate[3]}
                    />
                ) : null}
                {training[activeTabIndexComplex] ? (
                    <Workouts
                        workouts={training[activeTabIndexComplex][1]?.friday}
                        date={arrDate[4]}
                    />
                ) : null}
                {training[activeTabIndexComplex] ? (
                    <Workouts
                        workouts={training[activeTabIndexComplex][1]?.saturday}
                        date={arrDate[5]}
                    />
                ) : null}
                {training[activeTabIndexComplex] ? (
                    <Workouts
                        workouts={training[activeTabIndexComplex][1]?.sunday}
                        date={arrDate[6]}
                    />
                ) : null} */}
                    </div>
                    <div className="trainingPage__btns">
                        <div
                            onClick={() => setCount(count + 1)}
                            className="trainingPage__more-btn"
                        >
                            Добавить следующую неделю
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default observer(TrainingTabsMobile);
