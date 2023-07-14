import React, { useEffect, useState } from "react";
import "./TrainingPage.scss";
import DataService from "../../API/DataService";
import { useFetching } from "../../hooks/useFetching";

const TrainingPage = () => {

  const [training, setTraining] = useState({});

    const [fetchingTraining, isLoadingTraining, errorTraining] = useFetching(async () => {
        const response = await DataService.getTrainingCalendar();
        // setTraining(response)
        console.log(response.data);
    });

    useEffect(()=>{
      fetchingTraining();
    }, [])

    return <h1>TrainingPage</h1>;
};

export default TrainingPage;
