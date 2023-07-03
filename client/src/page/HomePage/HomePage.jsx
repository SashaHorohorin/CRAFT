import React, { useState } from "react";
import "./HomePage.scss";
import FollowingBtn from "../../components/FollowingBtn/FollowingBtn";
import MainPart from "../../components/MainPart/MainPart";
import Marquee from "../../components/Marquee/Marquee";
import Button from "../../components/UI/Button/Button";
import WhyCards from "../../components/WhyCards/WhyCards";

const HomePage = () => {
    
    // если страница зажружена запускаем воланчик

    return (
        <div className="home">
            <FollowingBtn />
            <MainPart />
            <Marquee classAdd="marquee-first" text="Тренировки по уровням" />
            <WhyCards/>
        </div>
    );
};

export default HomePage;
