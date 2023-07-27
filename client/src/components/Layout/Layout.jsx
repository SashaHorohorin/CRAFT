import React from "react";
import { Outlet } from "react-router";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import './Layout.scss'

const Layout = () => {
    return (
        <div className="layout">
            <Header />
            <div className="outlet">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
