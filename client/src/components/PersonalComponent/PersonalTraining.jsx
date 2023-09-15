import React from "react";
import PeopleAction from "../TrainingComponent/PeopleAction/PeopleAction";
import DataService from "../../API/DataService";
import { useFetching } from "../../hooks/useFetching";

const PersonalTraining = ({ train, setWorkoutTrain, workoutTrain }) => {
    const [unFetchingFollowTrain, isLoadingUnFollowTrain, errorUnFollowTrain] =
        useFetching(async (obj, trainId) => {
            const response = await DataService.postUnFollowTrain(obj, trainId);
            // console.log(response.data);
            for (let i = 0; i < workoutTrain.length; i++) {
                if (workoutTrain[i].id == response.data.id) {
                    let copy = Object.assign([], workoutTrain);
                    copy.splice(i, 1);
                    setWorkoutTrain(copy);
                    break;
                }
            }
        });
    const unFollowTrain = (trainId) => {
        // console.log(workouts);
        let newObj = {
            username: localStorage.getItem("username"),
        };

        console.log(newObj);

        unFetchingFollowTrain(newObj, trainId);
    };

    const getDateYear = (date) => {
        let d = new Date(date);
        let time = `${d.getDate() < 10 ? `0${d.getDate()}` : d.getDate()}.${
            d.getMonth() < 10 ? `0${d.getMonth()}` : d.getMonth()
        }.${d.getFullYear()}`;
        return time;
    };

    const getTime = (date) => {
        let d = new Date(date);
        let time = `${d.getHours() < 10 ? `0${d.getHours()}`:d.getHours()}:${d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes()}`;
        return time;
    };
    return (
        <div className="myworkouts-profile__workout workout-profile">
            <div className="workout-profile__title">{train.type}</div>
            <div className="workout-profile__date">
                {getDateYear(train.startTrain)}
            </div>
            <div className="workout-profile__time">
                {getTime(train.startTrain) + " - " + getTime(train.endTrain)}
            </div>
            <div className="workout-profile__active">
                {/* <PeopleAction
                    classAdd="workout-profile__people"
                    sportsmens={train.sportsmens}
                /> */}
                <button
                    onClick={() => unFollowTrain(train.id)}
                    className="workout-profile__follow"
                >
                    Выписаться
                </button>
            </div>
        </div>
    );
};

export default PersonalTraining;
