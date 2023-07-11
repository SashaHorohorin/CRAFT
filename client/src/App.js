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

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<HomePage />} />
                        <Route path="training" element={<TrainingPage/>}/>
                    </Route>
                    <Route path="auth/:sign" element={<RegistrationPage />} />
                </Routes>
                {/* <HomePage/> */}
                {/* <RegistrationPage /> */}
            </div>
        </BrowserRouter>
    );
}

export default App;
