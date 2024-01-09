import React, { useContext, useEffect, useState } from "react";
import InputSelect from "./InputSelect";
import InputText from "./InputText";
import { Context } from "../..";

const ModalCompetition = ({
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
    const { competitionChange } = useContext(Context);

    const sportComplex = ["DINAMIT", "ALEKSEEVA", "ARENA300"];
    const typeCompetition = ["Пара", "Микст", "Все против всех"];
    const categoryCompetition = ['EF', 'DE', 'CD', 'BC', 'AB']
    
    const [obj, setObj] = useState({
        type: "",
        category: "",
        maxPair: "",
        startCompetition: "",
        sportComplex: "",
    });

    useEffect(() => {
        setObj({
            type: competitionChange.competitionChange.type,
            category: competitionChange.competitionChange.category,
            maxPair: competitionChange.competitionChange.maxParticipant,
            startCompetition: competitionChange.competitionChange.startCompetition,
            sportComplex: competitionChange.competitionChange.sportComplex,
        });
        setDateTrain({
            date: getDateYear( competitionChange.competitionChange.startCompetition),
            toTime: getTime( competitionChange.competitionChange.startCompetition),
        });
        // setObj(trainingChange.trainChange);
    }, [competitionChange.competitionChange]);

    const [dateTrain, setDateTrain] = useState({
        date: "",
        toTime: "",
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
        let time = `${d.getFullYear()}-${
            d.getMonth() < 9 ? `0${d.getMonth() + 1}` : d.getMonth() + 1
        }-${d.getDate() < 10 ? `0${d.getDate()}` : d.getDate()}`;
        return time;
    };

    const getTime = (date) => {
        let d = new Date(date);
        let time = `${d.getHours() < 10 ? `0${d.getHours()}` : d.getHours()}:${
            d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes()
        }`;
        return time;
    };

    const handleFunctionChange = (e) => {
        // e.preventDefault();
        const name = e.target.name;
        let value = e.target.value;
        console.log("name: " + name);
        console.log("value: " + value);
        let newObj = {};

            newObj = {
                ...obj,
                [name]: value,
            };
        setObj(newObj);
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
    };

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
                            ? "Создание соревнований"
                            : "Редактирование соревнований"}
                    </div>
                    <form
                        onSubmit={handleSubmit}
                        className="modal-create-training__form"
                        action=""
                    >
                        <label htmlFor="type">
                            Название соревнований:
                            <InputSelect
                                name="type"
                                id="type"
                                handleFunction={(e) => handleFunction(e)}
                                optionValue={typeCompetition}
                            />
                        </label>
                        <label htmlFor="category">
                            Категория:
                            <InputSelect
                                name="category"
                                id="category"
                                handleFunction={(e) => handleFunction(e)}
                                optionValue={categoryCompetition}
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
                            Макс. кол-во пар:
                            <InputText
                                handleFunction={(e) => handleFunction(e)}
                                value={maxParticipant}
                                name="maxPair"
                                type="number"
                                id="people-max"
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
                            Время начала:
                            <InputText
                                handleFunction={(e) => handleFunctionDate(e)}
                                name="toTime"
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
                <div
                    onClick={() => logConsol()}
                    className="modal-create-training"
                >
                    <div className="modal-create-training__title">
                        {type == "create"
                            ? "Создание соревнований"
                            : "Редактирование соревнований"}
                    </div>
                    <form
                        onSubmit={handleSubmit}
                        className="modal-create-training__form"
                        action=""
                    >
                        <label htmlFor="type">
                            Название соревнований:
                            <InputSelect
                                name="type"
                                id="type"
                                handleFunction={(e) => handleFunctionChange(e)}
                                optionValue={typeCompetition}
                                value={obj.type}
                            />
                        </label>
                        <label htmlFor="category">
                            Категория:
                            <InputSelect
                                name="category"
                                id="category"
                                handleFunction={(e) => handleFunctionChange(e)}
                                optionValue={categoryCompetition}
                                value={obj.category}
                            />
                        </label>
                        <label htmlFor="sportComplex">
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
                            Макс. кол-во пар:
                            <InputText
                                handleFunction={(e) => handleFunctionChange(e)}
                                value={obj.maxPair}
                                name="maxPair"
                                type="number"
                                id="people-max"
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
                                // value="2013-01-08"s
                            />
                        </label>
                        <label htmlFor="time">
                            Время начала:
                            <InputText
                                handleFunction={(e) => handleFunctionDateChange(e)}
                                name="toTime"
                                type="time"
                                id="time"
                                value={dateTrain.toTime}
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

export default ModalCompetition;
