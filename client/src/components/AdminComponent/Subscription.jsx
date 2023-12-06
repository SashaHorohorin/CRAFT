import React, { useState } from "react";
import { useFetching } from "../../hooks/useFetching";
import DataService from "../../API/DataService";

const Subscription = ({ subscription, fetchingCancelOrder, fetchingAcceptOrder }) => {
    // const getDateYear = (date) => {
    //     let d = new Date(date);
    //     let time = `${d.getDate() < 10 ? `0${d.getDate()}` : d.getDate()}.${d.getMonth() < 9 ? `0${d.getMonth() + 1}` : d.getMonth() + 1}.${d.getFullYear()}`;
    //     return time;
    // };

    // const getTime = (date) => {
    //     let d = new Date(date);
    //     let time = `${d.getHours() < 10 ? `0${d.getHours()}`:d.getHours()}:${d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes()}`;
    //     return time;
    // };
    return (
        <div className="admin-subscription">
            <div className="admin-subscription__name">
                {subscription.firstName + " " + subscription.lastName}
            </div>

            <div className="admin-subscription__phone">
                {subscription.curPrice + ' ₽'}
            </div>
            <a href={`tel:${subscription.phone}`} className="admin-subscription__phone">
                {subscription.phone}
            </a>
            <a href={`mailto:${subscription.email}`} className="admin-subscription__email">
                {subscription.email}
            </a>
            {/* <div className="admin-subscription__timelab">
                <div className="admin-subscription__date">{getTime(subscription.orderTime)}</div>
                <div className="admin-subscription__time">{getDateYear(subscription.orderTime)}</div>
            </div> */}
            <div className="admin-subscription__btns">
                <div onClick={() => fetchingCancelOrder({username: subscription.username, priceId: subscription.priceId})} className="admin-subscription__none">Отменить</div>
                <div onClick={() => fetchingAcceptOrder({username: subscription.username, priceId: subscription.priceId})} className="admin-subscription__accept">Подтвердить</div>
            </div>
        </div>
    );
};

export default Subscription;
