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
        // console.log(window.scrollY);
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
                        <Link to="/" className="header__logo">
                            <img
                                src="./images/HomePage/craft-logo-home.svg"
                                alt="craft"
                            />
                        </Link>
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
                                    <Link
                                        to="training"
                                        className="menu-burger__link"
                                    >
                                        Расписание
                                    </Link>
                                    <Link
                                        to="competitions"
                                        className="menu-burger__link"
                                    >
                                        Соревнования
                                    </Link>

                                    <Link
                                        to="events"
                                        className="menu-burger__link"
                                    >
                                        Мероприятия
                                    </Link>

                                    <Link
                                        to="prices"
                                        className="menu-burger__link"
                                    >
                                        Цены
                                    </Link>
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
                                            <div
                                                onClick={() => store.logout()}
                                                className="menu-burger__user-exit"
                                            >
                                                Выход
                                            </div>
                                            <Link to="profile">
                                                <div className="menu-burger__profile"></div>
                                            </Link>
                                        </div>
                                    )}
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
                                <Link
                                    className="navigation__link"
                                    to="competitions"
                                >
                                    Соревнования
                                </Link>
                                <Link to="events" className="navigation__link">
                                    Мероприятия
                                </Link>
                                <Link to="prices" className="navigation__link">
                                    Цены
                                </Link>
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
                                    <div
                                        onClick={() => store.logout()}
                                        className="buttons__exit"
                                    >
                                        Выход
                                    </div>
                                    <Link to="profile">
                                        <div className="buttons__user"></div>
                                    </Link>
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
