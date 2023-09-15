import React, { useContext, useState } from "react";
import "./WhereWe.scss";
import MapYandex from "./MapYandex/MapYandex";
import Button from "../UI/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import InputReg from "../InputReg/InputReg";
import { useFetching } from "../../hooks/useFetching";
import DataService from "../../API/DataService";

const WhereWe = () => {
    const [regFlagReset, setRegFlagReset] = useState(false);
    const { eventStore } = useContext(Context);
    const [flagExeptionReg, setflagExeptionReg] = useState(false);
    const [flagError, setFlagError] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const [fetchingLogin, isLoadingLog, errorLog] = useFetching(async (obj) => {
        const response = await DataService.postRegFirstTrain(obj).catch(
            (error) => {
                console.log(error.response.data.message);
                setError(error.response.data.message);
                setFlagError(true);
                // fetchingCompetition(id)
                setTimeout(() => {
                    setFlagError(false);
                }, 3000);
            }
        );
        // console.log(response.data.accessToken);
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("roles", response.data.roles);
        localStorage.setItem("labId", response.data.labId);
        // window.location.reload()
        // setTimeout(() => {
            navigate('/training')
            eventStore.setFlagOpenModalSale(true);
        // }, 500)
    });

    const [objReg, setObjReg] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
    });
    const handleSubmit = (event) => {
        event.preventDefault();
    };
    function validate(email) {
        let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (reg.test(email) == false) {
            //    alert('Введите корректный e-mail');
            return false;
        }
    }

    const postReg = (obj) => {
        if (validate(obj.email) == false) {
            setflagExeptionReg(true);
            return;
        }
        fetchingLogin(obj);
        
        // eventStore.setFlagOpenModalSale(true);
        setObjReg({
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
        });
        console.log(obj);
        
    };
    return (
        <div className="where">
            <div className={flagError ? " modal-window modal-first active" : "modal-window modal-first"}>
                <div
                    onClick={() => setFlagError(false)}
                    className="modal-window__close"
                >
                    <span></span>
                    <span></span>
                </div>
                <div className="modal-window__title">{error}</div>
            </div>
            <div className="container">
                <div className="where__title">Как нас найти?</div>

                <div className="where__row">
                    <MapYandex />
                </div>
            </div>
            <div id="first-train" className="where-first-train">
                <div className="where-first-train__row">
                    <div className="where-first-train__title">
                        Записаться на пробную тренировку
                    </div>
                    <div className="where-first-train__text">
                        Заполните небольшую форму и приходите к нам на
                        тренировку!
                    </div>
                    <div className="where-first-train__under-text">(Запись возможна только для незарегистрированных пользователей)</div>
                    
                    <form
                        onSubmit={handleSubmit}
                        className="where-first-train__form"
                    >
                        <InputReg
                            type="text"
                            valueInp={regFlagReset}
                            name="firstName"
                            className="form__input"
                            obj={objReg}
                            setData={(newObj) => setObjReg(newObj)}
                            required
                            // autoFocus
                            nameLabel="Имя"
                        />
                        <InputReg
                            type="text"
                            name="lastName"
                            valueInp={regFlagReset}
                            obj={objReg}
                            setData={(newObj) => setObjReg(newObj)}
                            className="form__input"
                            required
                            nameLabel="Фамилия"
                        />
                        <InputReg
                            type="text"
                            valueInp={regFlagReset}
                            name="email"
                            obj={objReg}
                            setData={(newObj) => setObjReg(newObj)}
                            classField={flagExeptionReg ? "email" : ""}
                            className="form__input"
                            required
                            nameLabel="Email"
                        />
                        {flagExeptionReg ? (
                            <span className="exeption-email">
                                Введена неверная почта
                            </span>
                        ) : null}
                        <InputReg
                            type="tel"
                            valueInp={regFlagReset}
                            name="phoneNumber"
                            obj={objReg}
                            setData={(newObj) => setObjReg(newObj)}
                            className="form__input"
                            required
                            nameLabel="Телефон"
                        />
                        <input
                            type="submit"
                            onClick={() => postReg(objReg)}
                            value="Записаться"
                            className="form__button"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default observer(WhereWe);
