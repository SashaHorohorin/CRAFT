import React, { useEffect } from "react";
import "./HomePage.scss";
import Header from "../../components/Header/Header";
import Button from "../../components/UI/Button/Button";
import fly from "../../script";
import Shuttlecocks from "../../components/UI/Shuttlecocks/Shuttlecocks";

const HomePage = () => {
    
  // если страница зажружена запускаем воланчик


    return (
        <div className="home">
            <Shuttlecocks/>
            <div className="container">
                <Header />
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
                            <img src="./images/HomePage/google.png" alt="" />
                            <img src="./images/HomePage/whatsapp.png" alt="" />
                        </div>
                        <div className="social-home__column">
                            <img src="./images/HomePage/instagram.png" alt="" />
                            <img src="./images/HomePage/vk.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
