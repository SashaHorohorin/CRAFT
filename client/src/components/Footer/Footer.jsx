import React from "react";
import "./Footer.scss";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className="footer">
            <div className="container">
                <div className="footer__row">
                    <div className="footer__column">
                        <div className="footer__phone phone-footer">
                            <div className="phone-footer__title">
                                По всем вопросам звоните нам
                            </div>
                            <a
                                href="tel:+79030975817"
                                className="phone-footer__number"
                            >
                                +7(903) 097 58 17
                            </a>
                        </div>
                    </div>
                    <div className="footer__column">
                        <div className="footer__navigate navigate-footer">
                            <ul className="navigate-footer__row">
                                <div className="navigate-footer__column">
                                    <Link to="training" className="navigate-footer__link">
                                        Расписание
                                    </Link>
                                    <Link to="competitions" className="navigate-footer__link">
                                        Соревнования
                                    </Link>
                                </div>
                                <div className="navigate-footer__column">
                                    <Link to="events" className="navigate-footer__link">
                                        Мероприятия
                                    </Link>
                                    <Link to="prices" className="navigate-footer__link">
                                        Цены
                                    </Link>
                                </div>
                            </ul>
                        </div>
                    </div>
                    <div className="footer__column">
                        <div className="footer__social social-footer">
                            <div className="social-footer__title">
                                Ищите нас в соц. сетях
                            </div>
                            <div className="social-footer__img">
                                <a href="https://wa.me/79030975817">
                                    <img
                                        src="./images/HomePage/whatsapp.png"
                                        alt=""
                                    />
                                </a>
                                <a href="https://www.instagram.com/craftbadminton/">
                                    <img
                                        src="./images/HomePage/instagram.png"
                                        alt=""
                                    />
                                </a>
                                <a href="https://vk.com/craftbadmclub">
                                    <img src="./images/HomePage/vk.png" alt="" />
                                </a>
                                <a href="https://t.me/+gAzS3Qhxv-E1MGE6"><img src="./images/HomePage/telegram.png" alt="" /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
