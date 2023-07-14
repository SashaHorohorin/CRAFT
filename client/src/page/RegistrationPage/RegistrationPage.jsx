import React, { useContext, useState } from "react";
import "./RegistrationPage.scss";
import InputReg from "../../components/InputReg/InputReg";
import DataService from "../../API/DataService";
import { useFetching } from "../../hooks/useFetching";
import { Navigate, useActionData, useLocation, useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import CustomLink from "../../components/CustomLink";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import FormRegistration from '../../components/FormRegistration/FormRegistration' ;
import FormLogin from '../../components/FormLogin/FormLogin' ;

const RegistrationPage = (props) => {
    const {store} = useContext(Context)

    const location = useLocation();

    const fromPage = location.state?.from?.pathname || '/';
    
    

    const { sign } = useParams();
    const [addClass, setAddClass] = useState("");

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
                    {/* <h1>{store.user ? `пользователь зареган ${store.user}` : 'regaisya'}</h1> */}
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
                            <FormRegistration/>
                            <FormLogin fromPage={fromPage}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default observer(RegistrationPage);
