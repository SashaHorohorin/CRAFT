import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Store from './store/store';
import EventStore from './store/event-store';
import TrainingChange from './store/training-change';
import CompetitionChange from './store/competition-change';
import EventsChange from './store/event-change';
import CoachChange from "./store/coach-change";

const store = new Store();
const eventStore = new EventStore()
const trainingChange = new TrainingChange()
const competitionChange = new CompetitionChange()
const eventChange = new EventsChange()
const coachChange = new CoachChange()

export const Context = createContext({
    store,
    eventStore,
    trainingChange,
    competitionChange,
    eventChange,
    coachChange
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{
        store,
        eventStore,
        trainingChange,
        competitionChange,
        eventChange,
        coachChange
    }}>
         <App />
    </Context.Provider>
);

