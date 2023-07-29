import React, { useEffect } from "react";
import Carousel from "../Carousel/Carousel";
import PeopleAction from '../TrainingComponent/PeopleAction/PeopleAction'

const Workouts = ({ workouts, date }) => {
    const workLog = () => {
        console.log(workouts[0]?.type);
    };
    return (
        <>
            <div className="workouts">
                <div
                    onClick={() => workLog()}
                    className="workouts__date date-workouts"
                >
                    <div className="date-workouts__week">ПН</div>
                    <div className="date-workouts__day">{`${
                        date.getDate() < 10
                            ? `0${date.getDate()}`
                            : date.getDate()
                    }.${
                        date.getMonth() < 10
                            ? `0${date.getMonth()}`
                            : date.getMonth()
                    }`}</div>
                </div>
                <div className="workouts__items">
                    
                    <Carousel>

                        <div className="workouts__item workout">
                            <div className="workout__row">
                                <div className="workout__column">
                                    <div className="workout__info info-workout">
                                        <div className="info-workout__name">
                                            Тренировка для начинающих и
                                            продолжающих
                                        </div>
                                        <div className="info-workout__btn btn-workout">
                                            подробнее
                                        </div>
                                    </div>
                                </div>
                                <div className="workout__column">
                                    <div className="workout__time time-workout">
                                        <div className="time-workout__label">
                                            Время
                                        </div>
                                        <div className="time-workout__interval">
                                            18:30 - 20:00
                                        </div>
                                    </div>
                                </div>
                                <div className="workout__column">
                                    <div className="workout__trainer trainer-workout">
                                        <div className="trainer-workout__label">
                                            Тренер
                                        </div>
                                        <div className="trainer-workout__name">
                                            Хорохорин Александр
                                        </div>
                                    </div>
                                </div>
                                <div className="workout__column">
                                    <div className="workout__actions actions-workout">
                                        <PeopleAction/>
                                        <div className="actions-workout__btn btn-workout">
                                            Записаться
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="workouts__item workout">
                            <div className="workout__row">
                                <div className="workout__column">
                                    <div className="workout__info info-workout">
                                        <div className="info-workout__name">
                                            Тренировка для начинающих и
                                            продолжающих
                                        </div>
                                        <div className="info-workout__btn btn-workout">
                                            подробнее
                                        </div>
                                    </div>
                                </div>
                                <div className="workout__column">
                                    <div className="workout__time time-workout">
                                        <div className="time-workout__label">
                                            Время
                                        </div>
                                        <div className="time-workout__interval">
                                            18:30 - 20:00
                                        </div>
                                    </div>
                                </div>
                                <div className="workout__column">
                                    <div className="workout__trainer trainer-workout">
                                        <div className="trainer-workout__label">
                                            Тренер
                                        </div>
                                        <div className="trainer-workout__name">
                                            Хорохорин Александр
                                        </div>
                                    </div>
                                </div>
                                <div className="workout__column">
                                    <div className="workout__actions actions-workout">
                                        <div className="actions-workout__people people-actions">
                                            <div className="people-actions__circles">
                                                <div className="people-actions__circle"></div>
                                                <div className="people-actions__circle"></div>
                                                <div className="people-actions__circle"></div>
                                            </div>
                                            <div className="people-actions__count count-people">
                                                <div className="count-people__title">
                                                    и еще 7 человек
                                                </div>
                                                <div className="count-people__text">
                                                    пойдут на тренировку
                                                </div>
                                            </div>
                                        </div>
                                        <div className="actions-workout__btn btn-workout">
                                            Записаться
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="workouts__item workout">
                            <div className="workout__row">
                                <div className="workout__column">
                                    <div className="workout__info info-workout">
                                        <div className="info-workout__name">
                                            Тренировка для начинающих и
                                            продолжающих
                                        </div>
                                        <div className="info-workout__btn btn-workout">
                                            подробнее
                                        </div>
                                    </div>
                                </div>
                                <div className="workout__column">
                                    <div className="workout__time time-workout">
                                        <div className="time-workout__label">
                                            Время
                                        </div>
                                        <div className="time-workout__interval">
                                            18:30 - 20:00
                                        </div>
                                    </div>
                                </div>
                                <div className="workout__column">
                                    <div className="workout__trainer trainer-workout">
                                        <div className="trainer-workout__label">
                                            Тренер
                                        </div>
                                        <div className="trainer-workout__name">
                                            Хорохорин Александр
                                        </div>
                                    </div>
                                </div>
                                <div className="workout__column">
                                    <div className="workout__actions actions-workout">
                                        <div className="actions-workout__people people-actions">
                                            <div className="people-actions__circles">
                                                <div className="people-actions__circle"></div>
                                                <div className="people-actions__circle"></div>
                                                <div className="people-actions__circle"></div>
                                            </div>
                                            <div className="people-actions__count count-people">
                                                <div className="count-people__title">
                                                    и еще 7 человек
                                                </div>
                                                <div className="count-people__text">
                                                    пойдут на тренировку
                                                </div>
                                            </div>
                                        </div>
                                        <div className="actions-workout__btn btn-workout">
                                            Записаться
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="workouts__item workout">
                            <div className="workout__row">
                                <div className="workout__column">
                                    <div className="workout__info info-workout">
                                        <div className="info-workout__name">
                                            Тренировка для начинающих и
                                            продолжающих
                                        </div>
                                        <div className="info-workout__btn btn-workout">
                                            подробнее
                                        </div>
                                    </div>
                                </div>
                                <div className="workout__column">
                                    <div className="workout__time time-workout">
                                        <div className="time-workout__label">
                                            Время
                                        </div>
                                        <div className="time-workout__interval">
                                            18:30 - 20:00
                                        </div>
                                    </div>
                                </div>
                                <div className="workout__column">
                                    <div className="workout__trainer trainer-workout">
                                        <div className="trainer-workout__label">
                                            Тренер
                                        </div>
                                        <div className="trainer-workout__name">
                                            Хорохорин Александр
                                        </div>
                                    </div>
                                </div>
                                <div className="workout__column">
                                    <div className="workout__actions actions-workout">
                                        <div className="actions-workout__people people-actions">
                                            <div className="people-actions__circles">
                                                <div className="people-actions__circle"></div>
                                                <div className="people-actions__circle"></div>
                                                <div className="people-actions__circle"></div>
                                            </div>
                                            <div className="people-actions__count count-people">
                                                <div className="count-people__title">
                                                    и еще 7 человек
                                                </div>
                                                <div className="count-people__text">
                                                    пойдут на тренировку
                                                </div>
                                            </div>
                                        </div>
                                        <div className="actions-workout__btn btn-workout">
                                            Записаться
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="workouts__item workout">
                            <div className="workout__row">
                                <div className="workout__column">
                                    <div className="workout__info info-workout">
                                        <div className="info-workout__name">
                                            Тренировка для начинающих и
                                            продолжающих
                                        </div>
                                        <div className="info-workout__btn btn-workout">
                                            подробнее
                                        </div>
                                    </div>
                                </div>
                                <div className="workout__column">
                                    <div className="workout__time time-workout">
                                        <div className="time-workout__label">
                                            Время
                                        </div>
                                        <div className="time-workout__interval">
                                            18:30 - 20:00
                                        </div>
                                    </div>
                                </div>
                                <div className="workout__column">
                                    <div className="workout__trainer trainer-workout">
                                        <div className="trainer-workout__label">
                                            Тренер
                                        </div>
                                        <div className="trainer-workout__name">
                                            Хорохорин Александр
                                        </div>
                                    </div>
                                </div>
                                <div className="workout__column">
                                    <div className="workout__actions actions-workout">
                                        <div className="actions-workout__people people-actions">
                                            <div className="people-actions__circles">
                                                <div className="people-actions__circle"></div>
                                                <div className="people-actions__circle"></div>
                                                <div className="people-actions__circle"></div>
                                            </div>
                                            <div className="people-actions__count count-people">
                                                <div className="count-people__title">
                                                    и еще 7 человек
                                                </div>
                                                <div className="count-people__text">
                                                    пойдут на тренировку
                                                </div>
                                            </div>
                                        </div>
                                        <div className="actions-workout__btn btn-workout">
                                            Записаться
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="workouts__item workout">
                            <div className="workout__row">
                                <div className="workout__column">
                                    <div className="workout__info info-workout">
                                        <div className="info-workout__name">
                                            Тренировка для начинающих и
                                            продолжающих
                                        </div>
                                        <div className="info-workout__btn btn-workout">
                                            подробнее
                                        </div>
                                    </div>
                                </div>
                                <div className="workout__column">
                                    <div className="workout__time time-workout">
                                        <div className="time-workout__label">
                                            Время
                                        </div>
                                        <div className="time-workout__interval">
                                            18:30 - 20:00
                                        </div>
                                    </div>
                                </div>
                                <div className="workout__column">
                                    <div className="workout__trainer trainer-workout">
                                        <div className="trainer-workout__label">
                                            Тренер
                                        </div>
                                        <div className="trainer-workout__name">
                                            Хорохорин Александр
                                        </div>
                                    </div>
                                </div>
                                <div className="workout__column">
                                    <div className="workout__actions actions-workout">
                                        <div className="actions-workout__people people-actions">
                                            <div className="people-actions__circles">
                                                <div className="people-actions__circle"></div>
                                                <div className="people-actions__circle"></div>
                                                <div className="people-actions__circle"></div>
                                            </div>
                                            <div className="people-actions__count count-people">
                                                <div className="count-people__title">
                                                    и еще 7 человек
                                                </div>
                                                <div className="count-people__text">
                                                    пойдут на тренировку
                                                </div>
                                            </div>
                                        </div>
                                        <div className="actions-workout__btn btn-workout">
                                            Записаться
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Carousel>
                </div>
            </div>
        </>
    );
};

export default Workouts;
