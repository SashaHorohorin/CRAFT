import React, { useEffect, useState } from "react";
import Carousel from "../Carousel/Carousel";
import PeopleAction from "../TrainingComponent/PeopleAction/PeopleAction";
import DataService from "../../API/DataService";
import { useFetching } from "../../hooks/useFetching";
import { useNavigate } from "react-router";

const Workouts = ({ workouts, date }) => {
    // console.log(workouts.length);
    const [workoutTrain, setWorkoutTrain] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("------------");
        workouts.sort((a, b) => (a.startTime < b.startTime ? 1 : -1));
        setWorkoutTrain(workouts);
    }, [workouts]);

    const [fetchingFollowTrain, isLoadingFollowTrain, errorFollowTrain] =
        useFetching(async (obj, trainId) => {
            const response = await DataService.postFollowTrain(obj, trainId);
            for (let i = 0; i < workoutTrain.length; i++) {
                if (workoutTrain[i].id == response.data.id) {
                    let copy = Object.assign([], workoutTrain);
                    copy[i] = response.data;
                    setWorkoutTrain(copy);
                    console.log(workoutTrain);
                    break;
                }
            }

            // console.log(response.data);
        });
    const [unFetchingFollowTrain, isLoadingUnFollowTrain, errorUnFollowTrain] =
        useFetching(async (obj, trainId) => {
            const response = await DataService.postUnFollowTrain(obj, trainId);
            // console.log(response.data);
            for (let i = 0; i < workoutTrain.length; i++) {
                if (workoutTrain[i].id == response.data.id) {
                    let copy = Object.assign([], workoutTrain);
                    copy[i] = response.data;
                    // console.log(copy);
                    // setWorkoutTrain(null);
                    // console.log(workoutTrain);

                    setWorkoutTrain(copy);

                    // console.log(workoutTrain);
                    break;
                }
            }

        });

    const workLog = (workout) => {
        console.log(
            workout.sportsmens.filter(
                (sportsmen) =>
                    sportsmen.username == localStorage.getItem("username")
            )
        );
        console.log(workout.sportsmens);
    };

    const followTrain = (trainId) => {
        console.log(workouts);
        let newObj = {
            username: localStorage.getItem("username"),
        };

        console.log(newObj);

        if(!localStorage.getItem('username')){
            navigate('/auth/login')
        }
        else{
            fetchingFollowTrain(newObj, trainId);
        }

        
    };

    const unFollowTrain = (trainId) => {
        console.log(workouts);
        let newObj = {
            username: localStorage.getItem("username"),
        };

        console.log(newObj);

        unFetchingFollowTrain(newObj, trainId);
    };

    const getTime = (date) => {
        
        let d = new Date(date);
        let time = `${d.getHours() < 10 ? `0${d.getHours()}`:d.getHours()}:${d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes()}`;
        return time;
    };
    return (
        <>
            {/* {isLoadingFollowTrain ? (
                <div className="load">Грузится...</div>
            ) : ( */}
            <div className="workouts">
                <div className="workouts__date date-workouts">
                    <div className="date-workouts__week">ПН</div>
                    <div className="date-workouts__day">{`${
                        date.getDate() < 10
                            ? `0${date.getDate()}`
                            : date.getDate()
                    }.${
                        date.getMonth() < 9
                            ? `0${date.getMonth() + 1}`
                            : date.getMonth() + 1
                    }`}</div>
                </div>
                <div className="workouts__items">
                    {workoutTrain.length > 3 ? (
                        <Carousel>
                            {workoutTrain.map((workout, index) => (
                                <div
                                    key={workout.id}
                                    className="workouts__item workout"
                                >
                                    <div className="workout__row">
                                        <div className="workout__column">
                                            <div className="workout__info info-workout">
                                                <div className="info-workout__name">
                                                    {workout.type}
                                                </div>
                                                <div className="info-workout__btn btn-workout">
                                                    подробнее
                                                </div>
                                            </div>
                                        </div>
                                        <div className="workout__column">
                                            <div className="workout__time time-workout">
                                                <div className="time-workout__label">
                                                    Время
                                                </div>
                                                <div className="time-workout__interval">
                                                    {getTime(
                                                        workout.startTrain
                                                    ) +
                                                        " - " +
                                                        getTime(
                                                            workout.endTrain
                                                        )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="workout__column">
                                            <div className="workout__trainer trainer-workout">
                                                <div
                                                    onClick={() =>
                                                        workLog(workout)
                                                    }
                                                    className="trainer-workout__label"
                                                >
                                                    Тренер
                                                </div>
                                                <div className="trainer-workout__name">
                                                    {workout.trainers[0].name}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="workout__column">
                                            <div className="workout__actions actions-workout">
                                                <PeopleAction
                                                    sportsmens={
                                                        workout.sportsmens
                                                    }
                                                />
                                                {workout.sportsmens.filter(
                                                    (sportsmen) =>
                                                        sportsmen.username ==
                                                        localStorage.getItem(
                                                            "username"
                                                        )
                                                ).length == 0 ? (
                                                    <div
                                                        onClick={() =>
                                                            followTrain(
                                                                workout.id
                                                            )
                                                        }
                                                        className="actions-workout__btn btn-workout"
                                                    >
                                                        Записаться
                                                    </div>
                                                ) : (
                                                    <div
                                                        onClick={() =>
                                                            unFollowTrain(
                                                                workout.id
                                                            )
                                                        }
                                                        className="actions-workout__btn btn-workout"
                                                    >
                                                        Выписаться
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Carousel>
                    ) : (
                        <div className="workouts__container">
                            {workoutTrain.map((workout, index) => (
                                <div
                                    key={workout.id}
                                    className="workouts__item workout"
                                >
                                    <div className="workout__row">
                                        <div className="workout__column">
                                            <div className="workout__info info-workout">
                                                <div className="info-workout__name">
                                                    {workout.type}
                                                </div>
                                                <div className="info-workout__btn btn-workout">
                                                    подробнее
                                                </div>
                                            </div>
                                        </div>
                                        <div className="workout__column">
                                            <div className="workout__time time-workout">
                                                <div className="time-workout__label">
                                                    Время
                                                </div>
                                                <div className="time-workout__interval">
                                                    {getTime(
                                                        workout.startTrain
                                                    ) +
                                                        " - " +
                                                        getTime(
                                                            workout.endTrain
                                                        )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="workout__column">
                                            <div className="workout__trainer trainer-workout">
                                                <div
                                                    onClick={() =>
                                                        workLog(workout)
                                                    }
                                                    className="trainer-workout__label"
                                                >
                                                    Тренер
                                                </div>
                                                <div className="trainer-workout__name">
                                                    {workout.trainers[0].name}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="workout__column">
                                            <div className="workout__actions actions-workout">
                                                <PeopleAction
                                                    sportsmens={
                                                        workout.sportsmens
                                                    }
                                                />
                                                {workout.sportsmens.filter(
                                                    (sportsmen) =>
                                                        sportsmen.username ==
                                                        localStorage.getItem(
                                                            "username"
                                                        )
                                                ).length == 0 ? (
                                                    <div
                                                        onClick={() =>
                                                            followTrain(
                                                                workout.id
                                                            )
                                                        }
                                                        className="actions-workout__btn btn-workout"
                                                    >
                                                        Записаться
                                                    </div>
                                                ) : (
                                                    <div
                                                        onClick={() =>
                                                            unFollowTrain(
                                                                workout.id
                                                            )
                                                        }
                                                        className="actions-workout__btn btn-workout"
                                                    >
                                                        Выписаться
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            {/* )} */}
        </>
    );
};

export default Workouts;
