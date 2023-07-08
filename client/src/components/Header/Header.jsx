import React, { useState } from "react";
import "./Header.scss";

const Header = () => {
    const [openBurger, setOpenBurger] = useState(false);

    return (
        <div className="header">
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
                                    Расписание
                                </div>
                                <div className="menu-burger__link">
                                    Соревнования
                                </div>
                                <div className="menu-burger__link">Команда</div>
                                <div className="menu-burger__link">
                                    Мероприятия
                                </div>
                                <div className="menu-burger__link">Цены</div>
                                <div className="menu-burger__link">
                                    Контакты
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="header__navigation navigation">
                        <div className="navigation__list">
                            <div className="navigation__link">Расписание</div>
                            <div className="navigation__link">Соревнования</div>
                            <div className="navigation__link">Команда</div>
                            <div className="navigation__link">Мероприятия</div>
                            <div className="navigation__link">Цены</div>
                            <div className="navigation__link">Контакты</div>
                        </div>
                        <div className="navigation__buttons buttons">
                            <div className="buttons__log-in">Вход</div>
                            <div className="buttons__register">Регистрация</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
