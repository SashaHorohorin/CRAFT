import React from "react";
import "./PersonalPage.scss";
import PeopleAction from "../../components/TrainingComponent/PeopleAction/PeopleAction";
import Competition from "../../components/CompetitionComponent/Competition/Competition";

const PersonalPage = () => {
    return (
        <div className="personal">
            <div className="container">
                <div className="personal__title">Личный кабинет</div>
                <div className="personal__row">
                    <ul className="personal__nav nav-personal">
                        <li className="nav-personal__link">Профиль</li>
                        <li className="nav-personal__link">Тренировки</li>
                        <li className="nav-personal__link">Соревнования</li>
                    </ul>
                    <div className="personal__profile profile-personal">
                        <div className="profile-personal__info info-profile">
                            <div className="info-profile__person">
                                <div className="info-profile__img">
                                    <img
                                        src="./images/PersonalPage/1.jpeg"
                                        alt=""
                                    />
                                </div>
                                <div className="info-profile__info-person info-person">
                                    <div className="info-person__name">
                                        Никита Пирогов
                                    </div>
                                    <div className="info-person__email">
                                        email: pirogov@gmail.com
                                    </div>
                                    <div className="info-person__username">
                                        id: sdfdsf97asfkl
                                    </div>
                                </div>
                            </div>
                            <button className="info-profile__edit">
                                Редактировать
                            </button>
                        </div>
                        <div className="profile-personal__subscription subscription-profile">
                            <div className="subscription-profile__card card-subscription">
                                <div className="card-subscription__img">
                                    <img
                                        src="./images/PersonalPage/card.svg"
                                        alt=""
                                    />
                                </div>
                                <div className="card-subscription__count count-card">
                                    <div className="count-card__count">17</div>
                                    <div className="count-card__label">
                                        Тренировок
                                    </div>
                                </div>
                                <div className="card-subscription__date">
                                    до 20.09.23
                                </div>
                                <div className="card-subscription__name">
                                    Абонемент
                                </div>
                            </div>
                            <div className="subscription-profile__progressbars">
                                <div className="subscription-profile__progressbar progressbar-profile">
                                    <div className="progressbar-profile__label">
                                        Тренировки
                                    </div>

                                    <div className="progressbar-profile__bg">
                                        <div className="progressbar-profile__start">
                                            0
                                        </div>
                                        <div className="progressbar-profile__end">
                                            25
                                        </div>
                                        <div className="progressbar-profile__line">
                                            <div className="progressbar-profile__current">
                                                8
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="subscription-profile__progressbar progressbar-profile">
                                    <div className="progressbar-profile__label">
                                        Срок действия
                                    </div>

                                    <div className="progressbar-profile__bg">
                                        <div className="progressbar-profile__start">
                                            20.06
                                        </div>
                                        <div className="progressbar-profile__end">
                                            20.09
                                        </div>
                                        <div className="progressbar-profile__line">
                                            <div className="progressbar-profile__current">
                                                16.07
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="profile-personal__myworkouts myworkouts-profile">
                            <div className="myworkouts-profile__title">
                                Мои тренировки
                            </div>
                            <div className="myworkouts-profile__workout workout-profile">
                                <div className="workout-profile__title">
                                    Все против всех DE
                                </div>
                                <div className="workout-profile__date">
                                    21.08.2023
                                </div>
                                <div className="workout-profile__time">
                                    20:00
                                </div>
                                <PeopleAction />
                                <button className="workout-profile__follow">
                                    Выписаться
                                </button>
                            </div>
                        </div>
                        <div className="profile-personal__competitions competitions-profile">
                            <div className="competitions-profile__title">
                                Соревнования
                            </div>

                            <Competition />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalPage;
