import React, { useEffect, useState } from "react";
import "./WhyCards.scss";
import WhyCard from "./WhyCard/WhyCard";
import { useFetching } from "../../hooks/useFetching";
import DataService from "../../API/DataService";

const WhyCards = () => {

    const cards = [
        {
            id: 1,
            photoURL: "./images/HomePage/why-club/1.jpg",
            titleFront: "Растим чемпионов!",
            titleBack: "Растим чемпионов!",
            textFront:
                "Наши воспитанники регулярно играют и выигрывают на любительских турнирах и турнирах от федерации!",
            textBack:
                'Наши воспитанники регулярно играют и выигрывают на любительских турнирах и турнирах от федерации! Каждой группе тренирующихся по уровню при участии присваивается рейтинг! Наши тренеры помогают при участии в соревнованиях от федерации и регулярно "подсказывают" прямо во время турниров!Во время тренировок распределяем игроков по уровню, чтобы всем было комфортно!',
        },
        {
            id: 2,
            photoURL: "./images/HomePage/why-club/2.jpg",
            titleFront:
                "Сертифицированные тренеры и дружеская атмосфера на тренировках!",
            titleBack:
                "Четкая программа, сертифицированные тренеры и дружеская атмосфера на тренировках!",
            textFront:
                "Обучение проходит по программе Международной Федерации бадминтона.",
            textBack:
                "Обучение проходит по программе Международной Федерации бадминтона. Наши тренеры - сертифицированные специалисты, чемпионы города, действующие спортсмены. При этом мы грамотно рассчитываем нагрузку и делаем так, чтобы вы играли с удовольствием, без давления, на дружеском вайбе! Организуем помощь в подборе партнеров по турнирам!",
        },
        {
            id: 3,
            photoURL: "./images/HomePage/why-club/3.jpg",
            titleFront: "Комьюнити единомышлеников",
            titleBack: "Комьюнити единомышлеников",
            textFront: "",
            textBack:
                'Мы регулярно встречаемся "вне корта" - организуем праздничные мероприятия, дни рождения, спортивные сборы выходного дня. Также мы дружим с бадминтонистами других регионов и регулярно выезжаем и встречаем бадминтонистов на междугородних командных играх! Вместе играем в настольные игры, ходим и даже делаем концерты, проводим совместные мастер-классы и многое-многое другое! Присоединяйтесь!',
        },
    ];

    return (
        <>
            <div className="why-club">
                <div className="container">
                    <div className="why-club__title">
                        Почему Craft Badminton Club?
                    </div>
                    <div className="why-club__row">
                        <div className="why-club__column">
                            <WhyCard card={cards[0]} classChange="left" />
                            <WhyCard card={cards[1]} classChange="left" />
                        </div>
                        <div className="why-club__column">
                            <WhyCard card={cards[2]} classChange="right" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default WhyCards;
