import React, { useEffect, useState } from "react";
import "./PricesPage.scss";
import DataService from "../../API/DataService";
import { useFetching } from "../../hooks/useFetching";
import Loader from "../../components/Loader/Loader";
import { useNavigate } from "react-router";

const PricesPage = () => {
    const sporthalls = ["СК Динамит", "Арена 300", "СК Алексеева"];
    const color = ["E5FFE7", "E5FFFC", "E5EFFF"];
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [price, setPrice] = useState([]);
    const [flagInfo, setFlagInfo] = useState(false);
    const navigate = useNavigate();

    const [fetchingPrice, isLoadingPrice, errorPrice] = useFetching(
        async (sportcomplex) => {
            // console.log('saskfhjahfshahfjshfkjshkj');
            const response = await DataService.getPrice(sportcomplex);
            console.log(response.data);
            setPrice((current) => {
                return [...current, [...response.data]];
            });
            console.log(price);
            // let complex = [...response.data];
        }
    );
    const [fetchingAddOrder, isLoadingAddOrder, errorAddOrder] = useFetching(
        async (obj) => {
            // console.log('saskfhjahfshahfjshfkjshkj');
            const response = await DataService.postAddOrder(obj);
            // console.log(response.data);
            // let complex = [...response.data];
        }
    );

    const fetchCost = async () => {
        await fetchingPrice("DINAMIT");
        await fetchingPrice("ARENA300");
        await fetchingPrice("ALEKSEEVA");
    };

    useEffect(() => {
        fetchCost();
    }, []);

    const activate = (index) => {
        setActiveTabIndex(index);
    };

    const addOrder = (id) => {
        setFlagInfo(true);
        fetchingAddOrder({
            username: localStorage.getItem("username"),
            priceId: id,
        });
    };

    return (
        <>
            {isLoadingPrice ? (
                <Loader />
            ) : (
                <div className="prices">
                    <div
                        onClick={() => setFlagInfo(false)}
                        className={
                            flagInfo
                                ? "trainingPage__bg active"
                                : "trainingPage__bg"
                        }
                    >
                        <div className="trainingPage__modal modal-more-info">
                            Ваша заявка была отправлена
                            <br />
                            <br />
                            После оплаты абонемента и подтверждения вашей
                            оплаты, он появится у вас в личном кабинете.
                            <br />
                            <br />
                            Оплата происходит переводом на тинькофф по номеру:{" "}
                            <a href="tel:+79030975817">+7(903) 097 58 17</a>
                        </div>
                    </div>
                    <div className="container">
                        <div className="prices__title">Цены</div>
                        <div className="prices__sporthalls prices-tabs">
                            <ul className="prices-tabs__labels">
                                {sporthalls.map((tab, index) => (
                                    <li
                                        // key={tab.id}
                                        className={
                                            index === activeTabIndex
                                                ? "prices-tabs__tab active"
                                                : "prices-tabs__tab"
                                        }
                                        onClick={() => activate(index)}
                                    >
                                        {tab}
                                    </li>
                                ))}
                            </ul>
                            <div className="prices-tabs__content">
                                {price[activeTabIndex]?.map((cost, index) => {
                                    if (cost.title === 1) {
                                        if(cost.sportComplex === "ALEKSEEVA" || cost.sportComplex === "ARENA300"){
                                            return (
                                                <div className="prices-tabs__card card-price">
                                                <div className="card-price__info-price">
                                                    <div className="card-price__title">
                                                        {cost.title} тренировка
                                                    </div>
                                                    <div className="card-price__now-price">
                                                        <span>
                                                            1100 - 1300 ₽
                                                        </span>
                                                    </div>
                                                </div>
                                                <div
                                                    style={{
                                                        background: `#${color[activeTabIndex]}`,
                                                    }}
                                                    className="card-price__info info-card"
                                                >
                                                    <ul className="info-card__list">
                                                        <li className="info-card__label">
                                                            работа тренера
                                                        </li>
                                                        <li className="info-card__label">
                                                            аренда корта
                                                        </li>
                                                        <li className="info-card__label">
                                                            перьевые воланы
                                                        </li>
                                                    </ul>
                                                    <button
                                                        onClick={() =>
                                                            navigate('/training')
                                                        }
                                                        className="info-card__btn"
                                                    >
                                                        Записаться
                                                    </button>
                                                </div>
                                            </div>
                                            )
                                        } else {
                                            return (
                                                <div className="prices-tabs__card card-price">
                                                    <div className="card-price__info-price">
                                                        <div className="card-price__title">
                                                            {cost.title} тренировка
                                                        </div>
                                                        <div className="card-price__now-price">
                                                            <span>
                                                                {cost.nowPrice} ₽
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div
                                                        style={{
                                                            background: `#${color[activeTabIndex]}`,
                                                        }}
                                                        className="card-price__info info-card"
                                                    >
                                                        <ul className="info-card__list">
                                                            <li className="info-card__label">
                                                                работа тренера
                                                            </li>
                                                            <li className="info-card__label">
                                                                аренда корта
                                                            </li>
                                                            <li className="info-card__label">
                                                                перьевые воланы
                                                            </li>
                                                        </ul>
                                                        <button
                                                            onClick={() =>
                                                                navigate('/training')
                                                            }
                                                            className="info-card__btn"
                                                        >
                                                            Записаться
                                                        </button>
                                                    </div>
                                                </div>
                                            );
                                        }
                                        
                                    } else {
                                        if (!(cost.type === "CHILDREN")) {
                                            return (
                                                <div className="prices-tabs__card card-price">
                                                    <div className="card-price__info-price">
                                                        <div className="card-price__title">
                                                            {cost.title}{" "}
                                                            тренировок
                                                        </div>
                                                        <div className="card-price__old-price">
                                                            {cost.oldPrice} ₽
                                                        </div>
                                                        <div className="card-price__now-price">
                                                            <span>
                                                                {cost.nowPrice}{" "}
                                                                ₽
                                                            </span>
                                                            <div className="card-price__label">
                                                                /{" "}
                                                                {
                                                                    cost.textUnderPrice
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="card-price__sale">
                                                            -{cost.discount}%
                                                        </div>
                                                    </div>

                                                    <div
                                                        style={{
                                                            background: `#${color[activeTabIndex]}`,
                                                        }}
                                                        className="card-price__info info-card"
                                                    >
                                                        <ul className="info-card__list">
                                                            <li className="info-card__label">
                                                                работа тренера
                                                            </li>
                                                            <li className="info-card__label">
                                                                аренда корта
                                                            </li>
                                                            <li className="info-card__label">
                                                                перьевые воланы
                                                            </li>
                                                        </ul>
                                                        <button
                                                            onClick={() =>
                                                                addOrder(
                                                                    cost.id
                                                                )
                                                            }
                                                            className="info-card__btn"
                                                        >
                                                            Купить
                                                        </button>
                                                    </div>
                                                </div>
                                            );
                                        }
                                    }
                                })}
                            </div>
                            {price[activeTabIndex]?.filter(
                                (price) => price.type == "CHILDREN"
                            ).length !== 0 ? (
                                <div className="children-prices__title">
                                    Детские абонементы
                                </div>
                            ) : null}

                            <div className="prices-tabs__children children-prices">
                                {price[activeTabIndex]?.map((cost, index) => {
                                    if (cost.type === "CHILDREN") {
                                        return (
                                            <div className="prices-tabs__card card-price">
                                                <div className="card-price__info-price">
                                                    <div className="card-price__title">
                                                        {cost.title} тренировок
                                                    </div>
                                                    <div className="card-price__old-price">
                                                        {cost.oldPrice} ₽
                                                    </div>
                                                    <div className="card-price__now-price">
                                                        <span>
                                                            {cost.nowPrice} ₽
                                                        </span>
                                                        <div className="card-price__label">
                                                            /{" "}
                                                            {
                                                                cost.textUnderPrice
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="card-price__sale">
                                                        -{cost.discount}%
                                                    </div>
                                                </div>

                                                <div
                                                    style={{
                                                        background: `#${color[activeTabIndex]}`,
                                                    }}
                                                    className="card-price__info info-card"
                                                >
                                                    <ul className="info-card__list">
                                                        <li className="info-card__label">
                                                            работа тренера
                                                        </li>
                                                        <li className="info-card__label">
                                                            аренда корта
                                                        </li>
                                                        <li className="info-card__label">
                                                            перьевые воланы
                                                        </li>
                                                    </ul>
                                                    <button
                                                        onClick={() =>
                                                            addOrder(cost.id)
                                                        }
                                                        className="info-card__btn"
                                                    >
                                                        Купить
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    }
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PricesPage;
