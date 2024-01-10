import React, { useState } from "react";
import InputReg from "../../InputReg/InputReg";
import "./ModalForgot.scss";
import { observer } from "mobx-react-lite";
import storeForgot from "../../../store/forgot-password";
import { useFetching } from "../../../hooks/useFetching";
import DataService from "../../../API/DataService";

const infoModal = [
    {
        id: 1,
        text: "Введите ваш email используемый при регистрации",
    },
];

const ModalForgot = observer(() => {
    const [flagExeptionLog, setflagExeptionLog] = useState(false);
    const [flagExeptionPassword, setflagExeptionPassword] = useState(false);
    const [objLog, setObjLog] = useState({
        email: "",
    });
    const [objReg, setObjReg] = useState({
        code: "",
    });
    const [objPassword, setObjPassword] = useState({
        username: "",
        password: "",
        repeatedPassword: "",
    });
    const [flagNotificationError, setFlagNotificationError] = useState(false);
    const [error, setError] = useState("");
    

    const [rightMove, setRightMove] = useState(0);
    const [step, setStep] = useState(1);

    const [fetchingSendEmail, isLoadingSendEmail, errorSendEmail] = useFetching(
        async (email) => {
            const response = await DataService.postSendChangePassword(
                email
            ).then(() => {
                setRightMove(rightMove + 100);
                setStep(step + 1);
            }).catch((err) => {
                setError(err.response.data.message);
                setFlagNotificationError(true);
                setTimeout(() => {
                    setFlagNotificationError(false);
                }, 4000);
            });
            
        }
    );
    const [fetchingComfirmCode, isLoadingComfirmCode, errorComfirmCode] =
        useFetching(async (code) => {
            const response = await DataService.postConfirmChangePassword(code).then((response) => {
                setRightMove(rightMove + 100);
                setStep(step + 1);
                setObjPassword({
                    ...objPassword,
                    username: response.data,
                });
            }).catch((err) => {
                setError(err.response.data.message);
                setFlagNotificationError(true);
                setTimeout(() => {
                    setFlagNotificationError(false);
                }, 4000);
            });
            
        });
    const [
        fetchingChangePassword,
        isLoadingChangePassword,
        errorChangePassword,
    ] = useFetching(async (obj) => {
        const response = await DataService.postChangePassword(obj);
    });

    const [logFlagReset, setLogFlagReset] = useState(false);
    const [regFlagReset, setRegFlagReset] = useState(false);

    const closeModal = (e) => {
        if (!e.target.closest(".modal-forgot__block")) {
            storeForgot.setOpenModalForgot(false);
        }
    };
    function validate(email) {
        let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (reg.test(email) == false) {
            //    alert('Введите корректный e-mail');
            return false;
        }
    }

    const sendEmail = () => {
        if (validate(objLog.email) == false) {
            setflagExeptionLog(true);
            return;
        }
        fetchingSendEmail(objLog.email);
    };

    const sendCode = () => {
        fetchingComfirmCode(objReg.code);
    };
    const sendPassword = () => {
        if (objPassword.password !== objPassword.repeatedPassword) {
            setflagExeptionPassword(true);
            return;
        }
        setflagExeptionPassword(false);
        fetchingChangePassword(objPassword);
        setRightMove(rightMove + 100);
        setStep(step + 1);
    };

    const complitedAndClose = () => {
        storeForgot.setOpenModalForgot(false);
        setRightMove(0);
        setStep(1);
    };

    const closeModalWindowError = () => {
        setFlagNotificationError(false);
    };

    return (
        <>
            <div
                className={
                    flagNotificationError
                        ? "modal-window active"
                        : "modal-window"
                }
            >
                <div
                    onClick={() => closeModalWindowError()}
                    className="modal-window__close"
                >
                    <span></span>
                    <span></span>
                </div>
                <div className="modal-window__title">{error}</div>
            </div>
            <div
                onClick={(e) => closeModal(e)}
                className={
                    storeForgot.openModalForgot
                        ? "modal-forgot active"
                        : "modal-forgot"
                }
            >
                <div className="modal-forgot__block">
                    <h1 className="modal-forgot__title">
                        Востановление пароля
                    </h1>
                    <div className="modal-forgot__progress">
                        <span className="active"></span>
                        <span className={step > 1 ? "active" : null}></span>
                        <span className={step > 2 ? "active" : null}></span>
                        <span className={step > 3 ? "active" : null}></span>
                    </div>
                    <div
                        style={
                            rightMove === 0
                                ? null
                                : step > 3
                                ? { right: `calc(${rightMove}% - 40px )` }
                                : step > 2
                                ? { right: `calc(${rightMove}% - 20px )` }
                                : { right: `calc(${rightMove}%)` }
                        }
                        className="modal-forgot__container"
                    >
                        <div className="block block-email">
                            <p className="block-email__text">
                                Введите ваш email используемый при регистрации
                            </p>
                            <InputReg
                                type="text"
                                name="email"
                                valueInp={logFlagReset}
                                obj={objLog}
                                setData={(newObj) => setObjLog(newObj)}
                                classField={
                                    flagExeptionLog ? "login-email" : ""
                                }
                                className="form__input email"
                                required
                                nameLabel="Email"
                            />
                            {flagExeptionLog ? (
                                <span className="exeption-email">
                                    Введена неверная почта
                                </span>
                            ) : null}
                            <button
                                onClick={() => sendEmail()}
                                className="block-email__btn"
                            >
                                Получить код
                            </button>
                        </div>
                        <div className="block block-code">
                            <p className="block-email__text">
                                Введите код, который пришел Вам на почту
                            </p>
                            <InputReg
                                type="text"
                                valueInp={regFlagReset}
                                name="code"
                                className="form__input"
                                obj={objReg}
                                setData={(newObj) => setObjReg(newObj)}
                                required
                                autoFocus
                                autoComplete="off"
                                nameLabel="Код"
                            />
                            <button
                                onClick={() => sendCode()}
                                className="block-email__btn"
                            >
                                Подтвердить
                            </button>
                        </div>
                        <div className="block block-password">
                            <p className="block-email__text">
                                Введите новый пароль
                            </p>
                            {/* <div className="block-password__inputs"> */}
                            <InputReg
                                type="password"
                                valueInp={regFlagReset}
                                name="password"
                                obj={objPassword}
                                setData={(newObj) => setObjPassword(newObj)}
                                className="form__input"
                                required
                                nameLabel="Пароль"
                                autoComplete="new-password"
                            />
                            <InputReg
                                type="password"
                                name="repeatedPassword"
                                obj={objPassword}
                                valueInp={regFlagReset}
                                setData={(newObj) => setObjPassword(newObj)}
                                classField={flagExeptionPassword ? "email" : ""}
                                className="form__input"
                                required
                                autoComplete="new-password"
                                nameLabel="Повторите &ensp; пароль"
                            />
                            {flagExeptionPassword ? (
                                <span className="exeption-email">
                                    Пароли не совпадают
                                </span>
                            ) : null}
                            {/* </div> */}
                            <button
                                onClick={() => sendPassword()}
                                className="block-email__btn"
                            >
                                Изменить пароль
                            </button>
                        </div>
                        <div className="block block-complited">
                            <div className="block-complited__img">
                                <img src="../images/complite.svg" alt="" />
                            </div>
                            <p className="block-complited__text">
                                Ваш пароль успешно изменен
                            </p>
                            <button
                                onClick={() => complitedAndClose()}
                                className="block-email__btn"
                            >
                                Закрыть
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
});

export default ModalForgot;
