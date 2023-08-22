import React, { useContext, useEffect, useState } from "react";
import "./AdminPage.scss";
import Training from "../../components/AdminComponent/Training";
import InputSelect from "../../components/AdminComponent/InputSelect";
import InputText from "../../components/AdminComponent/InputText";
import { useFetching } from "../../hooks/useFetching";
import DataService from "../../API/DataService";
import ModalTrain from "../../components/AdminComponent/ModalTrain";
import TrainingChange from "../../components/AdminComponent/AdminInPage/TrainingChange";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import ModalCompetition from "../../components/AdminComponent/ModalCompetition";

const AdminPage = () => {
    const { trainingChange, competitionChange } = useContext(Context);


    const sportComplex = ["DINAMIT", "ALEKSEEVA", "IMPULS"];
    const typeTrain = [
        "Игровая с тренером",
        "Тренировка для начинающих и продолжающих",
        "Игровая",
    ];
    const typeCompetition = ['PAIR', 'TWO', 'THREE'];
    const [trainers, setTrainers] = useState([]);

    const [fetchingTrainers, isLoadingTrainers, errorTrainers] = useFetching(
        async () => {
            const response = await DataService.getTrainerAll();
            console.log(response.data);
            setTrainers(response.data);
            setObj({
                ...obj,
                trainersId: [response.data[0]?.id],
            });
        }
    );
    const [fetchingTraining, isLoadingTraining, errorTraining] = useFetching(
        async () => {
            const response = await DataService.getTrainingAll();
            console.log(response.data);
            trainingChange.setTraining(response.data);
        }
    );

    const [fetchinChangeTrain, isLoadinChangeTrain, erroChangeTrain] =
        useFetching(async (trainId, obj) => {
            const response = await DataService.postChangeTrain(trainId, obj);
            console.log(response.data);
            trainingChange.setTraining([
                ...trainingChange.training.filter((train) => trainId !== train.id),
                response.data,
            ]);
        });
    const [fetchinCreateTrain, isLoadinCreateTrain, erroCreateTrain] =
        useFetching(async (obj) => {
            const response = await DataService.postCreateTrain(obj);
            console.log(response.data);
            trainingChange.setTraining([...trainingChange.training, response.data]);
            // setTraining(training.filter((train) => (trainId !== train.id)));
        });

    const [dateTrain, setDateTrain] = useState({
        date: "",
        toTime: "",
        fromTime: "",
    });

    const [obj, setObj] = useState({
        type: typeTrain[2],
        maxParticipant: 10,
        trainersId: [],
        startTrain: "",
        endTrain: "",
        sportCompex: sportComplex[0],
    });

    const handleFunction = (e) => {
        // e.preventDefault();
        const name = e.target.name;
        let value = e.target.value;
        console.log("name: " + name);
        console.log("value: " + value);
        let newObj = {};
        if (name == "trainersId") {
            newObj = {
                ...obj,
                trainersId: [value],
            };
        } else {
            newObj = {
                ...obj,
                [name]: value,
            };
        }
        setObj(newObj);
        // console.log(obj);
    };

    const handleFunctionDate = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        console.log("name: " + name);
        console.log("value: " + value);
        let newObjDate = {
            ...dateTrain,
            [name]: value,
        };
        setDateTrain(newObjDate);
    };

    const createPost = () => {
        console.log(dateTrain);
        // let d = new Date(Date.UTC(dateTrain.date[0], -dateTrain.date[1], dateTrain.date[2],dateTrain.toTime[0], dateTrain.toTime[1]));
        let d1 = dateTrain.date.split(/\D/);
        let t1 = dateTrain.toTime.split(":");
        let d2 = dateTrain.date.split(/\D/);
        let t2 = dateTrain.fromTime.split(":");
        const utcDateStart = new Date(
            Date.UTC(d1[0], --d1[1], d1[2], t1[0], t1[1])
        );
        const utcDateEnd = new Date(
            Date.UTC(d2[0], --d2[1], d2[2], t2[0], t2[1])
        );
        console.log(new Date(utcDateEnd));
        let newObj = {
            ...obj,
            startTrain: utcDateStart - 10800000,
            endTrain: utcDateEnd - 10800000,
        };
        console.log(obj);

        fetchinCreateTrain(newObj); // ======

        setObj(newObj);

        trainingChange.setOpenModalTrainingCreate(false);
    };
    const changePost = (obj, dateTrain) => {
        // console.log(dateTrain);
        // let d = new Date(Date.UTC(dateTrain.date[0], -dateTrain.date[1], dateTrain.date[2],dateTrain.toTime[0], dateTrain.toTime[1]));
        let d1 = dateTrain.date.split(/\D/);
        let t1 = dateTrain.toTime.split(":");
        let d2 = dateTrain.date.split(/\D/);
        let t2 = dateTrain.fromTime.split(":");
        const utcDateStart = new Date(
            Date.UTC(d1[0], --d1[1], d1[2], t1[0], t1[1])
        );
        const utcDateEnd = new Date(
            Date.UTC(d2[0], --d2[1], d2[2], t2[0], t2[1])
        );
        console.log(new Date(utcDateEnd));
        let newObj = {
            ...obj,
            startTrain: utcDateStart - 10800000,
            endTrain: utcDateEnd - 10800000,
        };
        console.log(newObj);

        fetchinChangeTrain(trainingChange.trainIdChange, newObj);

        // setObj(newObj);

        trainingChange.setOpenModalTrainingChange(false);
    };

    // ===========================================================<COMPETITION>
    const [dateCompetition, setDateCompetition] = useState({
        date: "",
        toTime: "",
    });
    const [objCompetition, setObjCompetition] = useState({
        type: typeCompetition[0],
        maxPair: 9,
        startCompetition: "",
        sportComplex: sportComplex[0],
    });

    const [fetchingCompetition, isLoadingCompetition, errorCompetition] = useFetching(
        async () => {
            const response = await DataService.getCompetitionAll();
            console.log(response.data);
            competitionChange.setCompetitions(response.data);
        }
    );

    const [fetchinChangeCompetition, isLoadinChangeCompetition, erroChangeCompetition] =
        useFetching(async (trainId, obj) => {
            const response = await DataService.postChangeCompetition(trainId, obj);
            console.log(response.data);
            competitionChange.setCompetitions([
                ...competitionChange.competitions.filter((train) => trainId !== train.id),
                response.data,
            ]);
        });

    const [fetchinCreateCompetition, isLoadinCreateCompetition, erroCreateCompetition] =
        useFetching(async (obj) => {
            const response = await DataService.postCreateCompetition(obj);
            console.log(response.data);
            competitionChange.setCompetitions([...competitionChange.competitions, response.data]);
            // setTraining(training.filter((train) => (trainId !== train.id)));
        }
    );
    const handleFunctionCompetition = (e) => {
        // e.preventDefault();
        const name = e.target.name;
        let value = e.target.value;
        console.log("name: " + name);
        console.log("value: " + value);
        let newObj = {};

            newObj = {
                ...objCompetition,
                [name]: value,
            };
        setObjCompetition(newObj);
        // console.log(obj);
    };

    const handleFunctionDateCompetition = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        console.log("name: " + name);
        console.log("value: " + value);
        let newObjDate = {
            ...dateCompetition,
            [name]: value,
        };
        // console.log(newObjDate);
        setDateCompetition(newObjDate);
    };
    const createCompetition = () => {
        // console.log(dateTrain);
        // let d = new Date(Date.UTC(dateTrain.date[0], -dateTrain.date[1], dateTrain.date[2],dateTrain.toTime[0], dateTrain.toTime[1]));
        let d1 = dateCompetition.date.split(/\D/);
        let t1 = dateCompetition.toTime.split(":");
        const utcDateStart = new Date(
            Date.UTC(d1[0], --d1[1], d1[2], t1[0], t1[1])
        );

        console.log(utcDateStart);

        let newObj = {
            ...objCompetition,
            startCompetition: utcDateStart - 10800000,
        };

        console.log(newObj);

        fetchinCreateCompetition(newObj); // ======

        setObjCompetition(newObj);

        competitionChange.setOpenModalCompetitionCreate(false);
    };

    const changeCompetition = (obj, dateTrain) => {
        let d1 = dateTrain.date.split(/\D/);
        let t1 = dateTrain.toTime.split(":");
        
        const utcDateStart = new Date(
            Date.UTC(d1[0], --d1[1], d1[2], t1[0], t1[1])
        );
        
        // console.log(new Date(utcDateEnd));
        let newObj = {
            ...objCompetition,
            startCompetition: utcDateStart - 10800000,
        };
        // console.log(newObj);

        fetchinChangeCompetition(competitionChange.competitionIdChange, newObj);

        // setObj(newObj);

        competitionChange.setOpenModalCompetitionChange(false);
    };
        
    // ===========================================================<COMPETITION>
    // ===========================================================<EVENT>



    // ===========================================================<EVENT>

    useEffect(() => {
        fetchingTrainers();
        fetchingTraining();
        fetchingCompetition();
    }, []);

    return (
        <div className="admin">
            <ModalTrain
                handleFunctionDate={(e) => handleFunctionDate(e)}
                handleFunction={(e) => handleFunction(e)}
                type="create"
                maxParticipant={obj.maxParticipant}
                funcBtn={() => createPost()}
                flag={trainingChange.openModalTrainingCreate}
                trainers={trainers}
                setFlag={(bool) => trainingChange.setOpenModalTrainingCreate(bool)}
            />
            <ModalTrain
                handleFunctionDate={(e) => handleFunctionDate(e)}
                handleFunction={(e) => handleFunction(e)}
                maxParticipant={obj.maxParticipant}
                type="change"
                train={trainingChange.trainChange}
                funcBtn={(sendObj, dateTrain) => changePost(sendObj, dateTrain)}
                flag={trainingChange.openModalTrainingChange}
                trainers={trainers}
                setFlag={(bool) => trainingChange.setOpenModalTrainingChange(bool)}
            />


            <ModalCompetition
                handleFunctionDate={(e) => handleFunctionDateCompetition(e)}
                handleFunction={(e) => handleFunctionCompetition(e)}
                type="create"
                maxParticipant={objCompetition.maxPair} // ====
                funcBtn={() => createCompetition()}
                flag={competitionChange.openModalCompetitionCreate}
                setFlag={(bool) => competitionChange.setOpenModalCompetitionCreate(bool)}
            />
            <ModalCompetition
                handleFunctionDate={(e) => handleFunctionDateCompetition(e)}
                handleFunction={(e) => handleFunctionCompetition(e)}
                maxParticipant={objCompetition.maxPair}
                type="change"
                train={competitionChange.competitionChange}
                funcBtn={(sendObj, dateTrain) => changeCompetition(sendObj, dateTrain)}
                flag={competitionChange.openModalCompetitionChange}
                setFlag={(bool) => competitionChange.setOpenModalCompetitionChange(bool)}
            />

            <div className="container">
                <div className="admin__title">Панель администратора</div>
                <div className="admin__row">
                    <div className="admin__nav nav-admin">
                        <div className="nav-admin__title">Модели</div>
                        <ul className="nav-admin__links">
                            <Link to="training-change" className="nav-admin__link">Тренировки</Link>
                            <Link to="competition-change" className="nav-admin__link">Соревнования</Link>
                            <Link to="event-change" className="nav-admin__link">Новости</Link>
                            <li className="nav-admin__link">Тренеры</li>
                        </ul>
                    </div>
                    <div className="admin__main">
                        <Outlet/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default observer(AdminPage);
