import React, { useState } from "react";
import Workouts from "../Workouts/Workouts";


const TrainingTabs = ({training, arrDate, openModal}) => {
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const activate = (index) => {
        // console.log(activeTabIndex);
        setActiveTabIndex(index);
    };
    return (
        <div className="trainingPage__tabs tabs-info">
            <ul className="tabs-info__labels">
                {training.map((tab, index) => (
                    <li
                        key={index}
                        className={
                            index === activeTabIndex
                                ? "tabs-info__tab active"
                                : "tabs-info__tab"
                        }
                        onClick={() => activate(index)}
                    >
                        {tab[0]}
                    </li>
                ))}
            </ul>
            <div className="tabs-info__content active">
                {/* {training[activeTabIndex] ? (training[activeTabIndex][1]?.sunday[0]?.type) : null} */}
                {training[activeTabIndex] ? (
                    <Workouts
                        workouts={training[activeTabIndex][1]?.monday}
                        date={arrDate[0]}
                        openModal={(type) => openModal(type)}
                    />
                ) : null}
                {training[activeTabIndex] ? (
                    <Workouts
                        workouts={training[activeTabIndex][1]?.tuesday}
                        date={arrDate[1]}
                        openModal={(type) => openModal(type)}
                    />
                ) : null}
                {training[activeTabIndex] ? (
                    <Workouts
                        workouts={training[activeTabIndex][1]?.wednesday}
                        date={arrDate[2]}
                        openModal={(type) => openModal(type)}
                    />
                ) : null}
                {training[activeTabIndex] ? (
                    <Workouts
                        workouts={training[activeTabIndex][1]?.thursday}
                        date={arrDate[3]}
                        openModal={(type) => openModal(type)}
                    />
                ) : null}
                {training[activeTabIndex] ? (
                    <Workouts
                        workouts={training[activeTabIndex][1]?.friday}
                        date={arrDate[4]}
                        openModal={(type) => openModal(type)}
                    />
                ) : null}
                {training[activeTabIndex] ? (
                    <Workouts
                        workouts={training[activeTabIndex][1]?.saturday}
                        date={arrDate[5]}
                        openModal={(type) => openModal(type)}
                    />
                ) : null}
                {training[activeTabIndex] ? (
                    <Workouts
                        workouts={training[activeTabIndex][1]?.sunday}
                        date={arrDate[6]}
                        openModal={(type) => openModal(type)}
                    />
                ) : null}
            </div>
        </div>
    );
};

export default TrainingTabs;
