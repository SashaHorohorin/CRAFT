import React, { useContext, useEffect, useState } from "react";
import Carousel from "../Carousel/Carousel";
import PeopleAction from "../TrainingComponent/PeopleAction/PeopleAction";
import DataService from "../../API/DataService";
import { useFetching } from "../../hooks/useFetching";
import { useNavigate } from "react-router";
import { Context } from "../..";
import { observer, observerBatching } from "mobx-react-lite";
import { Link } from "react-router-dom";

const Workouts = ({ workouts, date, openModal, type }) => {
    const [workoutTrain, setWorkoutTrain] = useState([]);
    const { eventStore } = useContext(Context);

    const navigate = useNavigate();
    let weightWin = window.innerWidth;
    let day = ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];
    useEffect(() => {
        if (workouts) {
            workouts.sort((a, b) => (a?.startTime < b?.startTime ? 1 : -1));
            setWorkoutTrain(workouts);
        }
    }, [workouts]);

    // const widthWindow = () => {
    //     console.log(window.innerWidth);
    // }

    const [fetchingFollowTrain, isLoadingFollowTrain, errorFollowTrain] =
        useFetching(async (obj, trainId) => {
            const response = await DataService.postFollowTrain(obj, trainId).catch(error => {
                
                eventStore.setErrorTraining(error.response.data.message);
                eventStore.setFlagErrorTraining(true)
                // fetchingCompetition(id)

                console.log(eventStore.errorTraining);
                console.log(eventStore.flagErrorTraining);
                setTimeout(() => {
                    eventStore.setFlagErrorTraining(false)
                }, 3000)
            });
            for (let i = 0; i < workoutTrain.length; i++) {
                if (workoutTrain[i].id == response.data.id) {
                    let copy = Object.assign([], workoutTrain);
                    copy[i] = response.data;
                    setWorkoutTrain(copy);
                    // console.log(workoutTrain);
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
        console.log(workoutTrain);
        console.log(type);
        let newObj = {
            username: localStorage.getItem("username"),
        };

        console.log(newObj);

        if (!localStorage.getItem("username")) {
            navigate("/auth/login");
        } else {
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
        let time = `${d.getHours() < 10 ? `0${d.getHours()}` : d.getHours()}:${
            d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes()
        }`;
        return time;
    };
    const getDateYear = (date) => {
        let d = new Date(date);
        let time = `${d.getDate() < 10 ? `0${d.getDate()}` : d.getDate()}.${
            d.getMonth() < 9 ? `0${d.getMonth() + 1}` : d.getMonth() + 1
        }.${d.getFullYear()}`;
        return time;
    };
    const openModalAddPair = (id) => {
        if (!localStorage.getItem("username")) {
            navigate("/auth/login");
        } else {
            navigate(`/competitions/applications/${id}`);
            eventStore.setFlagOpenModalAddPair(true);
        }
    };

    return (
        <>
            {/* {isLoadingFollowTrain ? (
                <div className="load">Грузится...</div>
            ) : ( */}
            <div className="workouts">
                <div className="workouts__date date-workouts">
                    <div className="date-workouts__week">
                        {day[date.getDay()]}
                    </div>
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
                <div
                    className="workouts__items"
                    style={
                        weightWin > 1148
                            ? workoutTrain.length > 3
                                ? {
                                      overflowX: "scroll",
                                  }
                                : null
                            : workoutTrain.length > 2
                            ? {
                                  overflowX: "scroll",
                              }
                            : null
                    }
                >
                    <div className="workouts__container">
                        {type == 'mobile' ? (
                            workoutTrain.length != 0 ? (null) : (<div className="training-none">{'В выбранный день нету тренировок'}</div>)
                        ) : (null)}
                        <>
                            {workoutTrain.map((workout, index) =>
                                workout.itemType == "TRAIN" ? (
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
                                                    <div
                                                        onClick={() =>
                                                            openModal(workout)
                                                        }
                                                        className="info-workout__btn btn-workout"
                                                    >
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
                                                        {
                                                            workout.trainers[0]
                                                                ?.name
                                                        }
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
                                ) : (
                                    <div
                                        key={workout.id}
                                        className="workouts__item workouts-competition"
                                    >
                                        <div className="workouts-competition__row">
                                            <div className="workouts-competition__column">
                                                <div className="workouts-competition__info">
                                                    <div className="workouts-competition__type">
                                                        {"Соревнование " +
                                                            workout.type +
                                                            " " +
                                                            workout.category}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="workouts-competition__column">
                                                <div className="workout__time time-workout">
                                                    <div className="time-workout__label">
                                                        Дата
                                                    </div>
                                                    <div className="time-workout__interval">
                                                        {getDateYear(
                                                            workout.startCompetition
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="workouts-competition__column">
                                                <div className="workout__time time-workout">
                                                    <div className="time-workout__label">
                                                        Время
                                                    </div>
                                                    <div className="time-workout__interval">
                                                        {getTime(
                                                            workout.startCompetition
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="workouts-competition__column">
                                                <div className="workouts-competition__btns">
                                                    {/* <div className="workouts-competition__more-info btn-workout">подробнее</div> */}
                                                    <Link
                                                        onClick={() =>
                                                            eventStore.setCompetition(
                                                                workout
                                                            )
                                                        }
                                                        to={`/competitions/applications/${workout.id}`}
                                                        className="workouts-competition__list btn-workout"
                                                    >
                                                        Заявки
                                                    </Link>

                                                    <div
                                                        onClick={() =>
                                                            openModalAddPair(
                                                                workout.id
                                                            )
                                                        }
                                                        className="workouts-competition__list btn-workout"
                                                    >
                                                        Записаться
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            )}
                        </>
                    </div>
                </div>
            </div>
            {/* )} */}
        </>
    );
};

export default observer(Workouts);
