import React, { useEffect, useState } from "react";
import "./CompetitionsPage.scss";
import Competition from "../../components/CompetitionComponent/Competition/Competition";
import { useFetching } from "../../hooks/useFetching";
import DataService from "../../API/DataService";

const СompetitionsPage = () => {
    const [competitions, setСompetitions] = useState([]);

    const [moreInfoFlag, setMoreInfoFlag] = useState(false);
    const [modalCompetition, setModalCompetition] = useState({});

    const [fetchingCompetition, isLoadingCompetition, errorCompetition] =
        useFetching(async () => {
            // console.log('saskfhjahfshahfjshfkjshkj');
            const response = await DataService.getСompetitions();
            console.log(response.data);
            setСompetitions(response.data);
            // let complex = [...response.data];
        });

    useEffect(() => {
        fetchingCompetition();
    }, []);

    const openModal = (type) => {
        console.log(type);
        setModalCompetition(type);
        setMoreInfoFlag(true);
    };

    return (
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
                    sdlfjldsfj
                </div>
            </div>

            <div className="container">
                <div className="competitions__container">
                    <div className="competitions__title">Соревнования</div>
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
    );
};

export default СompetitionsPage;
