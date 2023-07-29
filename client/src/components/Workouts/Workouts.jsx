import React, { useEffect } from "react";
import Carousel from "../Carousel/Carousel";
import PeopleAction from "../TrainingComponent/PeopleAction/PeopleAction";
import DataService from "../../API/DataService";
import { useFetching } from "../../hooks/useFetching";

const Workouts = ({ workouts, date }) => {
    // console.log(workouts.length);

    const [fetchingFollowTrain, isLoadingFollowTrain, errorFollowTrain] = useFetching(async (obj, trainId) => {
        const response = await DataService.postFollowTrain(obj, trainId);
        console.log(response.data);
    });

    const followTrain = (trainId) => {
        let newObj = {
            username: localStorage.getItem('username'),
        }

        console.log(newObj);

        fetchingFollowTrain(newObj, trainId);
    }

    const getTime = (date) => {
        let d = new Date(date);
        let time = `${d.getHours()}:${d.getMinutes()}`;
        return time;
    };
    return (
        <>
            <div className="workouts">
                <div className="workouts__date date-workouts">
                    <div className="date-workouts__week">ПН</div>
                    <div className="date-workouts__day">{`${
                        date.getDate() < 10
                            ? `0${date.getDate()}`
                            : date.getDate()
                    }.${
                        date.getMonth() < 10
                            ? `0${date.getMonth()}`
                            : date.getMonth()
                    }`}</div>
                </div>
                <div className="workouts__items">
                    {workouts.length > 3 ? (
                        <Carousel>
                            {workouts.map((workout, index) => (
                                <div key={workout.id} className="workouts__item workout">
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
                                                <div className="trainer-workout__label">
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
                                                <div onClick={() => followTrain(workout.id)} className="actions-workout__btn btn-workout">
                                                    Записаться
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Carousel>
                    ) : (
                        <div className="workouts__container">
                            {workouts.map((workout, index) => (
                                <div key={workout.id} className="workouts__item workout">
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
                                                <div className="trainer-workout__label">
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
                                                <div onClick={() => followTrain(workout.id)} className="actions-workout__btn btn-workout">
                                                    Записаться
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Workouts;
