import React, { useEffect, useState } from "react";
import "./PricesPage.scss";
import DataService from "../../API/DataService";
import { useFetching } from "../../hooks/useFetching";

const PricesPage = () => {
    const sporthalls = ["Динамит", "Алексеево", "Импульс"];
    const color = ["E5FFE7", "E5FFFC", "E5EFFF"];
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [price, setPrice] = useState([]);

    const [fetchingPrice, isLoadingPrice, errorPrice] = useFetching(
        async (sportcomplex) => {
            // console.log('saskfhjahfshahfjshfkjshkj');
            const response = await DataService.getPrice(sportcomplex);
            // console.log(response.data);
            setPrice((current) => {
                return [...current, [...response.data]];
            });
            console.log(price);
            // let complex = [...response.data];
        }
    );
    useEffect(() => {
        fetchingPrice("DINAMIT");
        fetchingPrice("ALEKSEEVA");
        fetchingPrice("IMPULS");
    }, []);

    const activate = (index) => {
        setActiveTabIndex(index);
    };

    return (
        <div className="prices">
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
                        {price[activeTabIndex]?.map((cost, index) => (
                            <div className="prices-tabs__card card-price">
                                <div className="card-price__info-price">
                                    <div className="card-price__title">
                                        {cost.title}
                                    </div>
                                    <div className="card-price__old-price">
                                        {cost.oldPrice} ₽
                                    </div>
                                    <div className="card-price__now-price">
                                        {cost.nowPrice} ₽
                                    </div>
                                    <div className="card-price__sale">-{cost.discount}%</div>
                                    <div className="card-price__label">
                                        / {cost.textUnderPrice}
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
                                    <button className="info-card__btn">
                                        Купить
                                    </button>
                                </div>
                            </div>
                        ))}
                        {/* <div className="prices-tabs__card card-price">
                            <div className="card-price__info-price">
                                <div className="card-price__title">
                                    4 тренировки
                                </div>
                                <div className="card-price__old-price">
                                    4800 ₽
                                </div>
                                <div className="card-price__now-price">
                                    3700 ₽
                                </div>
                                <div className="card-price__sale">-22%</div>
                                <div className="card-price__label">/ месяц</div>
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
                                <button className="info-card__btn">
                                    Купить
                                </button>
                            </div>
                        </div>
                        <div className="prices-tabs__card card-price">
                            <div className="card-price__info-price">
                                <div className="card-price__title">
                                    4 тренировки
                                </div>
                                <div className="card-price__old-price">
                                    4800 ₽
                                </div>
                                <div className="card-price__now-price">
                                    3700 ₽
                                </div>
                                <div className="card-price__sale">-22%</div>
                                <div className="card-price__label">/ месяц</div>
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
                                <button className="info-card__btn">
                                    Купить
                                </button>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PricesPage;
