import React from "react";
import './Header.scss'

const Header = () => {
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
