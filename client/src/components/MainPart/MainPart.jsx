import React, { useContext } from "react";
import "./MainPart.scss";
import Header from "../Header/Header";
import Shuttlecocks from "../UI/Shuttlecocks/Shuttlecocks";
import Button from "../UI/Button/Button";
import fly from "../../script";
import { Link, animateScroll as scroll } from "react-scroll";
import { observer } from "mobx-react-lite";
import { Context } from "../..";

const MainPart = () => {
    const { eventStore } = useContext(Context);
    return (
        <div onLoad={() => fly()} className="main-part">
            
            <div className="container">
                
                <div className="home__content">
                    <div className="home__logo">
                        <img src="./images/HomePage/craft-logo.svg" alt="" />
                    </div>
                    <div className="home__text text-home">
                        <div className="text-home__title">
                            Хотите научиться играть в бадминтон? Или улучшить
                            свои навыки?
                        </div>
                        <div className="text-home__subtitle">
                            Вместе мы достигнем поставленных целей!
                        </div>
                    </div>
                    <Link
                        // ctiveClass="active"
                        to="first-train"
                        spy={true}
                        smooth={true}
                        offset={-120}
                        duration={500}
                        className="home__button btn"
                    >
                        Записаться на пробную тренировку
                    </Link>

                    <div className="home__social social-home">
                        <div className="social-home__column">
                            {/* <a href="mailto:Alexisbest1@mail.ru"><img src="./images/HomePage/google.png" alt="" /></a> */}
                            <a href="https://t.me/+gAzS3Qhxv-E1MGE6"><img src="./images/HomePage/telegram.png" alt="" /></a>
                            <a href="https://wa.me/79030975817"><img src="./images/HomePage/whatsapp.png" alt="" /></a>
                        </div>
                        <div className="social-home__column">
                            <a href="https://www.instagram.com/craftbadminton/">
                                <img src="./images/HomePage/instagram.png" alt="" />
                            </a>
                            <a href="https://vk.com/craftbadmclub"><img src="./images/HomePage/vk.png" alt="" /></a>
                            
                        </div>
                    </div>
                </div>
            </div>
            <Shuttlecocks />
        </div>
    );
};

export default observer(MainPart);
