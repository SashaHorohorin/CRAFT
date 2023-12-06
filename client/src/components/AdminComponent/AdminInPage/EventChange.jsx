import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../..";
import Event from "../Event";
import DataService from "../../../API/DataService";
import { useFetching } from "../../../hooks/useFetching";
import { observer } from "mobx-react-lite";

const EventChange = () => {
    const { eventChange } = useContext(Context);
    // const [count, setCount] = useState(0);
    // const [event, setEvent] = useState([])

    // const [fetchingEvent, isLoadingEvent, errorEvent] = useFetching(
    //     async (count) => {
    //         const response = await DataService.getEventsAll(count);
    //         console.log(response.data);
    //         console.log(event);
    //         setEvent([
    //             ...event,
    //             ...response.data.news,
    //         ]);
    //         // setEvents([...eventChange.events, ...response.data.news])
    //         eventChange.setTotalCountPage(response.data.totalPages);
    //         eventChange.setEvents(event)
    //     }
    // );
    // useEffect(() => {
    //     fetchingEvent(count);
    //     // console.log((eventChange.countPage === count) + ' ' + '----------------');
    //     // setCount(eventChange.countPage)
    // }, [count]);
    
    // useEffect(() => {
    //     fetchingEvent(count);
    // }, []);

    const [fetchingDeleteEvent, isLoadingDeleteEvent, errorDeleteEvent] =
        useFetching(async (eventId) => {
            const response = await DataService.postDeleteEvent(eventId);
            console.log(response.data);
            eventChange.setEvents(
                eventChange.events.filter((event) => eventId !== event.id)
            );
        });

    const openModalChange = (eventId, event) => {
        console.log(event);
        eventChange.setEventChange(event);
        eventChange.setOpenModalEventChange(true);
        console.log(eventChange.openModalEventChange);
        console.log(eventId);
        if (eventId) {
            eventChange.setEventIdChange(eventId);
        }
        // console.log(trainingChange.trainIdChange);
    };

    return (
        <div className="admin__main">
            <div
                onClick={() => eventChange.setOpenModalEventCreate(true)}
                className="admin__create-btn btn-event"
            >
                Создать
            </div>
            <div className="admin__items admin-events">
                {eventChange.events.map((event, index) => (
                    <Event
                        deleteEvent={() => fetchingDeleteEvent(event.id)}
                        changeModalOpen={() => openModalChange(event.id, event)}
                        key={event.id}
                        event={event}
                    />
                ))}
            </div>
            {eventChange.countPage < eventChange.totalCountPage - 1 ? (
                <div
                    onClick={() => {
                        eventChange.setCountPage()
                        // setCount(count + 1);
                    }}
                    className="admin__create-btn"
                >
                    Показать ещё
                </div>
            ) : null}
        </div>
    );
};

export default observer(EventChange);
