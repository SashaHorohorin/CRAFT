import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../../..";
import Competition from "../Competition";
import DataService from "../../../API/DataService";
import { useFetching } from "../../../hooks/useFetching";
import Coach from "../Coach";

const CoachChange = () => {
    const { coachChange } = useContext(Context);

    const [fetchingDeleteCoach, isLoadingDeleteCoach, errorDeleteCoach] =
        useFetching(async (coachId) => {
            const response = await DataService.fetchDeleteCoach(coachId);
            console.log(response.data);
            coachChange.setCoaches(
                coachChange.coaches.filter((coach) => coachId !== coach.id)
            );
        });


    const openModalChange = (coachId, coach) => {
        coachChange.setCoachChange(coach);
        coachChange.setOpenModalCoachChange(true);
        if (coachId) {
            coachChange.setCoachIdChange(coachId);
        }
    };

    return (
        <div className="admin__main">
            <div className="admin__btns">
                <div
                    onClick={() =>
                        coachChange.setOpenModalCoachCreate(true)
                    }
                    className="admin__create-btn"
                >
                    Добавить тренера
                </div>
            </div>
            <div className="admin__items">
                {coachChange?.coaches.map((coach, index) => (
                    <Coach
                        deleteCoach={() => fetchingDeleteCoach(coach.id)}
                        changeModalOpen={() => openModalChange(coach.id, coach)}
                        key={coach.id}
                        coach={coach}
                    />
                ))}
            </div>
        </div>
    );
};

export default observer(CoachChange);
