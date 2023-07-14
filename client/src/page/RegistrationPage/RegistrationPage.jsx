import React, { useContext, useState } from "react";
import "./RegistrationPage.scss";
import InputReg from "../../components/InputReg/InputReg";
import DataService from "../../API/DataService";
import { useFetching } from "../../hooks/useFetching";
import { useActionData, useParams } from "react-router";
import { Link } from "react-router-dom";
import CustomLink from "../../components/CustomLink";
import { Context } from "../..";
import { observer } from "mobx-react-lite";

const RegistrationPage = (props) => {
    const {store} = useContext(Context)
    const [flagExeptionLog, setflagExeptionLog] = useState(false);
    const [flagExeptionReg, setflagExeptionReg] = useState(false);
    const [flagExeptionPassword, setflagExeptionPassword] = useState(false);
    const [flagExeptionDataProcessing, setflagExeptionDataProcessing] = useState(false);

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
            console.log(response);
        }
    );
    const [fetchingLogin, isLoadingLog, errorLog] = useFetching(async (obj) => {
        const response = await DataService.postLogin(obj);
        console.log(response.data.accessToken);
    });

    // валидация email
    function validate(email) {
        let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if(reg.test(email) == false) {
        //    alert('Введите корректный e-mail');
           return false;
        }
     }
    const postRegister = (obj) => {
        // let jsonReg = JSON.stringify(obj);
        console.log(obj);

        if(validate(obj.email) == false){
            setflagExeptionReg(true)
            return;
        }
        setflagExeptionReg(false);
        if(obj.password !== obj.confirmationPassword){
            setflagExeptionPassword(true)
            return
        }
        setflagExeptionPassword(false)
        if(obj.agreementDataProcessing === false){
            setflagExeptionDataProcessing(true)
            return
        }
        setflagExeptionDataProcessing(false)
        
        store.registration(obj)
        
        store.setFlagError(false)
        setTimeout(()=> {
            store.setFlagError(true)
            store.setMessageError('На почту отправленно сообщение для подтверждения почты')
        }, 500)
        

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
        // fetchingRegister(obj);
        setRegFlagReset(!regFlagReset)
    };
    const postLogin = (obj) => {
        // let jsonLog = JSON.stringify(obj);
        console.log(obj);
        console.log(obj.password);
        if(validate(obj.email) == false){
            setflagExeptionLog(true)
            return;
        }
        setflagExeptionLog(false)
        if(obj.password == ''){
            return
        }
        
        
        // fetchingLogin(obj);
        store.login(obj);
        
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

    const closeModalWindow = () => {
        store.setFlagError(false);
        store.setMessageError('');
    }

    // ! разбить на компоненты

    return (
        <div className="registration">
            <div className={store.flagError ? "modal-window active" : "modal-window"}>
                <div onClick={() => closeModalWindow()} className="modal-window__close">
                    <span></span>
                    <span></span>
                </div>
                <div className="modal-window__title">{store.messageError}</div>
            </div>
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
                    <h1>{store.user ? `пользователь зареган ${store.user}` : 'regaisya'}</h1>
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
                                {/* <button
                                    onClick={() => setAddClass("bounceLeft")}
                                    className="unregistered-user__singup"
                                > */}
                                    <Link className="unregistered-user__singup" to="/auth/registration">Зарегистрироваться</Link>
                                {/* </button> */}
                            </div>
                            <div className="registration__registered registered-user">
                                <div className="registered-user__title">
                                    У вас уже есть личный кабинет?
                                </div>
                                <div className="registered-user__text">
                                    Тогда заходите и регистрируйтесь на
                                    тренировки, будем рады вас видеть!
                                </div>
                                {/* <button
                                    onClick={() => setAddClass("bounceRight")}
                                    className="registered-user__singup"
                                > */}
                                    <Link className="registered-user__singup" to="/auth/login">Войти</Link>
                                {/* </button> */}
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
                                            classField={flagExeptionReg ? 'email' : ''}
                                            className="form__input"
                                            required
                                            nameLabel="Email"
                                        />
                                        {flagExeptionReg ? <span className="exeption-email">Введена неверная почта</span> : null}
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
                                            classField={flagExeptionPassword ? 'email' : ''}
                                            className="form__input"
                                            required
                                            nameLabel="Повторите &ensp; пароль"
                                        />
                                        {flagExeptionPassword ? <span className="exeption-email">Пароли не совпадают</span> : null}
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
                                                classField={flagExeptionDataProcessing ? 'email' : ''}
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
                                        {flagExeptionDataProcessing ? <span className="exeption-email">Подтвердите согласие на обработку данных</span> : null}
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
                                            classField={flagExeptionLog ? 'login-email' : ''}
                                            className="form__input email"
                                            required
                                            nameLabel="Email"
                                        />
                                        {flagExeptionLog ? <span className="exeption-email">Введена неверная почта</span> : null}
                                        {/* <span className="exeption-email">{}</span> */}
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

export default observer(RegistrationPage);
