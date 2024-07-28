import React, { useContext, useEffect, useState } from "react";
import InputSelect from "./InputSelect";
import InputText from "./InputText";
import { Context } from "../..";
import { observer } from "mobx-react-lite";

const ModalCoach = ({
                        text,
                        name,
                        handleFunction,
                        type,
                        funcBtn,
                        flag,
                        setFlag,
                    }) => {
    const { coachChange } = useContext(Context);
    const [file, setFile] = useState(null);

    const [obj, setObj] = useState({
        name: "",
        textFront: "",
        photoUrl: '',
    });

    useEffect(() => {
        setObj({
            name: coachChange.coachChange.name,
            textFront: coachChange.coachChange.textFront,
        });
    }, [coachChange.coachChange]);

    const closeModal = (e) => {
        if (!e.target.closest(".modal-create-training")) {
            setFlag(false);
        }
    };
    const handleSubmit = (event) => {
        event.preventDefault();
    };

    const handleFunctionChange = (e) => {
        // e.preventDefault();
        const name = e.target.name;
        let value = e.target.value;
        if (name == "file") {
            // console.log('----');
            setFile(e.target.files[0]);
        } else {
            let newObj = {};
            newObj = {
                ...obj,
                [name]: value,
            };

            setObj(newObj);
        }

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
                            ? "Добавление тренера"
                            : "Редактирование тренера"}
                    </div>
                    <form
                        onSubmit={handleSubmit}
                        className="modal-create-training__form"
                        action=""
                    >
                        <label htmlFor="name">
                            ФИО:
                            <InputText
                                handleFunction={(e) => handleFunction(e)}
                                value={name}
                                name="name"
                                type="text"
                                id="name"
                            />
                        </label>
                        <label htmlFor="type">
                            Фотография:
                            <input
                                onChange={(e) => handleFunction(e)}
                                type="file"
                                id="file"
                                name="file"
                            />
                        </label>
                        <label htmlFor="textFront">
                            Описание:
                            <textarea
                                onChange={(e) => handleFunction(e)}
                                value={text}
                                name="textFront"
                                type="text"
                                id="textFront"
                            ></textarea>
                        </label>
                    </form>
                    <div className="modal-create-training__btns btns-create">
                        <div
                            onClick={() => funcBtn()}
                            className="btns-create__save"
                        >
                            {type == "create" ? "Добавить" : "Сохранить"}
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
                    className="modal-create-training"
                >
                    <div className="modal-create-training__title">
                        {type == "create"
                            ? "Добавление тренера"
                            : "Редактирование тренера"}
                    </div>
                    <form
                        onSubmit={handleSubmit}
                        className="modal-create-training__form"
                        action=""
                    >
                        <label htmlFor="name">
                            ФИО:
                            <InputText
                                handleFunction={(e) => handleFunctionChange(e)}
                                value={obj.name}
                                name="name"
                                type="text"
                                id="name"
                            />
                        </label>
                        <label htmlFor="type">
                            Фотография:
                            <input
                                onChange={(e) => handleFunctionChange(e)}
                                type="file"
                                id="file"
                                name="file"
                            />
                        </label>
                        <label htmlFor="textFront">
                            Описание:
                            <textarea
                                onChange={(e) => handleFunctionChange(e)}
                                value={obj.textFront}
                                name="textFront"
                                type="text"
                                id="textFront"
                            ></textarea>
                        </label>
                    </form>
                    <div className="modal-create-training__btns btns-create">
                        <div
                            onClick={() => {
                                setFlag(false)
                                funcBtn(obj, file)
                            }}
                            className="btns-create__save"
                        >
                            {type == "create" ? "Добавить" : "Сохранить"}
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

export default observer(ModalCoach);
