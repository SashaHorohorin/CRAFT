import React, { useEffect, useState } from "react";
import "./AdminPage.scss";
import Training from "../../components/AdminComponent/Training";
import InputSelect from "../../components/AdminComponent/InputSelect";
import InputText from "../../components/AdminComponent/InputText";
import { useFetching } from "../../hooks/useFetching";
import DataService from "../../API/DataService";
import ModalTrain from "../../components/AdminComponent/ModalTrain";

const AdminPage = () => {
    const [flagCreate, setFlagCreate] = useState(false);
    const [flagChange, setFlagChange] = useState(false);
    const [trainChange, setTrainChange] = useState({});

    const sportComplex = ["DINAMIT", "ALEKSEEVA", "IMPULS"];
    const typeTrain = [
        "Игровая с тренером",
        "Тренировка для начинающих и продолжающих",
        "Игровая",
    ];
    const [trainers, setTrainers] = useState([]);
    const [training, setTraining] = useState([]);
    const [trainIdChange, setTrainIdChange] = useState('');

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
            setTraining(response.data);
        }
    );
    const [fetchingDeleteTrain, isLoadingDeleteTrain, errorDeleteTrain] =
        useFetching(async (trainId) => {
            const response = await DataService.postDeleteTrain(trainId);
            console.log(response.data);
            setTraining(training.filter((train) => trainId !== train.id));
        });
    const [fetchinChangeTrain, isLoadinChangeTrain, erroChangeTrain] =
        useFetching(async (trainId, obj) => {
            const response = await DataService.postChangeTrain(trainId, obj);
            console.log(response.data);
            setTraining([
                ...training.filter((train) => trainId !== train.id),
                response.data,
            ]);
        });
    const [fetchinCreateTrain, isLoadinCreateTrain, erroCreateTrain] =
        useFetching(async (obj) => {
            const response = await DataService.postCreateTrain(obj);
            console.log(response.data);
            setTraining([...training, response.data]);
            // setTraining(training.filter((train) => (trainId !== train.id)));
        });

    const [dateTrain, setDateTrain] = useState({
        date: "",
        toTime: "",
        fromTime: "",
    });

    const [obj, setObj] = useState({
        type: typeTrain[0],
        maxParticipant: 10,
        trainersId: [],
        startTrain: "",
        endTrain: "",
        sportCompex: sportComplex[0],
    });

    useEffect(() => {
        fetchingTrainers();
        fetchingTraining();
    }, []);

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
            startTrain: utcDateStart,
            endTrain: utcDateEnd,
        };
        console.log(obj);

        fetchinCreateTrain(newObj);

        setObj(newObj);

        setFlagCreate(false);
    };
    const changePost = () => {
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
            startTrain: utcDateStart,
            endTrain: utcDateEnd,
        };
        console.log(newObj);

        fetchinChangeTrain(trainIdChange, newObj);

        setObj(newObj);

        setFlagChange(false)
    };

    const openModalChange = (trainId, train) => {
        setTrainChange(train);
        setFlagChange(true)
        console.log(trainId);
        if(trainId){
            setTrainIdChange(trainId)
        }
        
    }

    return (
        <div className="admin">
            <ModalTrain
                handleFunctionDate={(e) => handleFunctionDate(e)}
                handleFunction={(e) => handleFunction(e)}
                type="create"
                maxParticipant={obj.maxParticipant}
                funcBtn={() => createPost()}
                flag={flagCreate}
                trainers={trainers}
                setFlag={(bool) => setFlagCreate(bool)}
            />
            <ModalTrain
                handleFunctionDate={(e) => handleFunctionDate(e)}
                handleFunction={(e) => handleFunction(e)}
                maxParticipant={obj.maxParticipant}
                type="change"
                train={trainChange}
                funcBtn={() => changePost()}
                flag={flagChange}
                trainers={trainers}
                setFlag={(bool) => setFlagChange(bool)}
            />

            <div className="container">
                <div className="admin__title">Панель администратора</div>
                <div className="admin__row">
                    <div className="admin__nav nav-admin">
                        <div className="nav-admin__title">Модели</div>
                        <ul className="nav-admin__links">
                            <li className="nav-admin__link">Тренировки</li>
                            <li className="nav-admin__link">Соревнования</li>
                            <li className="nav-admin__link">Новости</li>
                            <li className="nav-admin__link">Тренеры</li>
                        </ul>
                    </div>

                    <div className="admin__main">
                        <div
                            onClick={() => setFlagCreate(true)}
                            className="admin__create-btn"
                        >
                            Создать
                        </div>
                        <div className="admin__items">
                            {training.map((train, index) => (
                                <Training
                                    deleteTrain={(trainId) =>
                                        fetchingDeleteTrain(trainId)
                                    }
                                    changeModalOpen={(trainId) => openModalChange(trainId)}
                                    key={train.id}
                                    train={train}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
