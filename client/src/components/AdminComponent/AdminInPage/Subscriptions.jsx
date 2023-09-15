import React, { useEffect, useState } from "react";
import Subscription from "../Subscription";
import { useFetching } from "../../../hooks/useFetching";
import DataService from "../../../API/DataService";

const Subscriptions = () => {
    const [subscriptions, setSubscriptions] = useState([])
    // const subscriptions = [
        
    //     {
    //         firstName: "Sasha",
    //         lastName: "Horohroin",
    //         phoneNumber: "89219072089",
    //         email: "admin@gmail.com",
    //     },
    //     {
    //         firstName: "Sasha",
    //         lastName: "Horohroin",
    //         phoneNumber: "89219072089",
    //         email: "admin@gmail.com",
    //     },
    //     {
    //         firstName: "Sasha",
    //         lastName: "Horohroin",
    //         phoneNumber: "89219072089",
    //         email: "admin@gmail.com",
    //     },
    //     {
    //         firstName: "Sasha",
    //         lastName: "Horohroin",
    //         phoneNumber: "89219072089",
    //         email: "admin@gmail.com",
    //     },
    //     {
    //         firstName: "Sasha",
    //         lastName: "Horohroin",
    //         phoneNumber: "89219072089",
    //         email: "admin@gmail.com",
    //     },
    //     {
    //         firstName: "Sasha",
    //         lastName: "Horohroin",
    //         phoneNumber: "89219072089",
    //         email: "admin@gmail.com",
    //     },
    // ];
    const [fetchingAcceptOrder, isLoadingAcceptOrder, errorAcceptOrder] = useFetching(
        async (obj) => {
            const response = await DataService.postAcceptOrder(obj);
            setSubscriptions(subscriptions.filter(subscription => subscription.priceId != obj.priceId))
        }
    );
    const [fetchingCancelOrder, isLoadingCancelOrder, errorCancelOrder] = useFetching(
        async (obj) => {
            const response = await DataService.postCancelOrder(obj);
            setSubscriptions(subscriptions.filter(subscription => subscription.priceId != obj.priceId))
        }
    );
    const [fetchingAllOrders, isLoadingAllOrders, errorAllOrders] = useFetching(
        async () => {
            const response = await DataService.getAllOrders();
            setSubscriptions(response.data)
        }
    );
    
    useEffect(() => {
        fetchingAllOrders();
    }, [])
    return (
        <div className="admin__items admin-events">
            {subscriptions.map((subscription, index) => (
                <Subscription fetchingAcceptOrder={(obj) => fetchingAcceptOrder(obj)} fetchingCancelOrder={(obj) => fetchingCancelOrder(obj)} subscription={subscription}/>
            ))}
        </div>
    );
};

export default Subscriptions;
