import React, { useContext, useEffect } from "react";
import { Navigate, useParams } from "react-router";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import axios from "axios";
import './ActivatePage.scss'

const ActivatePage = () => {
    const { code } = useParams();
    const {store} = useContext(Context)
    const activate = async () => {
        console.log(code);
        const response = axios.get(`http://localhost:9005/api/v1/auth/activate/${code}`);
        console.log(response.data);
        store.setActivate(response.data);

    }
    

    useEffect(() =>{
        activate();
    }, [])



    return (
        <div className="container">
            <Navigate to="auth/login"/>
        </div>
    );
};

export default observer(ActivatePage);
