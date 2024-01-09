import React, { useContext, useEffect, useState } from "react";
import "./EventsPage.scss";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import Event from "../../components/EventComponent/Event/Event";
import DataService from "../../API/DataService";
import { useFetching } from "../../hooks/useFetching";
import Loader from "../../components/Loader/Loader";

const EventsPage = () => {
    const [events, setEvents] = useState([]);
    const [countPage, setCountPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    // const [flagOpenModal, setFlagOpenModal] = useState(false);
    const { eventStore } = useContext(Context);

    const [loaderPage, setLoaderPage] = useState(true);

    const [fetchingEvents, isLoadingEvents, errorEvents] = useFetching(
        async (pageNum) => {
            // console.log('saskfhjahfshahfjshfkjshkj');
            const response = await DataService.getEvents(pageNum);
            // console.log(response.data);

            setEvents((current) => {
                console.log(current);
                return [...current, ...response.data.news];
            });
            console.log(response.data);
            setTotalPages(response.data.totalPages);
            setLoaderPage(false);
            // console.log('saskfhjahfshahfjshfkjshkj');
            // let complex = [...response.data];
        }
    );

    useEffect(() => {
        fetchingEvents(countPage);

        console.log(events);
    }, [countPage]);

    let nextPage = () => {
        setCountPage(countPage + 1);
    };
    const setLoader = () => {
        console.log("Img start");
        setLoaderPage(false);
    };

    return (
        <>
            {loaderPage ? <Loader /> : null}
            <div className="events">
                <div className="container">
                    <div className="events__title">Мероприятия</div>
                    <div className="events__row">
                        {events.map((event, index) => (
                            <Event
                                setLoader={() => setLoader()}
                                key={index}
                                event={event}
                            />
                        ))}
                    </div>
                    <div className="container-btn">
                        {totalPages - 1 > countPage ? (
                            <div
                                onClick={() => nextPage()}
                                className="events__button"
                            >
                                Показать больше
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </>
    );
};

export default observer(EventsPage);
