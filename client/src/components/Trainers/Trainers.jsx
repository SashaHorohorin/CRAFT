import React from "react";
import "./Trainers.scss";
import Trainer from "./Trainer/Trainer";

const Trainers = () => {

    const trainers = [
        {
            id: 1,
            name: 'Алексей Бирюков',
            photoURL: './images/HomePage/Trainers/1.jpg',
            textFront: 'Сертифицированный тренер BWF рейтинг ЛАБ - 801.',
            textBack: '',
        },
        {
            id: 2,
            name: 'Анастасия Умеренкова',
            photoURL: './images/HomePage/Trainers/3.jpg',
            textFront: 'Чемпионка Санкт-Петербурга, рейтинг ЛАБ - 888',
            textBack: '',
        },
        {
            id: 3,
            name: 'Александр Хорохорин',
            photoURL: './images/HomePage/Trainers/4.jpg',
            textFront: 'Победитель городских соревнований, рейтинг ЛАБ - 820',
            textBack: '',
        },
        {
            id: 4,
            name: 'Дмитрий Решетников',
            photoURL: './images/HomePage/Trainers/2.jpg',
            textFront: 'Победитель городских соревнований, рейтинг ЛАБ - 901',
            textBack: '',
        },
        
        
        {
            id: 5,
            name: 'Антон Иванов',
            photoURL: './images/HomePage/Trainers/5.jpg',
            textFront: 'Сертифицированный тренер Международной Федерацией бадминтона, рейтинг ЛАБ - 1016',
            textBack: '',
        },
        {
            id: 6,
            name: 'Ирина Онегина',
            photoURL: './images/HomePage/Trainers/6.jpg',
            textFront: 'Сертифицированный тренер BWF рейтинг ЛАБ - 699',
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
