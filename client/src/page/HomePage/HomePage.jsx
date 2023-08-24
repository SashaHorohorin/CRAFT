import React, { useState } from "react";
import "./HomePage.scss";
import FollowingBtn from "../../components/FollowingBtn/FollowingBtn";
import MainPart from "../../components/MainPart/MainPart";
import Marquee from "../../components/Marquee/Marquee";
import Button from "../../components/UI/Button/Button";
import WhyCards from "../../components/WhyCards/WhyCards";
import Trainers from "../../components/Trainers/Trainers";
import WhereWe from "../../components/WhereWe/WhereWe";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";

const HomePage = () => {
    // если страница зажружена запускаем воланчик
    
    
    return (
        <div  className="home">
            <Link to="training"><FollowingBtn /></Link>
            <MainPart />
            <Marquee
                classAdd="marquee-first"
                text="Тренировки по уровням"
                shift={-599}
            />
            <WhyCards />
            <Marquee
                classAdd="marquee-second"
                text="BADMINTON CLUB"
                shift={-405}
            />
            <Trainers />
            <Marquee classAdd="marquee-third" text="CRAFT" shift={-175} />
            <WhereWe />
        </div>
    );
};

export default HomePage;
