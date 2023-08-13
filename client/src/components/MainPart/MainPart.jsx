import React from "react";
import "./MainPart.scss";
import Header from "../Header/Header";
import Shuttlecocks from "../UI/Shuttlecocks/Shuttlecocks";
import Button from "../UI/Button/Button";
import fly from "../../script";

const MainPart = () => {
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
                    <Button
                        text="Записаться по акции"
                        classAdd="home__button"
                    />
                    <div className="home__social social-home">
                        <div className="social-home__column">
                            <a href="mailto:Alexisbest1@mail.ru"><img src="./images/HomePage/google.png" alt="" /></a>
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

export default MainPart;
