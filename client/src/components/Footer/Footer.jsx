import React from "react";
import './Footer.scss'

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
                                href="tel:+79875677878"
                                className="phone-footer__number"
                            >
                                +7 (987) 567 78 78
                            </a>
                        </div>
                    </div>
                    <div className="footer__column">
                        <div className="footer__navigate navigate-footer">
                            <ul className="navigate-footer__row">
                                <div className="navigate-footer__column">
                                    <div className="navigate-footer__link">
                                        Расписание
                                    </div>
                                    <div className="navigate-footer__link">
                                        Соревнования
                                    </div>
                                    <div className="navigate-footer__link">
                                        Команда
                                    </div>
                                </div>
                                <div className="navigate-footer__column">
                                    <div className="navigate-footer__link">
                                        Мероприятия
                                    </div>
                                    <div className="navigate-footer__link">
                                        Цены
                                    </div>
                                    <div className="navigate-footer__link">
                                        Контакты
                                    </div>
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
                                <img
                                    src="./images/HomePage/whatsapp.png"
                                    alt=""
                                />
                                <img
                                    src="./images/HomePage/instagram.png"
                                    alt=""
                                />
                                <img src="./images/HomePage/vk.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
