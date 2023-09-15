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
import Loader from "../../components/Loader/Loader";

const HomePage = () => {
    const [isLoad, setIsLoad] = useState(true);
    // если страница зажружена запускаем воланчик

    const loadPage = () => {
        console.log("Страница загрузилась");
        setTimeout(() => {
            setIsLoad(false);
        }, 1500)
        
    };

    return (
        <>
            {isLoad ? (
                    <Loader/>
                ) : (null)}
            <div onLoad={() => loadPage()} className="home">
                <Link to="training">
                    <FollowingBtn />
                </Link>
                <MainPart />
                <Marquee
                    classAdd="marquee-first"
                    text={
                        <>
                            <span className="text-in">
                                Игровые и турниры по уровню
                            </span>
                            <span className="text-in">
                                Занятия для начинающих и продвинутых с тренером
                            </span>
                        </>
                    }
                    shift={-2024}
                    derection={17}
                />
                <WhyCards />
                <Marquee
                    classAdd="marquee-second"
                    text={
                        <>
                            <span className="text-in">Турниры и сборы</span>
                            <span className="text-in">
                                Подарочные сертификаты
                            </span>
                            <span className="text-in">
                                Тренировки для взрослых и детей
                            </span>
                        </>
                    }
                    shift={-1875}
                    derection={17}
                />
                <Trainers />
                <Marquee
                    classAdd="marquee-third"
                    text={
                        <>
                            <span className="text-in">
                                Несколько филиалов по городу
                            </span>
                            <span className="text-in">
                                Подарочные сертификаты
                            </span>
                        </>
                    }
                    shift={-1438}
                    derection={15}
                />
                <WhereWe />
            </div>
        </>
    );
};

export default HomePage;
