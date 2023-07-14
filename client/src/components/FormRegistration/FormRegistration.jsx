import React, { useContext, useState } from "react";
import InputReg from "../InputReg/InputReg";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import { useFetching } from "../../hooks/useFetching";
import DataService from "../../API/DataService";
import { Navigate } from "react-router";

const FormRegistration = () => {
    const { store } = useContext(Context);

    const [regFlag, setRegFlag] = useState(false);
    const [regFlagReset, setRegFlagReset] = useState(false);
    const [flagExeptionReg, setflagExeptionReg] = useState(false);
    const [flagExeptionPassword, setflagExeptionPassword] = useState(false);
    const [flagExeptionDataProcessing, setflagExeptionDataProcessing] = useState(false);

    const [fetchingLogin, isLoadingLog, errorLog] = useFetching(async (obj) => {
        const response = await DataService.postLogin(obj);
        console.log(response.data.accessToken);
    });

    const [objReg, setObjReg] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmationPassword: "",
        agreementDataProcessing: false,
        agreementMailing: true,
    });

    // валидация email
    function validate(email) {
        let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (reg.test(email) == false) {
            //    alert('Введите корректный e-mail');
            return false;
        }
    }

    const postRegister = (obj) => {
        // let jsonReg = JSON.stringify(obj);
        console.log(obj);

        if (validate(obj.email) == false) {
            setflagExeptionReg(true);
            return;
        }
        setflagExeptionReg(false);
        if (obj.password !== obj.confirmationPassword) {
            setflagExeptionPassword(true);
            return;
        }
        setflagExeptionPassword(false);
        if (obj.agreementDataProcessing === false) {
            setflagExeptionDataProcessing(true);
            return;
        }
        setflagExeptionDataProcessing(false);

        store.registration(obj);

        store.setFlagError(false);
        setTimeout(() => {
            store.setFlagError(true);
            store.setMessageError(
                "На почту отправленно сообщение для подтверждения почты"
            );
        }, 500);

        setObjReg({
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            password: "",
            confirmationPassword: "",
            agreementDataProcessing: false,
            agreementMailing: true,
        });
        // fetchingRegister(obj);
        setRegFlagReset(!regFlagReset);
        setRegFlag(true);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    if(regFlag === true){
        return <Navigate to="/auth/login" />
    }

    return (
        <div className="forms-registration__singup singup-form">
            <div className="singup-form__title">Зарегистрироваться</div>
            <form onSubmit={handleSubmit} className="singup-form__form form">
                <div className="form__fieldset">
                    <InputReg
                        type="text"
                        valueInp={regFlagReset}
                        name="firstName"
                        className="form__input"
                        obj={objReg}
                        setData={(newObj) => setObjReg(newObj)}
                        required
                        autoFocus
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
                    <InputReg
                        type="password"
                        valueInp={regFlagReset}
                        name="password"
                        obj={objReg}
                        setData={(newObj) => setObjReg(newObj)}
                        className="form__input"
                        required
                        nameLabel="Пароль"
                    />
                    <InputReg
                        type="password"
                        name="confirmationPassword"
                        obj={objReg}
                        valueInp={regFlagReset}
                        setData={(newObj) => setObjReg(newObj)}
                        classField={flagExeptionPassword ? "email" : ""}
                        className="form__input"
                        required
                        nameLabel="Повторите &ensp; пароль"
                    />
                    {flagExeptionPassword ? (
                        <span className="exeption-email">
                            Пароли не совпадают
                        </span>
                    ) : null}
                    <div className="form__field checkbox">
                        <InputReg
                            type="checkbox"
                            id="confidence"
                            name="agreementDataProcessing"
                            valueInp={regFlagReset}
                            obj={objReg}
                            setData={(newObj) => setObjReg(newObj)}
                            classField={
                                flagExeptionDataProcessing ? "email" : ""
                            }
                            className="form__checkbox"
                            nameLabel="Согласен на обработку персональных данных"
                        />
                    </div>
                    <div className="form__field checkbox">
                        <InputReg
                            type="checkbox"
                            id="newsletter"
                            name="agreementMailing"
                            valueInp={regFlagReset}
                            obj={objReg}
                            setData={(newObj) => setObjReg(newObj)}
                            checked
                            nameLabel="Cогласие на рассылку"
                            className="form__checkbox"
                        />
                    </div>
                    {flagExeptionDataProcessing ? (
                        <span className="exeption-email">
                            Подтвердите согласие на обработку данных
                        </span>
                    ) : null}
                </div>

                <input
                    type="submit"
                    onClick={() => postRegister(objReg)}
                    value="Зарегистрироваться"
                    className="form__button"
                />
            </form>
        </div>
    );
};

export default observer(FormRegistration);
