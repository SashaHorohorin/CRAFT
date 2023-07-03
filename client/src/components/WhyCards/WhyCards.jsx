import React, { useState } from "react";
import "./WhyCards.scss";
import Button from "../UI/Button/Button";
import WhyCard from "./WhyCard/WhyCard";

const WhyCards = () => {
    const [flagRotate, setFlagRotate] = useState(false);

    const cards = [
        {
            id: 1,
            photoURL: './images/HomePage/why-club/card-left-1.png',
            titleFront: 'Растим чемпионов!',
            titleBack: "Растим чемпионов!",
            textFront: 'Наши воспитанники регулярно играют и выигрывают на любительских турнирах и турнирах от федерации!',
            textBack: 'Наши воспитанники регулярно играют и выигрывают на любительских турнирах и турнирах от федерации! Каждой группе тренирующихся по уровню при участии присваивается рейтинг! Наши тренеры помогают при участии в соревнованиях от федерации и регулярно "подсказывают" прямо во время турниров!Во время тренировок распределяем игроков по уровню, чтобы всем было комфортно!'
        },
        {
            id: 2,
            photoURL: './images/HomePage/why-club/card-left-1.png',
            titleFront: 'Растим чемпионов!',
            titleBack: "Растим чемпионов!",
            textFront: 'Наши воспитанники регулярно играют и выигрывают на любительских турнирах и турнирах от федерации!',
            textBack: 'Наши воспитанники регулярно играют и выигрывают на любительских турнирах и турнирах от федерации! Каждой группе тренирующихся по уровню при участии присваивается рейтинг! Наши тренеры помогают при участии в соревнованиях от федерации и регулярно "подсказывают" прямо во время турниров!Во время тренировок распределяем игроков по уровню, чтобы всем было комфортно!'
        },
        {
            id: 3,
            photoURL: './images/HomePage/why-club/card-right.png',
            titleFront: 'Комьюнити единомышлеников',
            titleBack: "Растим чемпионов!",
            textFront: '',
            textBack: 'Наши воспитанники регулярно играют и выигрывают на любительских турнирах и турнирах от федерации! Каждой группе тренирующихся по уровню при участии присваивается рейтинг! Наши тренеры помогают при участии в соревнованиях от федерации и регулярно "подсказывают" прямо во время турниров!Во время тренировок распределяем игроков по уровню, чтобы всем было комфортно!'
        },
        
    ];

    return (
        <div className="why-club">
            <div className="container">
                <div className="why-club__title">
                    Почему Craft Badminton Club?
                </div>
                <div className="why-club__row">
                    <div className="why-club__column">
                        <WhyCard card={cards[0]} classChange='left'/>
                        <WhyCard card={cards[1]} classChange='left'/>
                    </div>
                    <div className="why-club__column">
                        <WhyCard card={cards[2]} classChange='right'/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhyCards;
