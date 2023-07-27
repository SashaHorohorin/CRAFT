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
import Layout from "./components/Layout";
import TrainingPage from "./page/TrainingPage/TrainingPage";
import { useContext, useEffect } from "react";
import { Context } from ".";
import { observer } from "mobx-react-lite";
import ActivatePage from "./page/ActivatePage/ActivatePage";
import RequierAuth from "./hoc/RequierAuth";
import EventsPage from "./page/EventsPage/EventsPage";

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
                    </Route>
                    <Route path="auth/:sign" element={<RegistrationPage />} />
                    <Route path="activate-account/:code" element={<ActivatePage/>}/>
                </Routes>
                {/* <HomePage/> */}
                {/* <RegistrationPage /> */}
            </div>
        </BrowserRouter>
    );
}

export default observer(App) ;
