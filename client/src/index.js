import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Store from './store/store';
import EventStore from './store/event-store';
import TrainingChange from './store/training-change';
import CompetitionChange from './store/competition-change';
import EventsChange from './store/event-change';

const store = new Store();
const eventStore = new EventStore()
const trainingChange = new TrainingChange()
const competitionChange = new CompetitionChange()
const eventChange = new EventsChange()

export const Context = createContext({
    store,
    eventStore,
    trainingChange,
    competitionChange,
    eventChange
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{
        store,
        eventStore,
        trainingChange,
        competitionChange,
        eventChange
    }}>
         <App />
    </Context.Provider>
);

