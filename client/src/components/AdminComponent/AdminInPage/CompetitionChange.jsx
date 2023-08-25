import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../../..";
import Competition from "../Competition";
import DataService from "../../../API/DataService";
import { useFetching } from "../../../hooks/useFetching";

const CompetitionChange = () => {
    const { competitionChange } = useContext(Context);

    const [fetchingDeleteCompetition, isLoadingDeleteCompetition, errorDeleteCompetition] =
    useFetching(async (competitionId) => {
        const response = await DataService.postDeleteCompetition(competitionId);
        console.log(response.data);
        competitionChange.setCompetitions(
            competitionChange.competitions.filter((competition) => competitionId !== competition.id)
        );
    });
    
    const openModalChange = (trainId, train) => {
        console.log(train);
        competitionChange.setCompetitionChange(train);
        competitionChange.setOpenModalCompetitionChange(true);
        console.log(trainId);
        if (trainId) {
            competitionChange.setCompetitionIdChange(trainId);
        }
        // console.log(trainingChange.trainIdChange);
    };

    return (
        <div className="admin__main">
            <div className="admin__btns">
                <div
                    onClick={() =>
                        competitionChange.setOpenModalCompetitionCreate(true)
                    }
                    className="admin__create-btn"
                >
                    Создать
                </div>
                <div className="admin__send-btn">
                    Сделать расылку
                </div>
            </div>
            <div className="admin__items">
                {competitionChange.competitions.map((competition, index) => (
                    <Competition
                        deleteTrain={() => fetchingDeleteCompetition(competition.id)}
                        changeModalOpen={() => openModalChange(competition.id, competition)}
                        key={competition.id}
                        competition={competition}
                    />
                ))}
            </div>
        </div>
    );
};

export default observer(CompetitionChange);
