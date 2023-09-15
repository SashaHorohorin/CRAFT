import React, { useContext, useEffect, useState } from "react";
import InputSelect from "./InputSelect";
import InputText from "./InputText";
import { Context } from "../..";
import { observer } from "mobx-react-lite";


const ModalTrain = ({
    handleFunctionDate,
    train,
    trainers,
    maxParticipant,
    handleFunction,
    type,
    funcBtn,
    flag,
    setFlag,
}) => {
    const { trainingChange } = useContext(Context);

    const sportComplex = ["DINAMIT", "ALEKSEEVA", "IMPULS"];
    const typeTrain = [
        "Тактическая игровая",
        "Тренировка с тренером",
        "Игровая",
        'Детская тренировка'
    ];
    const [obj, setObj] = useState({
        type: '',
        maxParticipant: '',
        trainersId: [],
        startTrain: '',
        endTrain: '',
        sportComplex: '',
    });

    let idTrainers = () => {
        let ids = trainingChange?.trainChange?.trainers;
        
        return ids?.map((trainer, index) => (trainer.id))
    }

    useEffect(() => {
        setObj({
            type: trainingChange.trainChange.type,
            maxParticipant: trainingChange.trainChange.maxParticipant,
            trainersId: trainingChange?.trainChange?.trainers?.map((trainer, index) => (trainer.id)),
            startTrain: trainingChange.trainChange.startTrain,
            endTrain: trainingChange.trainChange.endTrain,
            sportComplex: trainingChange.trainChange.sportComplex,
        })
        setDateTrain({
            date: getDateYear(trainingChange.trainChange.startTrain),
            toTime: getTime(trainingChange.trainChange.startTrain),
            fromTime: getTime(trainingChange.trainChange.endTrain),
        })
        // setObj(trainingChange.trainChange);
    }, [trainingChange.trainChange])


    const [dateTrain, setDateTrain] = useState({
        date: '',
        toTime: '',
        fromTime: '',
    });
    const closeModal = (e) => {
        if (!e.target.closest(".modal-create-training")) {
            setFlag(false);
        }
    };
    const handleSubmit = (event) => {
        // alert('Отправленное имя: ' + this.state.value);
        event.preventDefault();
    };
    const getDateYear = (date) => {
        let d = new Date(date);
        let time = `${d.getFullYear()}-${d.getMonth() < 9 ? `0${d.getMonth() + 1}` : d.getMonth() + 1}-${d.getDate() < 10 ? `0${d.getDate()}` : d.getDate()}`;
        return time;
    };

    const getTime = (date) => {
        let d = new Date(date);
        let time = `${d.getHours() < 10 ? `0${d.getHours()}`:d.getHours()}:${d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes()}`;
        return time;
    };

    const handleFunctionChange = (e) => {
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

    const handleFunctionDateChange = (e) => {
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
    const logConsol = () => {
        console.log(obj);
    }

    return (
        <div
            
            onClick={(e) => closeModal(e)}
            className={
                flag
                    ? "modal-create-training__bg active"
                    : "modal-create-training__bg"
            }
        >
            {type == "create" ? (
                <div className="modal-create-training">
                    <div className="modal-create-training__title">
                        {type == "create"
                            ? "Создание тренировки"
                            : "Редактирование тренировки"}
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
                            Спорткомплекс:
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
                                value={maxParticipant}
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
                                // value="2013-01-08"s
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
                            onClick={() => funcBtn()}
                            className="btns-create__save"
                        >
                            {type == "create" ? "Создать" : "Сохранить"}
                        </div>
                        <div
                            onClick={() => setFlag(false)}
                            className="btns-create__cancel"
                        >
                            Отменить
                        </div>
                    </div>
                </div>
            ) : (
                <div onClick={() => logConsol()} className="modal-create-training">
                    <div className="modal-create-training__title">
                        {type == "create"
                            ? "Создание тренировки"
                            : "Редактирование тренировки"}
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
                                handleFunction={(e) => handleFunctionChange(e)}
                                optionValue={typeTrain}
                                value={obj.type}
                            />
                        </label>
                        <label htmlFor="sportCompex">
                        Спорткомплекс:
                            <InputSelect
                                name="sportComplex"
                                id="sportComplex"
                                handleFunction={(e) => handleFunctionChange(e)}
                                optionValue={sportComplex}
                                value={obj.sportComplex}
                            />
                        </label>
                        <label htmlFor="people-max">
                            Макс. кол-во чел.:
                            <InputText
                                handleFunction={(e) => handleFunctionChange(e)}
                                value={obj.maxParticipant}
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
                                handleFunction={(e) => handleFunctionChange(e)}
                                optionValue={trainers}
                                value={obj?.trainersId?.slice(0).shift()}
                            />
                        </label>
                        <label htmlFor="date">
                            Дата проведения:
                            <InputText
                                handleFunction={(e) => handleFunctionDateChange(e)}
                                name="date"
                                type="date"
                                id="date"
                                value={dateTrain.date}
                            />
                        </label>
                        <label htmlFor="time">
                            Время проведения:
                            <InputText
                                handleFunction={(e) => handleFunctionDateChange(e)}
                                name="toTime"
                                type="time"
                                id="time"
                                value={dateTrain.toTime}
                            />
                            -
                            <InputText
                                handleFunction={(e) => handleFunctionDateChange(e)}
                                name="fromTime"
                                type="time"
                                id="time"
                                value={dateTrain.fromTime}
                            />
                        </label>
                    </form>
                    <div className="modal-create-training__btns btns-create">
                        <div
                            onClick={() => funcBtn(obj, dateTrain)}
                            className="btns-create__save"
                        >
                            {type == "create" ? "Создать" : "Сохранить"}
                        </div>
                        <div
                            onClick={() => setFlag(false)}
                            className="btns-create__cancel"
                        >
                            Отменить
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default observer(ModalTrain);
