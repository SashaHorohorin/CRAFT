import React, { useEffect } from "react";
import "./Trainers.scss";
import Trainer from "./Trainer/Trainer";

const Trainers = () => {
    const trainers = [
        {
            id: 1,
            name: "Алексей Бирюков",
            photoURL: "./images/HomePage/Trainers/1.jpg",
            textFront: "Сертифицированный тренер BWF рейтинг ЛАБ - 801.",
            textBack: "",
        },
        {
            id: 2,
            name: "Анастасия Умеренкова",
            photoURL: "./images/HomePage/Trainers/3.jpg",
            textFront: "Чемпионка Санкт-Петербурга, рейтинг ЛАБ - 888",
            textBack: "",
        },
        {
            id: 3,
            name: "Александр Хорохорин",
            photoURL: "./images/HomePage/Trainers/4.jpg",
            textFront: "Победитель городских соревнований, рейтинг ЛАБ - 820",
            textBack: "",
        },
        {
            id: 4,
            name: "Даниил Синяев",
            photoURL: "./images/HomePage/Trainers/2.png",
            textFront: "Победитель городских соревнований, рейтинг ЛАБ - 901",
            textBack: "",
        },

        {
            id: 5,
            name: "Антон Иванов",
            photoURL: "./images/HomePage/Trainers/5.jpg",
            textFront:
                "Сертифицированный тренер Международной Федерацией бадминтона, рейтинг ЛАБ - 1016",
            textBack: "",
        },
        {
            id: 6,
            name: "Ирина Онегина",
            photoURL: "./images/HomePage/Trainers/6.jpg",
            textFront: "Сертифицированный тренер BWF рейтинг ЛАБ - 699",
            textBack: "",
        },
        {
            id: 7,
            name: "Иван Филиппов",
            photoURL: "./images/HomePage/Trainers/7.jpg",
            textFront: "Победитель городских соревнований, рейтинг ЛАБ - 900",
            textBack: "",
        },
    ];

    function fontsize() {
        let block = document.querySelectorAll(".card-trainer");
        let blockInfo = document.querySelectorAll(".info-trainer");

        let name = document.querySelectorAll(
            ".card-trainer .info-trainer__name"
        );
        let text = document.querySelectorAll(
            ".card-trainer .info-trainer__text"
        );
        for (let i = 0; i < block.length; i++) {
            let w = block[i].offsetWidth;
            let hText = text[i].offsetHeight;
            let hName = name[i].offsetHeight;
            
            name[i].style.fontSize = w / 15 + "px";
            // console.log(name[i].style.fontSize);
            if (w / 14 > 20) {
                name[i].style.paddingBottom = 20 + "px";
            } else {
                name[i].style.paddingBottom = w / 20 + "px";
            }
            // if (w/17 > 23){
            //     blockInfo.style.bottom = -23 + "%";
            // }else{
            blockInfo[i].style.bottom =
                -hText -
                parseFloat(blockInfo[i].style.padding) -
                parseFloat(name[i].style.paddingBottom) / 2 +
                "px";
            // console.log(blockInfo[4].style.bottom);
            // console.log(blockInfo[i].style.bottom);
            // blockInfo.style.bottom = -(w/19) + "%";
            // }
            text[i].style.fontSize = w / 18 + "px";
            blockInfo[i].style.padding = w / 20 + "px";
            // if (w / 2.3 > 170) {
                // blockInfo[i].style.height = 170 + "px";
            // } else {
                // blockInfo[i].style.height = w / 2.3 + "px";
            blockInfo[i].style.height = hName + hText + parseFloat(blockInfo[i].style.padding) * 2 + parseFloat(blockInfo[i].style.padding) / 2 + "px";
            // }
            // console.log(hName + hText + parseFloat(blockInfo[i].style.padding) * 3);
        }

        // addEventListener
    }
    // window.onload = fontsize;
    // useEffect(() => {
        
    //     // setTimeout(() => {
    //         fontsize();
    //     // }, 1000)
    // }, []);
    // window.onresize = fontsize;

    return (
        <div onLoad={() => fontsize()} className="trainer">
            <div className="container">
                <div className="trainer__title">Наши тренеры</div>
                <div className="trainer__row">
                    {trainers.map((trainer, index) => (
                        <Trainer
                            trainer={trainer}
                            key={trainer.id}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Trainers;
