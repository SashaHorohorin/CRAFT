import React from "react";
import "./HomePage.scss";
import Header from "../../components/Header/Header";
import Button from "../../components/UI/Button/Button";
import Shuttlecocks from "../../components/UI/Shuttlecocks/Shuttlecocks";
import FollowingBtn from "../../components/FollowingBtn/FollowingBtn";
import MainPart from "../../components/MainPart/MainPart";

const HomePage = () => {
    // если страница зажружена запускаем воланчик

    return (
        <div className="home">
            <FollowingBtn/>
            <MainPart/>
        </div>
    );
};

export default HomePage;
