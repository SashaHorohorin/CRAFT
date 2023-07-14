import React, { useContext, useEffect, useState } from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
import { Context } from "../..";
import { observer } from "mobx-react-lite";

const Header = () => {
    const [openBurger, setOpenBurger] = useState(false);
    const [scroll, setScroll] = useState(0);

    const { store } = useContext(Context);

    const handleScroll = () => {
        console.log(window.scrollY);
        setScroll(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className={scroll > 30 ? "header active" : "header"}>
            <div className="container">
                <div className="header__row">
                    <div className="header__column">
                        <div className="header__logo">
                            <img
                                src="./images/HomePage/craft-logo-home.svg"
                                alt="craft"
                            />
                        </div>
                    </div>
                    <div className="header__column">
                        <div
                            className={
                                openBurger
                                    ? "header__burger-container burger active"
                                    : "header__burger-container burger"
                            }
                        >
                            <div
                                onClick={() => setOpenBurger(!openBurger)}
                                className="header__burger"
                            >
                                <span></span>
                            </div>
                            <div className="burger__menu menu-burger">
                                <div className="menu-burger__list">
                                    <div className="menu-burger__link">
                                        <Link to="training">Расписание</Link>
                                    </div>
                                    <div className="menu-burger__link">
                                        Соревнования
                                    </div>
                                    <div className="menu-burger__link">
                                        Команда
                                    </div>
                                    <div className="menu-burger__link">
                                        Мероприятия
                                    </div>
                                    <div className="menu-burger__link">
                                        Цены
                                    </div>
                                    <div className="menu-burger__link">
                                        Контакты
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="header__navigation navigation">
                            <div className="navigation__list">
                                {/* <div > */}
                                <Link
                                    className="navigation__link"
                                    to="training"
                                >
                                    Расписание
                                </Link>
                                {/* </div> */}
                                <div className="navigation__link">
                                    Соревнования
                                </div>
                                <div className="navigation__link">Команда</div>
                                <div className="navigation__link">
                                    Мероприятия
                                </div>
                                <div className="navigation__link">Цены</div>
                                <div className="navigation__link">Контакты</div>
                            </div>
                            {!store.isAuth ? (
                                <div className="navigation__buttons buttons">
                                    <Link
                                        className="buttons__log-in"
                                        to="auth/login"
                                    >
                                        Вход
                                    </Link>
                                    <Link
                                        className="buttons__register"
                                        to="auth/registration"
                                    >
                                        Регистрация
                                    </Link>
                                </div>
                            ) : (
                                <div className="navigation__buttons buttons">
                                    <div onClick={() => store.logout()} className="buttons__exit">Выход</div>
                                    <div className="buttons__user"></div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default observer(Header);
