import React, { useEffect, useState } from "react";
import "./TrainingPage.scss";
import DataService from "../../API/DataService";
import { useFetching } from "../../hooks/useFetching";
import Workouts from "../../components/Workouts/Workouts";

const TrainingPage = () => {
    const [arrDate, setArrDate] = useState([]);
    const [training, setTraining] = useState([]);
    const [activeTabIndex, setActiveTabIndex] = useState(0);

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
      for(let i = 0; i < 7; i++){
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

    return (
        <>
            {isLoadingTraining ? (
                <div>Грузится</div>
            ) : (
                <div className="trainingPage">
                    <div className="container">
                        <div className="trainingPage__title">Расписание</div>
                        
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
                            <div className="tabs-info__content">
                                {/* {training[activeTabIndex] ? (training[activeTabIndex][1]?.sunday[0]?.type) : null} */}
                                {training[activeTabIndex] ? (
                                    <Workouts
                                        workouts={
                                            training[activeTabIndex][1]?.monday
                                        }
                                        date={arrDate[0]}
                                    />
                                    
                                ) : null}
                                {training[activeTabIndex] ? (
                                    <Workouts
                                        workouts={
                                            training[activeTabIndex][1]?.tuesday
                                        }
                                        date={arrDate[1]}
                                    />
                                ) : null}
                                {training[activeTabIndex] ? (
                                    <Workouts
                                        workouts={
                                            training[activeTabIndex][1]
                                                ?.wednesday
                                        }
                                        date={arrDate[2]}
                                    />
                                ) : null}
                                {training[activeTabIndex] ? (
                                    <Workouts
                                        workouts={
                                            training[activeTabIndex][1]
                                                ?.thursday
                                        }
                                        date={arrDate[3]}
                                    />
                                ) : null}
                                {training[activeTabIndex] ? (
                                    <Workouts
                                        workouts={
                                            training[activeTabIndex][1]?.friday
                                        }
                                        date={arrDate[4]}
                                    />
                                ) : null}
                                {training[activeTabIndex] ? (
                                    <Workouts
                                        workouts={
                                            training[activeTabIndex][1]
                                                ?.saturday
                                        }
                                        date={arrDate[5]}
                                    />
                                ) : null}
                                {training[activeTabIndex] ? (
                                    <Workouts
                                        workouts={
                                            training[activeTabIndex][1]?.sunday
                                        }
                                        date={arrDate[6]}
                                    />
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default TrainingPage;
