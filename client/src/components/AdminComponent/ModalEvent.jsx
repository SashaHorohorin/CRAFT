import React, { useContext, useEffect, useState } from "react";
import InputSelect from "./InputSelect";
import InputText from "./InputText";
import { Context } from "../..";
import { observer } from "mobx-react-lite";

const ModalEvent = ({
    handleFunctionDate,
    train,
    trainers,
    maxParticipant,
    text,
    title,
    handleFunction,
    type,
    funcBtn,
    flag,
    setFlag,
}) => {
    const { eventChange } = useContext(Context);

    const typeEvent = ["BASE_NEWS", "START_COMPETITION", "END_COMPETITION"];

    const [obj, setObj] = useState({
        type: "",
        title: "",
        eventDate: "",
        text: "",
    });

    useEffect(() => {
        setObj({
            type: eventChange.eventChange.type,
            title: eventChange.eventChange.title,
            eventDate: eventChange.eventChange.eventDate,
            text: eventChange.eventChange.text,
        });
        setDateEvent({
            date: getDateYear(eventChange.eventChange.eventDate),
            toTime: getTime(eventChange.eventChange.eventDate),
        });
        // setObj(trainingChange.trainChange);
    }, [eventChange.eventChange]);

    const [dateEvent, setDateEvent] = useState({
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
        // console.log(obj);
    };

    const handleFunctionDateChange = (e) => {
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
                            ? "Создание мероприятия"
                            : "Редактирование мероприятия"}
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
                                optionValue={typeEvent}
                            />
                        </label>
                        <label htmlFor="title">
                            Заголовок:
                            <InputText
                                handleFunction={(e) => handleFunction(e)}
                                value={title}
                                name="title"
                                type="text"
                                id="title"
                            />
                        </label>
                        <label htmlFor="text">
                            Текст поста:
                            <textarea
                                onChange={(e) => handleFunction(e)}
                                // value={text}
                                name="text"
                                type="text"
                                id="text"
                            ></textarea>
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
                                optionValue={typeEvent}
                                value={obj.type}
                            />
                        </label>
                        <label htmlFor="title">
                            Заголовок:
                            <InputText
                                handleFunction={(e) => handleFunctionChange(e)}
                                value={obj.title}
                                name="title"
                                type="text"
                                id="title"
                            />
                        </label>
                        <label htmlFor="text">
                            Текст поста:
                            <textarea
                                onChange={(e) => handleFunctionChange(e)}
                                value={obj.text}
                                name="text"
                                type="text"
                                id="text"
                            ></textarea>
                        </label>
                        <label htmlFor="date">
                            Дата проведения:
                            <InputText
                                handleFunction={(e) =>
                                    handleFunctionDateChange(e)
                                }
                                name="date"
                                type="date"
                                id="date"
                                value={dateEvent.date}
                            />
                        </label>
                        <label htmlFor="time">
                            Время проведения:
                            <InputText
                                handleFunction={(e) =>
                                    handleFunctionDateChange(e)
                                }
                                name="toTime"
                                type="time"
                                id="time"
                                value={dateEvent.toTime}
                            />
                        </label>
                    </form>
                    <div className="modal-create-training__btns btns-create">
                        <div
                            onClick={() => funcBtn(obj, dateEvent)}
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

export default observer(ModalEvent);
