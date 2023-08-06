import React, { useContext, useState } from "react";
import "./Applications.scss";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import { useFetching } from "../../hooks/useFetching";
import DataService from "../../API/DataService";

const Applications = () => {
    const { eventStore } = useContext(Context);
    const [flagOpenModalAddPair, setFlagOpenModalAddPair] = useState(false);
    const [valueName, setValueName] = useState('');
    const [valueRating, setValueRating] = useState('');

    const [fetchingCreateAndInvite, isLoadingCreateAndInvite, errorCreateAndInvite] = useFetching(async (obj, competitionId) => {
        const response = await DataService.postCreateAndInvite(obj, competitionId);
        console.log(response.data.accessToken);
    });
    
    let openModal = () => {
        document.body.classList.add("stop");
        eventStore.setFlagOpenModalAddPair(true);
    };
    let closeModal = (event) => {
        const nameClass = event.target.className;
        if (
            !(
                nameClass.includes("modal-applications") ||
                nameClass.includes("mine-applications") ||
                nameClass.includes("item-instruction") ||
                nameClass.includes("find-person")
            ) || nameClass.includes("modal-applications__close")
            || nameClass.includes("modal-applications__bg")
        ) {
            document.body.classList.remove("stop");
            eventStore.setFlagOpenModalAddPair(false);
        }
    };
    let openModalInst = () => {
        document.body.classList.add("stop");
        eventStore.setFlagOpenModalInstruction(true);
    };
    let closeModalInst = (event) => {
        console.log(event.target.className);
        const nameClass = event.target.className;
        if (
            !(
                nameClass.includes("modal-applications") ||
                nameClass.includes("mine-applications") ||
                nameClass.includes("item-instruction") ||
                nameClass.includes("find-person")
            ) || nameClass.includes("modal-applications__close")
            || nameClass.includes("modal-applications__bg")
        ) {
            document.body.classList.remove("stop");
            eventStore.setFlagOpenModalInstruction(false);
        }
    };

    const sendCreateAndInvite = (competitionId) => {
    }

    const handleNameChange = (event) => {
        setValueName(event.target.value)
        // console.log(valueName);

    }
    const handleRatingChange = (event) => {
        setValueRating(event.target.value)
        // console.log(valueName);

    }

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <div className="applications">
            <div
                onClick={(event) => closeModal(event)}
                className={
                    eventStore.flagOpenModalAddPair
                        ? "modal-applications__bg active"
                        : "modal-applications__bg"
                }
            >
                <div className="applications__modal modal-applications">
                    <div className="modal-applications__row">
                        <div className="modal-applications__header">
                            <div className="modal-applications__title">
                                Запись пары на соревнования
                            </div>
                            <div
                                onClick={(event) => closeModal(event)}
                                className="modal-applications__close"
                            >
                                <span>X</span>
                            </div>
                        </div>
                        <div className="modal-applications__mine mine-applications">
                            <div className="mine-applications__fitst-time">
                                <div className="mine-applications__title">
                                    Зполните ваш ID. Инструкция:
                                </div>
                                <ol className="mine-applications__instruction">
                                    <li className="mine-applications__item item-instruction">
                                        <div className="item-instruction__text">
                                            Перейдите на сайт и в поиске введите
                                            фамилию и имя. И выберите себя.
                                        </div>
                                        <div className="item-instruction__img">
                                            <img
                                                src="../images/CompetitionPage/01.png"
                                                alt=""
                                            />
                                        </div>
                                    </li>
                                    <li className="mine-applications__item item-instruction">
                                        <div className="item-instruction__text">
                                            В строке поиска браузера скопируйте
                                            ваш ID и поместите к нам в поле
                                            ввода.
                                        </div>
                                        <div className="item-instruction__img">
                                            <img
                                                src="../images/CompetitionPage/02.png"
                                                alt=""
                                            />
                                        </div>
                                    </li>
                                </ol>
                                <form
                                    className="mine-applications__form"
                                    action=""
                                    onSubmit={handleSubmit}
                                >
                                    <label
                                        className="mine-applications__label"
                                        htmlFor="idRating"
                                    >
                                        Ваш ID:
                                    </label>
                                    <input
                                        className="mine-applications__input-rating"
                                        type="text"
                                        id="idRating"
                                        name="idRating"
                                        value={valueRating}
                                        onChange={handleRatingChange}
                                    />
                                </form>
                            </div>
                            <div className="mine-applications__find find-person">
                                <div className="find-person__text">
                                    Введите фамилию и имя партнера, если не
                                    знаете с кем будете играть оставьте поле
                                    пустым. (он должен быть зарегистрирован в
                                    системе)
                                </div>
                                <form className="find-person__form">
                                    <input
                                        value={valueName}
                                        onChange={handleNameChange}
                                        className="find-person__input"
                                        type="text"
                                    />
                                </form>
                                <button className="find-person__button">
                                    Записаться
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                onClick={(event) => closeModalInst(event)}
                className={
                    eventStore.flagOpenModalInstruction
                        ? "modal-applications__bg active"
                        : "modal-applications__bg"
                }
            >
                <div className="applications__modal modal-applications">
                    <div className="modal-applications__row">
                        <div className="modal-applications__header">
                            <div className="modal-applications__title">
                                Добавление рейтинга
                            </div>
                            <div
                                onClick={(event) => closeModalInst(event)}
                                className="modal-applications__close"
                            >
                                <span>X</span>
                            </div>
                        </div>
                        <div className="modal-applications__mine mine-applications">
                            <div className="mine-applications__fitst-time">
                                <div className="mine-applications__title">
                                    Зполните ваш ID. Инструкция:
                                </div>
                                <ol className="mine-applications__instruction">
                                    <li className="mine-applications__item item-instruction">
                                        <div className="item-instruction__text">
                                            Перейдите на сайт и в поиске введите
                                            фамилию и имя. И выберите себя.
                                        </div>
                                        <div className="item-instruction__img">
                                            <img
                                                src="../images/CompetitionPage/01.png"
                                                alt=""
                                            />
                                        </div>
                                    </li>
                                    <li className="mine-applications__item item-instruction">
                                        <div className="item-instruction__text">
                                            В строке поиска браузера скопируйте
                                            ваш ID и поместите к нам в поле
                                            ввода.
                                        </div>
                                        <div className="item-instruction__img">
                                            <img
                                                src="../images/CompetitionPage/02.png"
                                                alt=""
                                            />
                                        </div>
                                    </li>
                                </ol>
                                <form
                                    className="mine-applications__form"
                                    action=""
                                >
                                    <label
                                        className="mine-applications__label"
                                        htmlFor="idRating"
                                    >
                                        Ваш ID:
                                    </label>
                                    <input
                                        className="mine-applications__input-rating"
                                        type="text"
                                        id="idRating"
                                        name="idRating"
                                    />
                                </form>
                            </div>
                            <button className="mine-applications__button">
                                Добавить
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="applications__title">
                    Заявки на соревнование "Все против всех DE"
                </div>
                <button
                    onClick={() => openModal()}
                    className="applications__add-pair"
                >
                    Записать пару
                </button>
                <ol className="applications__row">
                    <li className="applications__pair">
                        <span>Хорохорин Александр</span>
                        <span> - </span>
                        <span>Пирогов Никита</span>
                    </li>
                    <li className="applications__pair">
                        <span>Хорохорин Александр</span>
                        <span> - </span>
                        <button
                            onClick={() => openModalInst()}
                            className="applications__button"
                        >
                            + Предложить сыграть вместе
                        </button>
                    </li>
                </ol>
            </div>
        </div>
    );
};

export default observer(Applications);
