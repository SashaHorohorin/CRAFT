import React, { useEffect, useState } from "react";
import "./AdminPage.scss";
import Training from "../../components/AdminComponent/Training";
import InputSelect from "../../components/AdminComponent/InputSelect";
import InputText from "../../components/AdminComponent/InputText";
import { useFetching } from "../../hooks/useFetching";
import DataService from "../../API/DataService";

const AdminPage = () => {
    const [flag, setFlag] = useState(false);
    const sportComplex = ["DINAMIT", "ALEKSEEVA", "IMPULS"];
    const typeTrain = [
        "Игровая с тренером",
        "Тренировка для начинающих и продолжающих",
        "Игровая",
    ];
    const [trainers, setTrainers] = useState([]);
    const [training, setTraining] = useState([]);

    const [fetchingTrainers, isLoadingTrainers, errorTrainers] = useFetching(
        async () => {
            const response = await DataService.getTrainerAll();
            console.log(response.data);
            setTrainers(response.data);
        }
    );
    const [fetchingTraining, isLoadingTraining, errorTraining] = useFetching(
        async () => {
            const response = await DataService.getTrainingAll();
            console.log(response.data);
            setTraining(response.data);
        }
    );
    const [fetchingDeleteTrain, isLoadingDeleteTrain, errorDeleteTrain] = useFetching(
        async (trainId) => {
            const response = await DataService.postDeleteTrain(trainId);
            console.log(response.data);
            setTraining(training.filter((train) => (trainId !== train.id)));
        }
    );
    const [fetchinChangeTrain, isLoadinChangeTrain, erroChangeTrain] = useFetching(
        async (trainId, obj) => {
            const response = await DataService.postChangeTrain(trainId, obj);
            console.log(response.data);
            // setTraining(training.filter((train) => (trainId !== train.id)));
        }
    );

    const [dateTrain, setDateTrain] = useState({
        date: "",
        toTime: "",
        fromTime: "",
    });
    const [obj, setObj] = useState({
        type: "",
        maxParticipant: "",
        trainersId: "",
        startTrain: "",
        endTrain: "",
        sportComplex: "",
    });

    useEffect(() => {
        fetchingTrainers();
        fetchingTraining();
    }, [])

    const handleFunction = (e) => {
        // e.preventDefault();
        const name = e.target.name;
        let value = e.target.value;
        console.log("name: " + name);
        console.log("value: " + value);
        let newObj = {
            ...obj,
            [name]: value,
        };
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

    const convertDate = () => {
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
        setObj(newObj);
        // console.log(utcDateStart, utcDateEnd);
    };

    const handleSubmit = (event) => {
        // alert('Отправленное имя: ' + this.state.value);
        event.preventDefault();
    };

    const closeModal = (e) => {
        if (!e.target.closest(".modal-create-training")) {
            setFlag(false);
        }
    };

    return (
        <div className="admin">
            <div
                onClick={(e) => closeModal(e)}
                className={
                    flag
                        ? "modal-create-training__bg active"
                        : "modal-create-training__bg"
                }
            >
                <div className="modal-create-training">
                    <div className="modal-create-training__title">
                        Редактирование тренировки
                    </div>
                    <form
                        onSubmit={handleSubmit}
                        className="modal-create-training__form"
                        action=""
                    >
                        <label htmlFor="type">
                            Тип:
                            <InputSelect
                                name="type"
                                id="type"
                                handleFunction={(e) => handleFunction(e)}
                                optionValue={typeTrain}
                            />
                        </label>
                        <label htmlFor="sportComplex">
                            Тип:
                            <InputSelect
                                name="sportComplex"
                                id="sportComplex"
                                handleFunction={(e) => handleFunction(e)}
                                optionValue={sportComplex}
                            />
                        </label>
                        <label htmlFor="people-max">
                            Макс. кол-во чел.:
                            <InputText
                                handleFunction={(e) => handleFunction(e)}
                                name="maxParticipant"
                                type="number"
                                id="people-max"
                            />
                        </label>
                        <label htmlFor="trainer">
                            Тренер:
                            <InputSelect
                                name="trainersId"
                                id="trainer"
                                handleFunction={(e) => handleFunction(e)}
                                optionValue={trainers}
                            />
                        </label>
                        <label htmlFor="date">
                            Дата проведения:
                            <InputText
                                handleFunction={(e) => handleFunctionDate(e)}
                                name="date"
                                type="date"
                                id="date"
                            />
                        </label>
                        <label htmlFor="time">
                            Время проведения:
                            <InputText
                                handleFunction={(e) => handleFunctionDate(e)}
                                name="toTime"
                                type="time"
                                id="time"
                            />
                            -
                            <InputText
                                handleFunction={(e) => handleFunctionDate(e)}
                                name="fromTime"
                                type="time"
                                id="time"
                            />
                        </label>
                    </form>
                    <div className="modal-create-training__btns btns-create">
                        <div
                            onClick={() => convertDate()}
                            className="btns-create__save"
                        >
                            Сохранить
                        </div>
                        <div className="btns-create__cancel">Отменить</div>
                    </div>
                </div>
            </div>

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
                            onClick={() => setFlag(true)}
                            className="admin__create-btn"
                        >
                            Создать
                        </div>
                        <div className="admin__items">
                            {
                                training.map((train, index) => (
                                    <Training deleteTrain={(trainId) => fetchingDeleteTrain(trainId)} key={train.id} train={train}/>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
