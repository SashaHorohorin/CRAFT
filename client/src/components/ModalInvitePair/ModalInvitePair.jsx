import React, { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../..";

const ModalInvitePair = ({text, changeFlagNotification,  title, sendFunc, flag, setFlag, usersNotRegisterCompetition}) => {
    const [flagOpenModalAddPair, setFlagOpenModalAddPair] = useState(false);
    const [valueName, setValueName] = useState("");
    const [valueRating, setValueRating] = useState("");
    const { eventStore } = useContext(Context);

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

    const handleRatingChange = (event) => {
        setValueRating(event.target.value);
        // console.log(valueName);
    };

    // const polsevat = ['Никита Пирогов', 'Никита Пирогов', 'Никита Пирогов', 'Никита Пирогов', 'Никита Пирогов', 'Никита Гарыныч', 'Стас Пирогов', 'Александр Хорохорин', 'Ника Пирон', 'Алекс Пирог']
    const [users, setUsers] = useState([])

    const handleNameChange = (event) => {
        let arrUserFind = []
        let reg;
        if(!(event.target.value == '?' || event.target.value == '\\')){
            reg = new RegExp(`${event.target.value}`);
        }
        setValueName(event.target.value);

        if (event.target.value){
            for(let i = 0; i < usersNotRegisterCompetition.length; i++){
                if(usersNotRegisterCompetition[i].match(reg)){
                    arrUserFind.push(usersNotRegisterCompetition[i])
                    // console.log(arrUserFind);
    
                }
            }
        }

        setUsers(arrUserFind)
        // console.log(valueName);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };
    const closeModalAfterSend = () => {
        sendFunc(valueName, valueRating);
        eventStore.setFlagOpenModalAddPair(false)
        changeFlagNotification(true)
        setTimeout(() => {
            changeFlagNotification(false)
        }, 2000)
    }
    const selectUser = (user) => {
        setValueName(user);
        setUsers([]);
    }

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
                            {title ? title : 'Запись пары на соревнования'}
                        </div>
                        <div
                            onClick={(event) => closeModal(event)}
                            className="modal-applications__close"
                        >
                            <span>X</span>
                        </div>
                    </div>
                    <div className="modal-applications__mine mine-applications">
                        {localStorage.getItem("labId") === "null" ? (
                            <div className="mine-applications__fitst-time">
                                <div className="mine-applications__title">
                                    Зполните ваш ID. Инструкция:
                                </div>
                                <ol className="mine-applications__instruction">
                                    <li className="mine-applications__item item-instruction">
                                        <div className="item-instruction__text">
                                            Перейдите на <a href="https://badminton4u.ru/" target="_blank">САЙТ</a> и в поиске введите
                                            фамилию и имя. И выберите себя.
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
                                            В строке поиска браузера скопируйте
                                            ваш ID и поместите к нам в поле
                                            ввода.
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
                        ) : null}

                        <div className="mine-applications__find find-person">
                            <div className="find-person__text">
                                {text ? text : 'Введите фамилию и имя партнера, если не знаете с кем будете играть оставьте поле пустым. (он должен быть зарегистрирован в системе)'}
                            </div>
                            <form className="find-person__form">
                                <input
                                    value={valueName}
                                    onChange={handleNameChange}
                                    className="find-person__input"
                                    type="text"
                                />
                                {users.length != 0 ? (
                                    <ul className="find-users">
                                        {users.map((user, index)=> (
                                            <li onClick={() => selectUser(user)} className="find-users__user">{user}</li>
                                        ))}
                                    </ul>
                                ) : null}
                                
                            </form>
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
        </div>
    );
};

export default observer(ModalInvitePair);
