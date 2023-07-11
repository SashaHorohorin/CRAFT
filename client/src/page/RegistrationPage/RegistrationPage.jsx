import React, { useState } from "react";
import "./RegistrationPage.scss";
import InputReg from "../../components/InputReg/InputReg";
import DataService from "../../API/DataService";
import { useFetching } from "../../hooks/useFetching";
import { useActionData, useParams } from "react-router";
import { Link } from "react-router-dom";
import CustomLink from "../../components/CustomLink";

const RegistrationPage = (props) => {
    const { sign } = useParams();
    const [addClass, setAddClass] = useState("");
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
    const [objLog, setObjLog] = useState({
        email: "",
        password: "",
    });

    const [regFlagReset, setRegFlagReset] = useState(false);
    const [logFlagReset, setLogFlagReset] = useState(false);

    const [fetchingRegister, isLoadingReg, errorReg] = useFetching(
        async (obj) => {
            const response = await DataService.postRegister(obj);
        }
    );
    const [fetchingLogin, isLoadingLog, errorLog] = useFetching(async (obj) => {
        const response = await DataService.postLogin(obj);
    });
    const postRegister = (obj) => {
        // let jsonReg = JSON.stringify(obj);
        console.log(obj);
        

        setObjReg({
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            password: "",
            confirmationPassword: "",
            agreementDataProcessing: false,
            agreementMailing: true,
        })
        fetchingRegister(obj);
    

        setRegFlagReset(!regFlagReset)
    };
    const postLogin = (obj) => {
        // let jsonLog = JSON.stringify(obj);
        console.log(obj);
        fetchingLogin(obj);

        setObjLog({
            email: "",
            password: "",
        })
        setLogFlagReset(!logFlagReset)
    };

    

    const logObjLog = () => {
        console.log(objLog);
    };
    const logObjReg = () => {
        console.log(objReg);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    // ! разбить на компоненты сделать ресет при нажатии

    return (
        <div className="registration">
            <div className="container">
                <div className="registration__wrapper">
                    <div className="registration__logo">
                        <CustomLink to="/">
                            <img
                                src="../images/HomePage/craft-logo-home.svg"
                                alt="CRAFT LOGO"
                            />
                        </CustomLink>
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
                                    : sign == "login"
                                    ? "registration__forms forms-registration bounceRight"
                                    : "registration__forms forms-registration bounceLeft"
                            }
                        >
                            <div className="forms-registration__singup singup-form">
                                <div className="singup-form__title">
                                    Зарегистрироваться
                                </div>
                                <form
                                    onSubmit={handleSubmit}
                                    className="singup-form__form form"
                                >
                                    <div className="form__fieldset">
                                        <InputReg
                                            type="text"
                                            valueInp={regFlagReset}
                                            name="firstName"
                                            className="form__input"
                                            obj={objReg}
                                            setData={(newObj) =>
                                                setObjReg(newObj)
                                            }
                                            required
                                            autoFocus
                                            nameLabel="Имя"
                                        />
                                        <InputReg
                                            type="text"
                                            name="lastName"
                                            valueInp={regFlagReset}
                                            obj={objReg}
                                            setData={(newObj) =>
                                                setObjReg(newObj)
                                            }
                                            className="form__input"
                                            required
                                            nameLabel="Фамилия"
                                        />
                                        <InputReg
                                            type="text"
                                            valueInp={regFlagReset}
                                            name="email"
                                            obj={objReg}
                                            setData={(newObj) =>
                                                setObjReg(newObj)
                                            }
                                            className="form__input"
                                            required
                                            nameLabel="Email"
                                        />
                                        <InputReg
                                            type="tel"
                                            valueInp={regFlagReset}
                                            name="phoneNumber"
                                            obj={objReg}
                                            setData={(newObj) =>
                                                setObjReg(newObj)
                                            }

                                            className="form__input"
                                            required
                                            nameLabel="Телефон"
                                        />
                                        <InputReg
                                            type="password"
                                            valueInp={regFlagReset}
                                            name="password"
                                            obj={objReg}
                                            setData={(newObj) =>
                                                setObjReg(newObj)
                                            }
                                            className="form__input"
                                            required
                                            nameLabel="Пароль"
                                        />
                                        <InputReg
                                            type="password"
                                            name="confirmationPassword"
                                            obj={objReg}
                                            valueInp={regFlagReset}
                                            setData={(newObj) =>
                                                setObjReg(newObj)
                                            }
                                            className="form__input"
                                            required
                                            nameLabel="Повторите &ensp; пароль"
                                        />

                                        <div className="form__field checkbox">
                                            <InputReg
                                                type="checkbox"
                                                id="confidence"
                                                name="agreementDataProcessing"
                                                valueInp={regFlagReset}
                                                obj={objReg}
                                                setData={(newObj) =>
                                                    setObjReg(newObj)
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
                                                setData={(newObj) =>
                                                    setObjReg(newObj)
                                                }
                                                checked
                                                nameLabel="Cогласие на рассылку"
                                                className="form__checkbox"
                                            />
                                        </div>
                                    </div>

                                    <input
                                        type="submit"
                                        onClick={() => postRegister(objReg)}
                                        value="Зарегистрироваться"
                                        className="form__button"
                                    />
                                </form>
                            </div>
                            <div className="forms-registration__login login-form">
                                <div className="login-form__title">Войти</div>
                                <form
                                    onSubmit={handleSubmit}
                                    className="login-form__form form"
                                >
                                    <div className="form__fieldset">
                                        <InputReg
                                            type="text"
                                            name="email"
                                            valueInp={logFlagReset}
                                            obj={objLog}
                                            setData={(newObj) =>
                                                setObjLog(newObj)
                                            }
                                            className="form__input"
                                            required
                                            nameLabel="Email"
                                        />
                                        <InputReg
                                            type="password"
                                            name="password"
                                            valueInp={logFlagReset}
                                            obj={objLog}
                                            setData={(newObj) =>
                                                setObjLog(newObj)
                                            }
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
                                            onClick={() => postLogin(objLog)}
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
