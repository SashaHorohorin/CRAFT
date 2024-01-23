import React, { useEffect, useState } from "react";
import "./PersonalPage.scss";
import PeopleAction from "../../components/TrainingComponent/PeopleAction/PeopleAction";
import Competition from "../../components/CompetitionComponent/Competition/Competition";
import { useFetching } from "../../hooks/useFetching";
import DataService from "../../API/DataService";
import PersonalTraining from "../../components/PersonalComponent/PersonalTraining";
import InviteItem from "../../components/PersonalComponent/InviteItem";
import AdminPage from "../AdminPage/AdminPage";
import { Navigate } from "react-router";
import { Link, animateScroll as scroll } from "react-scroll";
import ModalLabId from "../../components/ModalLabId/ModalLabId";
import Loader from "../../components/Loader/Loader";
import InputReg from "../../components/InputReg/InputReg";

const PersonalPage = () => {
    const [profileData, setProfileData] = useState({});
    const [workoutTrain, setWorkoutTrain] = useState([]);
    const [competitions, setCompetitions] = useState([]);
    const [requestToInvite, setRequestToInvite] = useState([]);
    const [requestToJoin, setRequestToJoin] = useState([]);
    const [flagModalLabId, setFlagModalLabId] = useState(false);
    const [labId, setLabId] = useState("");
    const [flagModalError, setFlagModalError] = useState(false);
    const [error, setError] = useState("");

    // const [flagSucces, setFlagSucces] = useState(false);

    const [fetchingRating, isLoadingRating, errorRating] = useFetching(
        async (obj) => {
            const response = await DataService.postSetLabId(obj);
            if (response.data) {
                localStorage.setItem("labId", obj.labID);
            }
            // console.log();
        }
    );

    const sendLabId = async (labId) => {
        setLabId(labId);
        let newObjLabId = {
            username: localStorage.getItem("username"),
            labID: labId,
        };
        await fetchingRating(newObjLabId);
        // console.log(resp);
        // console.log("flagSucces: "+flagSucces);
    };

    const updateItemsFromInvites = (id, obj) => {
        setRequestToInvite(
            requestToInvite.filter((request) => {
                if (request.typeOfRequest == "INVITE") {
                    return (
                        request.request.username != obj.username ||
                        request.pairId != id
                    );
                } else {
                    return (
                        localStorage.getItem("username") != obj.username ||
                        request.pairId != id
                    );
                }
            })
        );
        setRequestToJoin(
            requestToJoin.filter((request) => {
                if (request.typeOfRequest == "INVITE") {
                    return (
                        localStorage.getItem("username") != obj.username ||
                        request.pairId != id
                    );
                } else {
                    console.log(request.request.username);
                    console.log(obj.username);
                    return (
                        request.request.username != obj.username ||
                        request.pairId != id
                    );
                }
            })
        );
    };

    const updateItemsFromJoin = (id, obj) => {
        setRequestToJoin(
            requestToJoin.filter((request) => {
                if (request.typeOfRequest == "INVITE") {
                    return (
                        localStorage.getItem("username") != obj.username ||
                        request.pairId != id
                    );
                } else {
                    console.log(request.request.username);
                    console.log(obj.username);
                    return (
                        request.request.username != obj.username ||
                        request.pairId != id
                    );
                }
            })
        );
    };

    const [fetchingProfile, isLoadingProfile, errorProfile] = useFetching(
        async (username) => {
            // console.log('saskfhjahfshahfjshfkjshkj');
            const response = await DataService.getProfile(username);
            console.log(response.data);
            setProfileData(response.data);
            setWorkoutTrain(response.data.trains);
            setCompetitions(response.data.competitions);
            setRequestToInvite([
                ...response.data.fromRequestsToInvite,
                ...response.data.fromRequestsToJoin,
            ]);
            setRequestToJoin([
                ...response.data.toRequestToInvite,
                ...response.data.toRequestToJoin,
            ]);
        }
    );
    const [fetchingDeletePair, isLoadingDeletePair, errorDeletePair] =
        useFetching(async (id) => {
            const response = await DataService.postDeletePair(id);
            console.log(response.data);
            setCompetitions(
                competitions.filter((competition) => {
                    return competition.id != response.data.id;
                })
            );
        });
    const [
        fetchingDeleteInvitePair,
        isLoadingDeleteInvitePair,
        errorDeleteInvitePair,
    ] = useFetching(async (id, obj) => {
        const response = await DataService.postRejectInvitePair(id, obj);
        updateItemsFromInvites(id, obj);
    });
    const [
        fetchingDeleteJoinPair,
        isLoadingDeleteJoinPair,
        errorDeleteJoinPair,
    ] = useFetching(async (id, obj) => {
        const response = await DataService.postRejectJoinPair(id, obj);
        updateItemsFromInvites(id, obj);
    });
    const [
        fetchingAcceptJoinPair,
        isLoadingAcceptJoinPair,
        errorAcceptJoinPair,
    ] = useFetching(async (id, obj) => {
        const response = await DataService.postAcceptJoinPair(id, obj).catch(
            (error) => {
                setError(error.response.data.message);
                setFlagModalError(true);
                fetchingDeleteJoinPair(id, obj);
                setTimeout(() => {
                    setFlagModalError(false);
                }, 3000);
            }
        );
        if (competitions.filter((c) => c.id == response.data.id).length == 0) {
            setCompetitions([...competitions, response.data]);
        }
        updateItemsFromJoin(id, obj);
    });

    const [
        fetchingAcceptInvitePair,
        isLoadingAcceptInvitePair,
        errorAcceptInvitePair,
    ] = useFetching(async (competitionPairId, obj) => {
        const response = await DataService.postAcceptInvitePair(
            competitionPairId,
            obj
        ).catch((error) => {
            setError(error.response.data.message);
            setFlagModalError(true);
            fetchingDeleteInvitePair(competitionPairId, obj);
            setTimeout(() => {
                setFlagModalError(false);
            }, 3000);
        });
        if (competitions.filter((c) => c.id == response.data.id).length == 0) {
            setCompetitions([...competitions, response.data]);
        }
        updateItemsFromJoin(competitionPairId, obj);
    });

    const deletePair = (pairId, competitionId) => {
        fetchingDeletePair(pairId);
        setRequestToInvite(
            requestToInvite.filter((request) => {
                if (request.typeOfRequest == "INVITE") {
                    return request.competitionId != competitionId;
                }
            })
        );
    };
    const deleteInvite = (pairId, user) => {
        console.log(user);
        fetchingDeleteInvitePair(pairId, { username: user });
    };
    const deleteJoin = (pairId, user) => {
        fetchingDeleteJoinPair(pairId, { username: user });
    };
    const acceptJoin = (pairId, user) => {
        fetchingAcceptJoinPair(pairId, { username: user });
    };
    const acceptInvite = (pairId, user) => {
        fetchingAcceptInvitePair(pairId, { username: user });
    };

    useEffect(() => {
        fetchingProfile(localStorage.getItem("username"));
    }, []);

    const getDateYear = (date) => {
        let d = new Date(date);
        let time = `${d.getDate() < 10 ? `0${d.getDate()}` : d.getDate()}.${
            d.getMonth() < 9 ? `0${d.getMonth() + 1}` : d.getMonth() + 1
        }.${d.getFullYear()}`;
        return time;
    };
    const getDate = (date) => {
        let d = new Date(date);
        let time = `${d.getDate() < 10 ? `0${d.getDate()}` : d.getDate()}.${
            d.getMonth() < 9 ? `0${d.getMonth() + 1}` : d.getMonth() + 1
        }`;
        return time;
    };

    const getTime = (dateNow, dateNext) => {
        let d = new Date(dateNext);
        let da = new Date();
        let dat = new Date(dateNow);
        // let time = `${d.getHours() < 10 ? `0${d.getHours()}`:d.getHours()}:${d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes()}`;
        console.log((100 / (d - dat)) * (da - dat));
        // return time;
    };

    const nowDate = () => {
        let d = new Date();
        let time = `${d.getDate() < 10 ? `0${d.getDate()}` : d.getDate()}.${
            d.getMonth() < 9 ? `0${d.getMonth() + 1}` : d.getMonth() + 1
        }`;
        return time;
    };

    //==================
    const [flagModalEdit, setFlagOenModalEdit] = useState(false);
    const [objEdit, setObjEdit] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        idRating: "",
    });

    const [
        fetchingEditProfile,
        isLoadingEditProfile,
        errorEditProfile,
    ] = useFetching(async (obj) => {
        const response = await DataService.postEditProfile(obj);
        console.log(response.data);
        setProfileData(response.data)
    });

    useEffect(() => {
        setObjEdit({
            firstName: profileData.firstName,
            lastName: profileData.lastName,
            email: profileData.email,
            phoneNumber: profileData.phoneNumber,
            idRating: localStorage.getItem('labId')
        })
    }, [profileData])

    const [valueRating, setValueRating] = useState('')

    const [flagExeptionReg, setFlagExeptionReg] = useState(false);

    const closeModalEdit = () => {
        setFlagOenModalEdit(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    function validate(email) {
        let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (reg.test(email) == false) {
            //    alert('Введите корректный e-mail');
            return false;
        }
    }

    const handleRatingChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        setValueRating(value)
        let newObj = {
            ...objEdit, 
            [name]: value
        }
        setObjEdit(newObj);

    }

    const sendEdit = () => {
        if (validate(objEdit.email) == false) {
            setFlagExeptionReg(true);
            return;
        }
        setFlagExeptionReg(false)
        
        fetchingEditProfile(objEdit)
        setFlagOenModalEdit(false)

    }

    return (
        <>
            {isLoadingProfile ? (
                <Loader />
            ) : localStorage.getItem("roles") == "ADMIN" ? (
                <Navigate to="/admin-page/training-change" />
            ) : (
                <div className="personal">
                    <div
                        // onClick={(event) => closeModalEdit(event)}
                        className={
                            flagModalEdit
                                ? "modal-applications__bg active"
                                : "modal-applications__bg"
                        }
                    >
                        <div className="applications__modal modal-applications">
                            <div className="modal-applications__row">
                                <div className="modal-applications__header edit-modal-header">
                                    <div className="modal-applications__title">
                                        Изменение профиля
                                    </div>
                                    <div
                                        onClick={(event) =>
                                            closeModalEdit(event)
                                        }
                                        className="modal-applications__close"
                                    >
                                        <span>X</span>
                                    </div>
                                </div>
                                <div className="modal-applications__mine mine-applications">
                                    <div className="mine-applications__fitst-time edit-modal">
                                        <form
                                            className="mine-applications__form edit-modal-form"
                                            action=""
                                            onSubmit={handleSubmit}
                                        >
                                            <InputReg
                                                type="text"
                                                // valueInp={regFlagReset}
                                                name="firstName"
                                                className="form__input"
                                                obj={objEdit}
                                                setData={(newObj) =>
                                                    setObjEdit(newObj)
                                                }
                                                required
                                                autoFocus
                                                autoComplete="off"
                                                nameLabel="Имя"
                                                flagFill={true}
                                            />
                                            <InputReg
                                                type="text"
                                                name="lastName"
                                                // valueInp={regFlagReset}
                                                obj={objEdit}
                                                setData={(newObj) =>
                                                    setObjEdit(newObj)
                                                }
                                                className="form__input"
                                                autoComplete="off"
                                                required
                                                nameLabel="Фамилия"
                                                flagFill={true}
                                            />
                                            <InputReg
                                                type="text"
                                                // valueInp={regFlagReset}
                                                name="email"
                                                autoComplete="off"
                                                obj={objEdit}
                                                setData={(newObj) =>
                                                    setObjEdit(newObj)
                                                }
                                                classField={
                                                    flagExeptionReg
                                                        ? "email"
                                                        : ""
                                                }
                                                className="form__input"
                                                required
                                                nameLabel="Email"
                                                flagFill={true}
                                            />
                                            {flagExeptionReg ? (
                                                <span className="exeption-email">
                                                    Введена неверная почта
                                                </span>
                                            ) : null}
                                            <InputReg
                                                type="tel"
                                                // valueInp={regFlagReset}
                                                name="phoneNumber"
                                                obj={objEdit}
                                                autoComplete="off"
                                                setData={(newObj) =>
                                                    setObjEdit(newObj)
                                                }
                                                className="form__input"
                                                required
                                                nameLabel="Телефон"
                                                flagFill={true}
                                            />
                                            <label
                                                className="mine-applications__label"
                                                htmlFor="idRating"
                                            >
                                                Ваш ID:
                                            </label>
                                            <input
                                                className="mine-applications__input-rating"
                                                type="text"
                                                id="idRating"
                                                name="idRating"
                                                value={objEdit.idRating}
                                                onChange={handleRatingChange}
                                            />
                                        </form>
                                    </div>
                                    <button
                                        onClick={() => sendEdit()}
                                        className="find-person__button"
                                    >
                                        Изменить
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className={
                            flagModalError
                                ? "modal-window active"
                                : "modal-window"
                        }
                    >
                        <div
                            onClick={() => setFlagModalError(false)}
                            className="modal-window__close"
                        >
                            <span></span>
                            <span></span>
                        </div>
                        <div className="modal-window__title">{error}</div>
                    </div>
                    <ModalLabId
                        setFlag={(bool) => setFlagModalLabId(bool)}
                        flag={flagModalLabId}
                        sendFunc={(labId) => sendLabId(labId)}
                    />
                    <div className="container">
                        <div className="personal__title">Личный кабинет</div>
                        <div className="personal__row">
                            <ul className="personal__nav nav-personal">
                                <Link
                                    // ctiveClass="active"
                                    to="profile"
                                    spy={true}
                                    smooth={true}
                                    offset={-120}
                                    duration={500}
                                    className="nav-personal__link"
                                >
                                    Профиль
                                </Link>
                                <Link
                                    // ctiveClass="active"
                                    to="train"
                                    spy={true}
                                    smooth={true}
                                    offset={-120}
                                    duration={500}
                                    className="nav-personal__link"
                                >
                                    Тренировки
                                </Link>
                                <Link
                                    // ctiveClass="active"
                                    to="competition"
                                    spy={true}
                                    smooth={true}
                                    offset={-120}
                                    duration={500}
                                    className="nav-personal__link"
                                >
                                    Соревнования
                                </Link>
                            </ul>
                            <div
                                id="profile"
                                className="personal__profile profile-personal"
                            >
                                <div className="profile-personal__info info-profile">
                                    <div className="info-profile__person">
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
                                    <button onClick={() => setFlagOenModalEdit(true)} className="info-profile__edit">
                                        Редактировать профиль
                                    </button>
                                </div>
                                {profileData.priceSubscription ? (
                                    <div className="profile-personal__subscription subscription-profile">
                                        <div className="subscription-profile__card card-subscription">
                                            <div className="card-subscription__img">
                                                <img
                                                    src="./images/PersonalPage/card.svg"
                                                    alt=""
                                                />
                                                <div className="card-subscription__count count-card">
                                                    <div className="count-card__count">
                                                        {
                                                            profileData
                                                                ?.priceSubscription
                                                                ?.maxTrains
                                                        }
                                                    </div>
                                                    <div className="count-card__label">
                                                        Тренировок
                                                    </div>
                                                </div>
                                                <div className="card-subscription__date">
                                                    до{" "}
                                                    {getDateYear(
                                                        profileData
                                                            ?.priceSubscription
                                                            ?.endSubscription
                                                    )}
                                                </div>
                                                <div
                                                    onClick={() =>
                                                        getTime(
                                                            profileData
                                                                ?.priceSubscription
                                                                ?.startSubscription,
                                                            profileData
                                                                ?.priceSubscription
                                                                ?.endSubscription
                                                        )
                                                    }
                                                    className="card-subscription__name"
                                                >
                                                    Абонемент
                                                </div>
                                            </div>
                                        </div>
                                        <div className="subscription-profile__progressbars">
                                            <div className="subscription-profile__progressbar progressbar-profile">
                                                <div
                                                    onClick={() =>
                                                        console.log(
                                                            `${
                                                                100 /
                                                                profileData
                                                                    ?.priceSubscription
                                                                    ?.maxTrains
                                                            } + %`
                                                        )
                                                    }
                                                    className="progressbar-profile__label"
                                                >
                                                    Тренировки
                                                </div>

                                                <div className="progressbar-profile__bg">
                                                    <div className="progressbar-profile__start">
                                                        0
                                                    </div>
                                                    <div className="progressbar-profile__end">
                                                        {
                                                            profileData
                                                                ?.priceSubscription
                                                                ?.maxTrains
                                                        }
                                                    </div>
                                                    <div
                                                        className="progressbar-profile__line"
                                                        style={{
                                                            width: `${
                                                                100 -
                                                                (100 /
                                                                    profileData
                                                                        ?.priceSubscription
                                                                        ?.maxTrains) *
                                                                    (profileData
                                                                        ?.priceSubscription
                                                                        ?.maxTrains -
                                                                        profileData
                                                                            ?.priceSubscription
                                                                            ?.remainingTrains)
                                                            }%`,
                                                        }}
                                                    >
                                                        <div className="progressbar-profile__current progressbar-train">
                                                            {
                                                                profileData
                                                                    ?.priceSubscription
                                                                    ?.remainingTrains
                                                            }
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
                                                        {getDate(
                                                            profileData
                                                                ?.priceSubscription
                                                                ?.startSubscription
                                                        )}
                                                    </div>
                                                    <div className="progressbar-profile__end">
                                                        {getDate(
                                                            profileData
                                                                ?.priceSubscription
                                                                ?.endSubscription
                                                        )}
                                                    </div>
                                                    <div
                                                        className="progressbar-profile__line"
                                                        style={{
                                                            width: `${
                                                                (100 /
                                                                    (profileData
                                                                        ?.priceSubscription
                                                                        ?.endSubscription -
                                                                        profileData
                                                                            ?.priceSubscription
                                                                            ?.startSubscription)) *
                                                                (new Date() -
                                                                    profileData
                                                                        ?.priceSubscription
                                                                        ?.startSubscription)
                                                            }%`,
                                                        }}
                                                    >
                                                        <div className="progressbar-profile__current progressbar-competition">
                                                            {nowDate()}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : null}
                                <div className="profile-personal__invite-pair invite-pair">
                                    <div className="invite-pair__title">
                                        Приглашения в пару
                                    </div>
                                    <div className="invite-pair__row">
                                        {requestToInvite?.map(
                                            (request, index) => (
                                                <InviteItem
                                                    func={[
                                                        (pairId, user) =>
                                                            deleteJoin(
                                                                pairId,
                                                                user
                                                            ),
                                                        (pairId, user) =>
                                                            deleteInvite(
                                                                pairId,
                                                                user
                                                            ),
                                                    ]}
                                                    request={request}
                                                    type="invite"
                                                />
                                            )
                                        )}
                                    </div>
                                </div>
                                <div className="profile-personal__invite-pair invite-pair">
                                    <div className="invite-pair__title">
                                        Заявки на вступление в пару
                                    </div>
                                    <div className="invite-pair__row">
                                        {requestToJoin?.map(
                                            (request, index) => (
                                                <InviteItem
                                                    func={[
                                                        (pairId, user) =>
                                                            deleteJoin(
                                                                pairId,
                                                                user
                                                            ),
                                                        (pairId, user) =>
                                                            deleteInvite(
                                                                pairId,
                                                                user
                                                            ),
                                                        (pairId, user) =>
                                                            acceptJoin(
                                                                pairId,
                                                                user
                                                            ),
                                                        (pairId, user) =>
                                                            acceptInvite(
                                                                pairId,
                                                                user
                                                            ),
                                                    ]}
                                                    request={request}
                                                    type="join"
                                                    flag={flagModalLabId}
                                                    setFlag={(bool) =>
                                                        setFlagModalLabId(bool)
                                                    }
                                                />
                                            )
                                        )}
                                    </div>
                                </div>
                                <div
                                    id="train"
                                    className="profile-personal__myworkouts myworkouts-profile"
                                >
                                    <div className="myworkouts-profile__title">
                                        Мои тренировки
                                    </div>
                                    {workoutTrain?.map((train, index) => (
                                        <PersonalTraining
                                            key={index}
                                            train={train}
                                            setWorkoutTrain={(workout) =>
                                                setWorkoutTrain(workout)
                                            }
                                            workoutTrain={workoutTrain}
                                        />
                                    ))}
                                </div>
                                <div
                                    id="competition"
                                    className="profile-personal__competitions competitions-profile"
                                >
                                    <div className="competitions-profile__title">
                                        Соревнования
                                    </div>
                                    {competitions?.map((competition, index) => (
                                        <Competition
                                            key={competition.id}
                                            deletePair={(pairId) =>
                                                deletePair(
                                                    pairId,
                                                    competition.id
                                                )
                                            }
                                            competition={competition}
                                            type="delete"
                                        />
                                    ))}
                                    {/* <Competition /> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PersonalPage;
