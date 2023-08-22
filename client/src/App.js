import "./App.css";
import {
    Routes,
    Route,
    Link,
    RouterProvider,
    Navigate,
    BrowserRouter,
} from "react-router-dom";
import HomePage from "./page/HomePage/HomePage";
import RegistrationPage from "./page/RegistrationPage/RegistrationPage";
import Layout from "./components/Layout/Layout";
import TrainingPage from "./page/TrainingPage/TrainingPage";
import { useContext, useEffect } from "react";
import { Context } from ".";
import { observer } from "mobx-react-lite";
import ActivatePage from "./page/ActivatePage/ActivatePage";
import RequierAuth from "./hoc/RequierAuth";
import EventsPage from "./page/EventsPage/EventsPage";
import CompetitionsPage from './page/CompetitionsPage/CompetitionsPage'
import PricesPage from "./page/PricesPage/PricesPage";
import PersonalPage from "./page/PersonalPage/PersonalPage";
import Applications from "./page/Applications/Applications";
import AdminPage from "./page/AdminPage/AdminPage";
import TrainingChange from "./components/AdminComponent/AdminInPage/TrainingChange";
import CompetitionChange from "./components/AdminComponent/AdminInPage/CompetitionChange";
import EventChange from "./components/AdminComponent/AdminInPage/EventChange";

function App() {
    const {store} = useContext(Context);

    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        if (token){
            store.checkAuth();
        }
        console.log(store.isAuth);

    }, [token])

    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<HomePage />} />
                        <Route path="training" element={
                            <RequierAuth>
                                <TrainingPage/>
                            </RequierAuth>
                        }/>
                        <Route path="events" element={<EventsPage />} />
                        <Route path="competitions" element={<CompetitionsPage />} />
                        <Route path="prices" element={<PricesPage/>} />
                        <Route path="profile" element={<PersonalPage/>} />
                        <Route path="competitions/applications/:id" element={<Applications/>} />
                        <Route path="admin-page" element={<AdminPage/>} >
                            <Route path="training-change" element={<TrainingChange/>} />
                            <Route path="competition-change" element={<CompetitionChange/>} />
                            <Route path="event-change" element={<EventChange/>} />
                        </Route>
                    </Route>
                    <Route path="auth/:sign" element={<RegistrationPage />} />
                    <Route path="activate-account/:code" element={<ActivatePage/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default observer(App) ;
