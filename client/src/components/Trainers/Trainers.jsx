import React from "react";
import "./Trainers.scss";
import Trainer from "./Trainer/Trainer";

const Trainers = () => {

    const trainers = [
        {
            id: 1,
            name: 'Алексей Бирюков',
            photoURL: './images/HomePage/Trainers/1.png',
            textFront: 'Сертифицированный тренер BWF рейтинг ЛАБ - 801.',
            textBack: '',
        },
        {
            id: 2,
            name: 'Александр Хорохорин',
            photoURL: './images/HomePage/Trainers/1.png',
            textFront: 'Сертифицированный тренер BWF рейтинг ЛАБ - 801.',
            textBack: '',
        },
        {
            id: 3,
            name: 'Алексей Бирюков',
            photoURL: './images/HomePage/Trainers/1.png',
            textFront: 'Сертифицированный тренер BWF рейтинг ЛАБ - 801.',
            textBack: '',
        },
        {
            id: 4,
            name: 'Алексей Бирюков',
            photoURL: './images/HomePage/Trainers/1.png',
            textFront: 'Сертифицированный тренер BWF рейтинг ЛАБ - 801.',
            textBack: '',
        },
        {
            id: 5,
            name: 'Алексей Бирюков',
            photoURL: './images/HomePage/Trainers/1.png',
            textFront: 'Сертифицированный тренер BWF рейтинг ЛАБ - 801.',
            textBack: '',
        },
        {
            id: 6,
            name: 'Алексей Бирюков',
            photoURL: './images/HomePage/Trainers/1.png',
            textFront: 'Сертифицированный тренер BWF рейтинг ЛАБ - 801.',
            textBack: '',
        },
        
    ]

    return (
        <div className="trainer">
            <div className="container">
                <div className="trainer__title">Наши тренеры</div>
                <div className="trainer__row">
                    {trainers.map((trainer, index) => (
                        <Trainer trainer={trainer} key={trainer.id}/>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Trainers;
