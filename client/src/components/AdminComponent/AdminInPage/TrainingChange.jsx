import React, { useContext } from "react";
import Training from "../Training";
import { observer } from "mobx-react-lite";
import { Context } from "../../..";
import DataService from "../../../API/DataService";
import { useFetching } from "../../../hooks/useFetching";

const TrainingChange = () => {
    const { trainingChange } = useContext(Context);

    const [fetchingDeleteTrain, isLoadingDeleteTrain, errorDeleteTrain] =
        useFetching(async (trainId) => {
            const response = await DataService.postDeleteTrain(trainId);
            console.log(response.data);
            trainingChange.setTraining(
                trainingChange.training.filter((train) => trainId !== train.id)
            );
        });

    const openModalChange = (trainId, train) => {
        console.log(train);
        trainingChange.setTrainChange(train);
        trainingChange.setOpenModalTrainingChange(true);
        console.log(trainId);
        if (trainId) {
            trainingChange.setTrainIdChange(trainId);
        }
        // console.log(trainingChange.trainIdChange);
    };

    return (
        <div className="admin__main">
            <div
                onClick={() => trainingChange.setOpenModalTrainingCreate(true)}
                className="admin__create-btn"
            >
                Создать
            </div>
            <div className="admin__items">
                {trainingChange.training.map((train, index) => (
                    <Training
                        deleteTrain={() => fetchingDeleteTrain(train.id)}
                        changeModalOpen={() => openModalChange(train.id, train)}
                        key={train.id}
                        train={train}
                    />
                ))}
            </div>
        </div>
    );
};

export default observer(TrainingChange);
