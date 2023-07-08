import React, { useState } from "react";
import "./RegistrationPage.scss";
import InputReg from "../../components/InputReg/InputReg";

const RegistrationPage = () => {
    const [addClass, setAddClass] = useState("");
    const [objReg, setObjReg] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmationPassword: "",
        agreementDataProcessing: false,
        agreementMailing: false,
    });
    const [objLog, setObjLog] = useState({
        email: "",
        password: "",
    });

    const logObjLog = () => {
        console.log(objLog);
    }
    const logObjReg = () => {
        console.log(objReg);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    // ! Поправить лейблы у чекбоксов и разбить на компоненты


    return (
        <div className="registration">
            <div className="container">
                <div className="registration__wrapper">
                    <div className="registration__logo">
                        <img
                            src="./images/HomePage/craft-logo-home.svg"
                            alt=""
                        />
                    </div>
                    <div className="registration__container">
                        <div className="registration__text">
                            <div className="registration__unregistered unregistered-user">
                                <div className="unregistered-user__title">
                                    Вы еще не зарегистрированы?
                                </div>
                                <div className="unregistered-user__text">
                                    Поспешите зарегистрироваться, чтобы как
                                    можно скорее записаться к нам на тренировки!
                                </div>
                                <button
                                    onClick={() => setAddClass("bounceLeft")}
                                    className="unregistered-user__singup"
                                >
                                    Зарегистрироваться
                                </button>
                            </div>
                            <div className="registration__registered registered-user">
                                <div className="registered-user__title">
                                    У вас уже есть личный кабинет?
                                </div>
                                <div className="registered-user__text">
                                    Тогда заходите и регистрируйтесь на
                                    тренировки, будем рады вас видеть!
                                </div>
                                <button
                                    onClick={() => setAddClass("bounceRight")}
                                    className="registered-user__singup"
                                >
                                    Войти
                                </button>
                            </div>
                        </div>

                        <div
                            className={
                                addClass == "bounceLeft"
                                    ? "registration__forms forms-registration bounceLeft"
                                    : addClass == "bounceRight"
                                    ? "registration__forms forms-registration bounceRight"
                                    : "registration__forms forms-registration"
                            }
                        >
                            <div className="forms-registration__singup singup-form">
                                <div className="singup-form__title">
                                    Зарегистрироваться
                                </div>
                                <form onSubmit={handleSubmit} className="singup-form__form form">
                                    <div className="form__fieldset">
                                        <InputReg
                                            type="name"
                                            name="firstName"
                                            className="form__input"
                                            obj={objReg}
                                            setData={(newObj) => setObjReg(newObj)}
                                            required
                                            autoFocus
                                            nameLabel="Имя"
                                        />
                                        <InputReg
                                            type="lastname"
                                            name="lastName"
                                            
                                            obj={objReg}
                                            setData={(newObj) => setObjReg(newObj)}                                           
                                            className="form__input"
                                            required
                                            nameLabel="Фамилия"
                                        />
                                        <InputReg
                                            type="text"
                                            name="email"
                                            
                                            obj={objReg}
                                            setData={(newObj) => setObjReg(newObj)}                                           
                                            className="form__input"
                                            required
                                            nameLabel="Email"
                                        />
                                        <InputReg
                                            type="tel"
                                            name="phoneNumber"
                                            
                                            obj={objReg}
                                            setData={(newObj) => setObjReg(newObj)}                                           
                                            pattern="8-[0-9]{3}-[0-9]{3}"
                                            className="form__input"
                                            required
                                            nameLabel="Телефон"
                                        />
                                        <InputReg
                                            type="password"
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
                                            setData={(newObj) => setObjReg(newObj)}                                            
                                            className="form__input"
                                            required
                                            nameLabel="Повторите &ensp; пароль"
                                        />

                                        <div className="form__field checkbox">
                                            <InputReg
                                                type="checkbox"
                                                id="confidence"
                                                name="agreementDataProcessing"
                                                obj={objReg}
                                                setData={(newObj) => setObjReg(newObj)}                                            
                                                className="form__checkbox"
                                                nameLabel='Согласен на обработку персональных данных'
                                            />
                                        </div>
                                        <div className="form__field checkbox">
                                            <InputReg
                                                type="checkbox"
                                                id="newsletter"
                                                name="agreementMailing"
                                                obj={objReg}
                                                setData={(newObj) => setObjReg(newObj)}   
                                                nameLabel='Cогласие на рассылку'
                                                className="form__checkbox"
                                            />
                                            
                                        </div>
                                    </div>

                                    <input
                                        type="submit"
                                        onClick={()=> logObjReg()}
                                        value="Зарегистрироваться"
                                        className="form__button"
                                    />
                                </form>
                            </div>
                            <div className="forms-registration__login login-form">
                                <div className="login-form__title">Войти</div>
                                <form  onSubmit={handleSubmit}className="login-form__form form">
                                    <div className="form__fieldset">
                                        <InputReg
                                            type="email"
                                            name="email"
                                            obj={objLog}
                                            setData={(newObj) => setObjLog(newObj)}                                    
                                            className="form__input"
                                            required
                                            nameLabel="Email"
                                        />
                                        <InputReg
                                            type="password"
                                            name="password"
                                            
                                            obj={objLog}
                                            setData={(newObj) => setObjLog(newObj)}                                            
                                            className="form__input"
                                            required
                                            nameLabel="Пароль"
                                        />
                                    </div>
                                    <div className="form__buttons">
                                        <button
                                            type="button"
                                            className="form__buttons-forgot"
                                        >
                                            Забыли пароль?
                                        </button>
                                        <input
                                            onClick={()=> logObjLog()}
                                            type="submit"
                                            value="Войти"
                                            className="form__button"
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};



export default RegistrationPage;
