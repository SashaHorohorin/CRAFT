import React from "react";
import "./HomePage.scss";
import FollowingBtn from "../../components/FollowingBtn/FollowingBtn";
import MainPart from "../../components/MainPart/MainPart";
import Marquee from "../../components/Marquee/Marquee";
import Button from "../../components/UI/Button/Button";

const HomePage = () => {
    // если страница зажружена запускаем воланчик

    return (
        <div className="home">
            <FollowingBtn />
            <MainPart />
            <Marquee classAdd="marquee-first" text="Тренировки по уровням" />
            <div className="why-club">
                <div className="container">
                    <div className="why-club__title">
                        Почему Craft Badminton Club?
                    </div>
                    <div className="why-club__row">
                        <div className="why-club__column">
                            <div className="why-club__card card-left">
                                <div className="card-left__front">
                                    <div className="card-left__img">
                                        <img
                                            src="./images/HomePage/why-club/card-left-1.png"
                                            alt=""
                                        />
                                    </div>
                                    <div className="card-left__content content-card">
                                        <div className="content-card__title">
                                            Растим чемпионов!
                                        </div>
                                        <div className="content-card__text">
                                            Наши воспитанники регулярно играют и
                                            выигрывают на любительских турнирах
                                            и турнирах от федерации!
                                        </div>
                                        <Button
                                            text="Подробнее"
                                            classAdd="content-card__btn"
                                        />
                                    </div>
                                </div>
                                <div className="card-left__back back-card">
                                    <div className="back-card__title">Растим чемпионов!</div>
                                    <div className="back-card__text">Наши воспитанники регулярно играют и выигрывают на любительских турнирах и турнирах от федерации! Каждой группе тренирующихся по уровню при участии присваивается рейтинг! Наши тренеры помогают при участии в соревнованиях от федерации и регулярно "подсказывают" прямо во время турниров!Во время тренировок распределяем игроков по уровню, чтобы всем было комфортно!</div>
                                </div>
                            </div>
                            <div className="why-club__card card-left">
                                <div className="card-left__front">
                                    <div className="card-left__img">
                                        <img
                                            src="./images/HomePage/why-club/card-left-1.png"
                                            alt=""
                                        />
                                    </div>
                                    <div className="card-left__content content-card">
                                        <div className="content-card__title">
                                            Растим чемпионов!
                                        </div>
                                        <div className="content-card__text">
                                            Наши воспитанники регулярно играют и
                                            выигрывают на любительских турнирах
                                            и турнирах от федерации!
                                        </div>
                                        <Button
                                            text="Подробнее"
                                            classAdd="content-card__btn"
                                        />
                                    </div>
                                </div>
                                <div className="card-left__back back-card">
                                    <div className="back-card__title">Растим чемпионов!</div>
                                    <div className="back-card__text">Наши воспитанники регулярно играют и выигрывают на любительских турнирах и турнирах от федерации! Каждой группе тренирующихся по уровню при участии присваивается рейтинг! Наши тренеры помогают при участии в соревнованиях от федерации и регулярно "подсказывают" прямо во время турниров!Во время тренировок распределяем игроков по уровню, чтобы всем было комфортно!</div>
                                </div>
                            </div>
                            
                        </div>
                        <div className="why-club__column">
                            <div className="why-club__card card-right">
                                <div className="card-right__img">
                                    <img
                                        src="./images/HomePage/why-club/card-right.png"
                                        alt=""
                                    />
                                </div>
                                <div className="card-right__content content-card-right">
                                    <div className="content-card-right__title">
                                        Коммьюнити единомышленников!
                                    </div>
                                    <Button
                                        text="Подробнее"
                                        classAdd="content-card-right__btn"
                                    />
                                </div>
                                <div className="card-right__back back-card">
                                    <div className="back-card__title">Растим чемпионов!</div>
                                    <div className="back-card__text">Наши воспитанники регулярно играют и выигрывают на любительских турнирах и турнирах от федерации! Каждой группе тренирующихся по уровню при участии присваивается рейтинг! Наши тренеры помогают при участии в соревнованиях от федерации и регулярно "подсказывают" прямо во время турниров!Во время тренировок распределяем игроков по уровню, чтобы всем было комфортно!</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
