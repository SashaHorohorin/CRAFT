import React, { useEffect, useState } from "react";
import "./CompetitionsPage.scss";
import Competition from "../../components/CompetitionComponent/Competition/Competition";
import { useFetching } from "../../hooks/useFetching";
import DataService from "../../API/DataService";
import Loader from "../../components/Loader/Loader";

const СompetitionsPage = () => {
    const [competitions, setСompetitions] = useState([]);

    const [moreInfoFlag, setMoreInfoFlag] = useState(false);
    const [modalCompetition, setModalCompetition] = useState({});

    const [fetchingCompetition, isLoadingCompetition, errorCompetition] =
        useFetching(async () => {
            // console.log('saskfhjahfshahfjshfkjshkj');
            const response = await DataService.getCompetitionAllActive();
            console.log(response.data);
            setСompetitions(response.data);
            // let complex = [...response.data];
        });

    useEffect(() => {
        fetchingCompetition();
    }, []);

    const openModal = (type) => {
        console.log(type.type);
        setModalCompetition(type);
        setMoreInfoFlag(true);
    };

    const getTime = (date) => {
        let d = new Date(date);
        let time = `${d.getHours() < 10 ? `0${d.getHours()}` : d.getHours()}:${
            d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes()
        }`;
        return time;
    };

    return (
        <>
            {isLoadingCompetition ? (
                <Loader />
            ) : (
                <div className="competitions">
                    <div
                        onClick={() => setMoreInfoFlag(false)}
                        className={
                            moreInfoFlag
                                ? "competitions__bg active"
                                : "competitions__bg"
                        }
                    >
                        <div className="competitions__modal modal-competition-info">
                            {modalCompetition.type == "Пара" ? (
                                <p>
                                    Приглашаем на турнир{" "}
                                    {`${modalCompetition.category}`} пары
                                    <br />
                                    Записаться можно только мужской или женской
                                    парой.
                                    <br />
                                    Минимальный рейтинг для записи на
                                    соревнования{" "}
                                    {modalCompetition.category == "AB" ||
                                    modalCompetition.category == "AB"
                                        ? `${modalCompetition.ratingDown}`
                                        : `${modalCompetition.ratingUp}`}
                                    <br />
                                    Стоимость - 750 рублей для тренирующихся в
                                    Крафте
                                    <br />
                                    Для остальных - 850 рублей.
                                    <br />
                                    <br />
                                    Место СК{" "}
                                    {`${modalCompetition.sportComplex}`},
                                    Челиева, 13
                                    <br />
                                    <br />
                                    Начало турнира в{" "}
                                    {`${getTime(
                                        modalCompetition.startCompetition
                                    )}`}
                                    <br />
                                    <br />
                                    Оплата соревнований происходит переводом на
                                    тинькоф по номеру:{" "}
                                    <a href="tel:+79030975817">
                                        +7(903) 097 58 17
                                    </a>
                                </p>
                            ) : modalCompetition.type == "Микст" ? (
                                <p>
                                    Приглашаем на турнир{" "}
                                    {`${modalCompetition.category}`} миксты
                                    <br />
                                    Записаться можно только микстом.
                                    <br />
                                    Минимальный рейтинг для записи на
                                    соревнования{" "}
                                    {modalCompetition.category == "AB" ||
                                    modalCompetition.category == "AB"
                                        ? `${modalCompetition.ratingDown}`
                                        : `${modalCompetition.ratingUp}`}
                                    <br />
                                    Стоимость - 750 рублей для тренирующихся в
                                    Крафте
                                    <br />
                                    Для остальных - 850 рублей.
                                    <br />
                                    <br />
                                    Место СК{" "}
                                    {`${modalCompetition.sportComplex}`},
                                    Челиева, 13
                                    <br />
                                    <br />
                                    Начало турнира в{" "}
                                    {`${getTime(
                                        modalCompetition.startCompetition
                                    )}`}
                                    <br />
                                    <br />
                                    Оплата соревнований происходит переводом на
                                    тинькоф по номеру:{" "}
                                    <a href="tel:+79030975817">
                                        +7(903) 097 58 17
                                    </a>
                                </p>
                            ) : (
                                <p>
                                    Приглашаем на турнир{" "}
                                    {`${modalCompetition.category}`} все против
                                    всех
                                    <br />
                                    Записаться можно мужской или женской парой
                                    или микстом.
                                    <br />
                                    Минимальный рейтинг для записи на
                                    соревнования{" "}
                                    {modalCompetition.category == "AB" ||
                                    modalCompetition.category == "AB"
                                        ? `${modalCompetition.ratingDown}`
                                        : `${modalCompetition.ratingUp}`}
                                    <br />
                                    Стоимость - 750 рублей для тренирующихся в
                                    Крафте
                                    <br />
                                    Для остальных - 850 рублей.
                                    <br />
                                    <br />
                                    Место СК{" "}
                                    {`${modalCompetition.sportComplex}`},
                                    Челиева, 13
                                    <br />
                                    <br />
                                    Начало турнира в{" "}
                                    {`${getTime(
                                        modalCompetition.startCompetition
                                    )}`}
                                    <br />
                                    <br />
                                    Оплата соревнований происходит переводом на
                                    тинькоф по номеру:{" "}
                                    <a href="tel:+79030975817">
                                        +7(903) 097 58 17
                                    </a>
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="container">
                        <div className="competitions__container">
                            <div className="competitions__title">
                                Соревнования
                            </div>
                            <div className="competitions__row">
                                {competitions.map((competition, index) => (
                                    <Competition
                                        key={competition.id}
                                        competition={competition}
                                        openModal={(type) => openModal(type)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default СompetitionsPage;
