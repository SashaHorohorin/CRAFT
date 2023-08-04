import React, { useEffect, useState } from "react";
import "./PersonalPage.scss";
import PeopleAction from "../../components/TrainingComponent/PeopleAction/PeopleAction";
import Competition from "../../components/CompetitionComponent/Competition/Competition";
import { useFetching } from "../../hooks/useFetching";
import DataService from "../../API/DataService";
import PersonalTraining from "../../components/PersonalComponent/PersonalTraining";
import InviteItem from "../../components/PersonalComponent/InviteItem";

const PersonalPage = () => {
    const [profileData, setProfileData] = useState({});
    const [workoutTrain, setWorkoutTrain] = useState([]);

    const [fetchingProfile, isLoadingProfile, errorProfile] = useFetching(
        async (username) => {
            // console.log('saskfhjahfshahfjshfkjshkj');
            const response = await DataService.getProfile(username);
            console.log(response.data);
            setProfileData(response.data);
            setWorkoutTrain(response.data.trains)
        }
    );
    

    useEffect(() => {
        fetchingProfile(localStorage.getItem("username"));
    }, []);


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
                                        {profileData.firstName +
                                            " " +
                                            profileData.lastName}
                                    </div>
                                    <div className="info-person__email">
                                        email: {profileData.email}
                                    </div>
                                    <div className="info-person__username">
                                        id: {profileData.username}
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
                        <div className="profile-personal__invite-pair invite-pair">
                            <div className="invite-pair__title">
                                Приглашения в пару 
                            </div>
                            <div className="invite-pair__row">
                                <InviteItem type='invite'/>
                                
                            </div>
                            
                        </div>
                        <div className="profile-personal__invite-pair invite-pair">
                            <div className="invite-pair__title">
                                Заявки на вступление в пару  
                            </div>
                            <div className="invite-pair__row">
                                <InviteItem type='join'/>
                                
                            </div>
                            
                        </div>
                        <div className="profile-personal__myworkouts myworkouts-profile">
                            <div className="myworkouts-profile__title">
                                Мои тренировки
                            </div>
                            {workoutTrain?.map((train, index) => (
                                    <PersonalTraining key={index} train={train} setWorkoutTrain={(workout) => setWorkoutTrain(workout)}  workoutTrain={workoutTrain}/>
                            ))}
                        </div>
                        <div className="profile-personal__competitions competitions-profile">
                            <div className="competitions-profile__title">
                                Соревнования
                            </div>
                            {profileData.competitions?.map(
                                (competition, index) => (
                                    <Competition
                                        key={competition.id}
                                        competition={competition}
                                    />
                                )
                            )}
                            {/* <Competition /> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalPage;
