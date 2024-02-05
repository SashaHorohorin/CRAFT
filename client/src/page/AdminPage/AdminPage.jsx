import React, { useContext, useEffect, useState } from "react";
import "./AdminPage.scss";
import Training from "../../components/AdminComponent/Training";
import InputSelect from "../../components/AdminComponent/InputSelect";
import InputText from "../../components/AdminComponent/InputText";
import { useFetching } from "../../hooks/useFetching";
import ModalTrain from "../../components/AdminComponent/ModalTrain";
import TrainingChange from "../../components/AdminComponent/AdminInPage/TrainingChange";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import ModalCompetition from "../../components/AdminComponent/ModalCompetition";
import ModalEvent from "../../components/AdminComponent/ModalEvent";
import axios from "axios";
import $api, { HOST } from "../../http";
import FormData from "form-data";
import { set } from "mobx";
import DataService from "../../API/DataService";

const AdminPage = () => {
    const { trainingChange, competitionChange, eventChange } =
        useContext(Context);

    const sportComplex = ["DINAMIT", "ALEKSEEVA", "IMPULS"];
    // const typeTrain = [
    //     "Игровая с тренером",
    //     "Тренировка для начинающих и продолжающих",
    //     "Игровая",
    // ];
    const typeTrain = [
        "Тактическая игровая",
        "Тренировка с тренером",
        "Игровая",
        "Детская тренировка",
    ];
    const typeCompetition = ["Пара", "Микст", "Все против всех"];
    const categoryCompetition = ["EF", "DE", "CD", "BC", "AB"];
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
                ...trainingChange.training.filter(
                    (train) => trainId !== train.id
                ),
                response.data,
            ]);
        });
    const [fetchinCreateTrain, isLoadinCreateTrain, erroCreateTrain] =
        useFetching(async (obj) => {
            const response = await DataService.postCreateTrain(obj);
            console.log(response.data);
            trainingChange.setTraining([
                ...trainingChange.training,
                response.data,
            ]);
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
        sportComplex: sportComplex[0],
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
        console.log(newObj);

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
        category: categoryCompetition[0],
        maxPair: 9,
        startCompetition: "",
        sportComplex: sportComplex[0],
    });

    const [fetchingCompetition, isLoadingCompetition, errorCompetition] =
        useFetching(async () => {
            const response = await DataService.getCompetitionAll();
            console.log(response.data);
            competitionChange.setCompetitions(response.data);
        });

    const [
        fetchinChangeCompetition,
        isLoadinChangeCompetition,
        erroChangeCompetition,
    ] = useFetching(async (trainId, obj) => {
        const response = await DataService.postChangeCompetition(trainId, obj);
        console.log(trainId, response.data);
        competitionChange.setCompetitions([
            ...competitionChange.competitions.filter(
                (train) => trainId !== train.id
            ),
            response.data,
        ]);
    });

    const [
        fetchinCreateCompetition,
        isLoadinCreateCompetition,
        erroCreateCompetition,
    ] = useFetching(async (obj) => {
        const response = await DataService.postCreateCompetition(obj);
        console.log(response.data);
        competitionChange.setCompetitions([
            ...competitionChange.competitions,
            response.data,
        ]);
        // setTraining(training.filter((train) => (trainId !== train.id)));
    });
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
            ...obj,
            startCompetition: utcDateStart - 10800000,
        };
        // console.log(newObj);

        fetchinChangeCompetition(competitionChange.competitionIdChange, newObj);

        // setObj(newObj);

        competitionChange.setOpenModalCompetitionChange(false);
    };

    // ===========================================================<COMPETITION>
    // ===========================================================<EVENT>
    const [file, setFile] = useState({});

    const [fetchingEvent, isLoadingEvent, errorEvent] = useFetching(
        async (count) => {
            const response = await DataService.getEventsAll(count);
            console.log(response.data.news);
            eventChange.setEvents([
                ...eventChange.events,
                ...response.data.news,
            ]);
            // setEvents([...eventChange.events, ...response.data.news])
            eventChange.setTotalCountPage(response.data.totalPages);
        }
    );
    const [fetchinChangeEvent, isLoadinChangeEvent, erroChangeEvent] =
        useFetching(async (eventId, obj) => {
            const response = await DataService.postChangeEvent(eventId, obj);
            console.log(response.data);
            eventChange.setEvents([
                ...eventChange.events.filter((event) => eventId !== event.id),
                response.data,
            ]);
        });
    const [fetchinCreateEvent, isLoadinCreateEvent, erroCreateEvent] =
        useFetching(async (obj) => {
            const response = await DataService.postCreateEvent(obj);
            console.log(response.data);
            eventChange.setEvents([...eventChange.events, response.data]);
        });

    const [dateEvent, setDateEvent] = useState({
        date: "",
        toTime: "",
    });

    const [objEvent, setObjEvent] = useState({
        type: "",
        title: "",
        eventDate: "",
        text: "",
        photoUrl: "",
    });

    const handleFunctionEvent = async (e) => {
        // e.preventDefault();
        // console.log('hey');
        const name = e.target.name;
        let value = e.target.value;

        // console.log(e.target.files);
        if (name == "file") {
            setFile(e.target.files[0]);
            // let file = e.target.files[0];
            // let formData = new FormData();
            // // console.log(formData);
            // formData.append("file", file);
            // // console.log(formData);
            // let response = await axios.post('http://localhost:9005/api/v1/file/upload', formData, {
            //     headers: {
            //         'Content-Type': 'multipart/form-data',
            //         'Authorization': `Bearer_${localStorage.getItem('accessToken')}`
            //     }
            // })
            // console.log(response.data);
        }
        console.log("name: " + name);
        console.log("value: " + value);
        let newObj = {};
        newObj = {
            ...objEvent,
            [name]: value,
        };
        setObjEvent(newObj);
        // console.log(obj);
    };

    const handleFunctionDateEvent = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        console.log("name: " + name);
        console.log("value: " + value);
        let newObjDate = {
            ...dateEvent,
            [name]: value,
        };
        setDateEvent(newObjDate);
    };
    const createEvent = async () => {
        // console.log(dateTrain);
        // let d = new Date(Date.UTC(dateTrain.date[0], -dateTrain.date[1], dateTrain.date[2],dateTrain.toTime[0], dateTrain.toTime[1]));
        let d1 = dateEvent.date.split(/\D/);
        let t1 = dateEvent.toTime.split(":");
        const utcDateStart = new Date(
            Date.UTC(d1[0], --d1[1], d1[2], t1[0], t1[1])
        );
        // console.log(new Date(utcDateEnd));

        console.log(file);

        let formData = new FormData();
        // console.log(formData);
        formData.append("file", file);
        // console.log(formData);
        let response = await axios.post(
            `${HOST}/google/upload`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer_${localStorage.getItem(
                        "accessToken"
                    )}`,
                },
            }
        );
        console.log(response.data);

        let newObj = {
            ...objEvent,
            photoUrl: `${response.data}`,
            eventDate: utcDateStart - 10800000,
        };
        console.log(newObj);

        await fetchinCreateEvent(newObj); // ======

        setObjEvent(newObj);
        eventChange.setOpenModalEventCreate(false);
    };
    const changeEvent = async (obj, dateEvent, fileObj) => {
        // console.log(dateTrain);
        // let d = new Date(Date.UTC(dateTrain.date[0], -dateTrain.date[1], dateTrain.date[2],dateTrain.toTime[0], dateTrain.toTime[1]));
        let d1 = dateEvent.date.split(/\D/);
        let t1 = dateEvent.toTime.split(":");
        const utcDateStart = new Date(
            Date.UTC(d1[0], --d1[1], d1[2], t1[0], t1[1])
        );

        console.log(fileObj);

        let formData = new FormData();
        // console.log(formData);
        formData.append("file", fileObj);
        // console.log(formData);
        let response = await axios.post(
            `${HOST}/google/upload`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer_${localStorage.getItem(
                        "accessToken"
                    )}`,
                },
            }
        );
        console.log(response.data);
        // console.log(new Date(utcDateEnd));
        let newObj = {
            ...obj,
            photoUrl: `${response.data}`,
            eventDate: utcDateStart - 10800000,
        };
        console.log(newObj);

        fetchinChangeEvent(eventChange.eventIdChange, newObj);

        // setObj(newObj);
        eventChange.setOpenModalEventChange(false);
    };

    // ===========================================================<EVENT>
    const [count, setCount] = useState(0);

    useEffect(() => {
        fetchingEvent(count);
        // console.log((eventChange.countPage === count) + ' ' + '----------------');
        // setCount(eventChange.countPage)
    }, [count]);

    useEffect(() => {
        if (count !== eventChange.countPage) {
            console.log("===============================================");

            setCount(eventChange.countPage);
        }

        // console.log((eventChange.countPage === count) + ' ' + '----------------');
        // setCount(eventChange.countPage)
    }, [eventChange.countPage]);

    useEffect(() => {
        fetchingTrainers();
        fetchingTraining();
        fetchingCompetition();
        eventChange.setEvents([]);
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
                setFlag={(bool) =>
                    trainingChange.setOpenModalTrainingCreate(bool)
                }
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
                setFlag={(bool) =>
                    trainingChange.setOpenModalTrainingChange(bool)
                }
            />

            <ModalCompetition
                handleFunctionDate={(e) => handleFunctionDateCompetition(e)}
                handleFunction={(e) => handleFunctionCompetition(e)}
                type="create"
                maxParticipant={objCompetition.maxPair} // ====
                funcBtn={() => createCompetition()}
                flag={competitionChange.openModalCompetitionCreate}
                setFlag={(bool) =>
                    competitionChange.setOpenModalCompetitionCreate(bool)
                }
            />
            <ModalCompetition
                handleFunctionDate={(e) => handleFunctionDateCompetition(e)}
                handleFunction={(e) => handleFunctionCompetition(e)}
                maxParticipant={objCompetition.maxPair}
                type="change"
                train={competitionChange.competitionChange}
                funcBtn={(sendObj, dateTrain) =>
                    changeCompetition(sendObj, dateTrain)
                }
                flag={competitionChange.openModalCompetitionChange}
                setFlag={(bool) =>
                    competitionChange.setOpenModalCompetitionChange(bool)
                }
            />
            <ModalEvent
                handleFunctionDate={(e) => handleFunctionDateEvent(e)}
                handleFunction={(e) => handleFunctionEvent(e)}
                type="create"
                text={objEvent.text}
                funcBtn={() => createEvent()}
                flag={eventChange.openModalEventCreate}
                title={objEvent.title}
                setFlag={(bool) => eventChange.setOpenModalEventCreate(bool)}
            />
            <ModalEvent
                handleFunctionDate={(e) => handleFunctionDateEvent(e)}
                handleFunction={(e) => handleFunctionEvent(e)}
                type="change"
                setFile={(file) => setFile(file)}
                text={objEvent.text}
                title={objEvent.title}
                funcBtn={(sendObj, dateEvent, fileObj) =>
                    changeEvent(sendObj, dateEvent, fileObj)
                }
                flag={eventChange.openModalEventChange}
                setFlag={(bool) => eventChange.setOpenModalEventChange(bool)}
            />

            <div className="container">
                <div className="admin__title">Панель администратора</div>
                <div className="admin__row">
                    <div className="admin__nav nav-admin">
                        <div
                            onClick={() => console.log(eventChange.events)}
                            className="nav-admin__title"
                        >
                            Модели
                        </div>
                        <ul className="nav-admin__links">
                            <Link
                                to="training-change"
                                className="nav-admin__link"
                            >
                                Тренировки
                            </Link>
                            <Link
                                to="competition-change"
                                className="nav-admin__link"
                            >
                                Соревнования
                            </Link>
                            <Link to="event-change" className="nav-admin__link">
                                Мероприятия
                            </Link>
                            <Link to="all-users" className="nav-admin__link">
                                Все пользователи
                            </Link>
                            <Link to="subscriptions" className="nav-admin__link">
                                Подтверждение абонементов
                            </Link>
                        </ul>
                    </div>
                    <div className="admin__main">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default observer(AdminPage);
