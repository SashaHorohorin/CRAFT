import React, { useContext, useEffect, useState } from "react";
import Training from "../Training";
import { observer } from "mobx-react-lite";
import { Context } from "../../..";
import DataService from "../../../API/DataService";
import { useFetching } from "../../../hooks/useFetching";
import InputSelect from "../InputSelect";
import InputText from "../InputText";
import ModalEvent from "../ModalEvent";

const TrainingChange = () => {
    const { trainingChange } = useContext(Context);

    const [filterTraining, setFilterTraining] = useState([]);

    const [objSearch, setObjSearch] = useState({
        sportComplex: "DINAMIT",
        date: "",
    });

    const [fetchingDeleteTrain, isLoadingDeleteTrain, errorDeleteTrain] =
        useFetching(async (trainId) => {
            const response = await DataService.postDeleteTrain(trainId);
            console.log(response.data);
            trainingChange.setTraining(
                trainingChange.training.filter((train) => trainId !== train.id)
            );
            setFilterTraining(trainingChange.training);
        });
    const [
        fetchingMailingTraining,
        isLoadingMailingTraining,
        errorMailingTraining,
    ] = useFetching(async () => {
        // console.log('saskfhjahfshahfjshfkjshkj');
        const response = await DataService.getMailingTraining();
        // let complex = [...response.data];
    });

    useEffect(() => {
        setFilterTraining(trainingChange.training);
    }, [trainingChange.training]);

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

    const sportComplex = ["DINAMIT", "ALEKSEEVA", "ARENA300"];

    const handleFunction = (event) => {
        let name = event.target.name;
        let value = event.target.value;

        let newObj = {
            ...objSearch,
            [name]: value,
        };
        setObjSearch(newObj);
    };

    const handleFunctionSubmit = (event) => {
        event.preventDefault();
    };

    const getDateYear = (date) => {
        let d = new Date(date);
        let time = `${d.getFullYear()}-${
            d.getMonth() < 9 ? `0${d.getMonth() + 1}` : d.getMonth() + 1
        }-${d.getDate() < 10 ? `0${d.getDate()}` : d.getDate()}`;
        return time;
    };

    const fuctionSearch = () => {
        console.log(objSearch);
        setFilterTraining(
            trainingChange.training.filter((train) => {
                if (!objSearch.date) {
                    return objSearch.sportComplex === train.sportComplex;
                } else {
                    return (
                        objSearch.sportComplex === train.sportComplex &&
                        objSearch.date === getDateYear(train.startTrain)
                    );
                }
            })
        );
    };
    const fuctionClear = () => {
        setObjSearch({
            sportComplex: "DINAMIT",
            date: "",
        });
        setFilterTraining(trainingChange.training);
    };

    const [flagList, setFlagList] = useState(false);
    const [flagModalSendCustom, sendFlagModalSendCustom] = useState(false);
    const [fetchingSendCustomMail, isLoadingSendCustomMail, errorSendCustomMail] =
        useFetching(async (obj) => {
            const response = await DataService.postSendCustomMail(obj);
            console.log(response.data);
        });

    const [obj, setObj] = useState({
        subject: "",
        message: "",
    });
    const handleFunctionCustom = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        // setValueRating(value);
        let newObj = {
            ...obj,
            [name]: value,
        };
        setObj(newObj);
    };
    const sendCustom = () => {
        console.log(obj);
        fetchingSendCustomMail(obj)
        sendFlagModalSendCustom(false)
    }

    return (
        <div className="admin__main">
            <div
                // onClick={(event) => closeModalEdit(event)}
                className={
                    flagModalSendCustom
                        ? "modal-applications__bg active"
                        : "modal-applications__bg"
                }
            >
                <div className="applications__modal modal-applications">
                    <div className="modal-applications__row">
                        <div className="modal-applications__header edit-modal-header">
                            <div className="modal-applications__title">
                                Катомная рассылка
                            </div>
                            <div
                                onClick={() => sendFlagModalSendCustom(false)}
                                className="modal-applications__close"
                            >
                                <span>X</span>
                            </div>
                        </div>
                        <div className="modal-applications__mine mine-applications">
                            <div className="mine-applications__fitst-time edit-modal">
                                <form
                                    className="mine-applications__form modal-custom"
                                    action=""
                                    onSubmit={handleFunctionSubmit}
                                >
                                    <label htmlFor="subject">
                                        Заголовок:
                                        <InputText
                                            handleFunction={(e) =>
                                                handleFunctionCustom(e)
                                            }
                                            value={obj.subject}
                                            name="subject"
                                            type="text"
                                            id="subject"
                                        />
                                    </label>
                                    <label htmlFor="message">
                                        Текст поста:
                                        <textarea
                                            onChange={(e) => handleFunctionCustom(e)}
                                            // value={text}
                                            name="message"
                                            type="text"
                                            id="message"
                                        ></textarea>
                                    </label>
                                </form>
                            </div>
                            <button
                                onClick={() => sendCustom()}
                                className="find-person__button"
                            >
                                Отправить
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="admin__btns">
                <div
                    onClick={() =>
                        trainingChange.setOpenModalTrainingCreate(true)
                    }
                    className="admin__create-btn"
                >
                    Создать
                </div>
                <form
                    onSubmit={(event) => handleFunctionSubmit(event)}
                    action=""
                    className="admin__search search-admin"
                >
                    <InputSelect
                        name="sportComplex"
                        id="sportComplex"
                        className="search-admin__select"
                        handleFunction={(e) => handleFunction(e)}
                        optionValue={sportComplex}
                    />
                    <InputText
                        className="search-admin__data"
                        handleFunction={(e) => handleFunction(e)}
                        name="date"
                        type="date"
                        id="date"
                        // value="2013-01-08"s
                    />
                    <button
                        className="search-admin__filter"
                        onClick={() => fuctionSearch()}
                    ></button>
                    <button
                        className="search-admin__reset"
                        type="reset"
                        onClick={() => fuctionClear()}
                    >
                        Сброс
                    </button>
                </form>
                <div
                    className={`admin__send-btn-change send-btn-change ${
                        flagList && "active"
                    }`}
                    onClick={() => setFlagList(!flagList)}
                >
                    {/* Сделать расылку */}
                    <p>Вид рассылки</p>
                    <span>{">"}</span>
                    <div className="send-btn-change__block block-btn">
                        <div onClick={() => sendFlagModalSendCustom(true)} className="block-btn__custom">
                            Катомная рассылка
                        </div>
                        <div
                            onClick={() => fetchingMailingTraining()}
                            className="block-btn__standart"
                        >
                            Стандартная рассылка
                        </div>
                    </div>
                </div>
            </div>
            <div className="admin__items">
                {filterTraining.map((train, index) => (
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
