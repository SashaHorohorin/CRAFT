import React from "react";
import { Outlet } from "react-router";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";

const Layout = () => {
    return (
        <>
            <Header/>
            <Outlet />
            <Footer/>
        </>
        
    );
};

export default Layout;
