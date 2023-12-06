import React, { useState } from "react";

const ModalLabId = ({ flag, sendFunc, setFlag }) => {
    const [valueRating, setValueRating] = useState("");
    const handleRatingChange = (event) => {
        setValueRating(event.target.value);
        // console.log(valueName);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
    };
    let closeModal = (event) => {
        const nameClass = event.target.className;
        if (
            !(
                nameClass.includes("modal-applications") ||
                nameClass.includes("mine-applications") ||
                nameClass.includes("item-instruction") ||
                nameClass.includes("find-person") ||
                nameClass.includes("find-users")
            ) ||
            nameClass.includes("modal-applications__close") ||
            nameClass.includes("modal-applications__bg")
        ) {
            document.body.classList.remove("stop");
            setFlag(false);
        }
    };
    const closeModalAfterSend = () => {
        sendFunc(valueRating);
        setFlag(false);
        // eventStore.setFlagOpenModalAddPair(false)
        // changeFlagNotification(true)
        // setTimeout(() => {
        //     changeFlagNotification(false)
        // }, 2000)
    };
    return (
        <div
            onClick={(event) => closeModal(event)}
            className={
                flag
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
                                        Перейдите на{" "}
                                        <a
                                            href="https://badminton4u.ru/"
                                            target="_blank"
                                        >
                                            САЙТ
                                        </a>{" "}
                                        и в поиске введите фамилию и имя. И
                                        выберите себя.
                                    </div>
                                    <div className="item-instruction__img">
                                        <img
                                            src="/images/CompetitionPage/01.png"
                                            alt=""
                                        />
                                    </div>
                                </li>
                                <li className="mine-applications__item item-instruction">
                                    <div className="item-instruction__text">
                                        В строке поиска браузера скопируйте ваш
                                        ID и поместите к нам в поле ввода.
                                    </div>
                                    <div className="item-instruction__img">
                                        <img
                                            src="/images/CompetitionPage/02.png"
                                            alt="нет катринки"
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
                        <button
                            onClick={() => closeModalAfterSend()}
                            className="find-person__button"
                        >
                            Записаться
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalLabId;
