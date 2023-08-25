import React, { useState } from "react";
import Workouts from "../Workouts/Workouts";

const TrainingTabsMobile = ({ training, arrDate }) => {
    const [activeTabIndexComplex, setActiveTabIndexComplex] = useState(0);
    const [activeTabIndexDay, setActiveTabIndexDay] = useState(0);

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
    return (
        <div className="trainingPage__mobile mobile-info">
            <div className="mobile-info__row">
                <div className="mobile-info__container">
                    <div className="mobile-info__label">Выберете спортзал:</div>

                    <select
                        onChange={(e) => handleFunctionComplex(e)}
                        className="mobile-info__select"
                    >
                        {training.map((tab, index) => (
                            <option
                                key={index}
                                className="mobile-info__tab"
                                // onClick={() => activate(index)}
                                value={index}
                            >
                                {tab[0]}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mobile-info__container">
                    <div className="mobile-info__label">Выберете дату:</div>
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
                    </select>
                </div>
            </div>

            <div className="mobile-info__content active">
                {/* {training[activeTabIndex] ? (training[activeTabIndex][1]?.sunday[0]?.type) : null} */}

                {training[activeTabIndexComplex] ? (
                    <Workouts
                        workouts={
                            training[activeTabIndexComplex][1]?.[
                                dayTraining[activeTabIndexDay]
                            ]
                        }
                        date={arrDate[activeTabIndexDay]}
                    />
                ) : null}
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
        </div>
    );
};

export default TrainingTabsMobile;
