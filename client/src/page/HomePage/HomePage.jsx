import React, { Suspense, useContext, useEffect, useState } from "react";
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
import { Context } from "../..";
import { observer } from "mobx-react-lite";

const HomePage = () => {
    const [isLoad, setIsLoad] = useState(true);
    const { eventStore } = useContext(Context);
    // если страница зажружена запускаем воланчик
    // useEffect(() => {
    //     document.body.classList.add("stop");
    // }, [])
    // const loadPage = () => {
    //     console.log("Страница загрузилась");
    //     setTimeout(() => {
    //         document.body.classList.remove("stop");
    //         setIsLoad(false);
    //     }, 1500)
        
    // };

    useEffect(() => {
        if (eventStore.currentCountImg == eventStore.maxCountImg){
            setIsLoad(false)
            eventStore.currentCountImg = 0;
        }
    }, [eventStore.currentCountImg])



    return (
        
            <>
                <div className="home">
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

export default observer(HomePage);
