import React, { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import axios from "axios";

const ActivatePage = () => {
    const { code } = useParams();
    const {store} = useContext(Context)
    useEffect(() =>{
        console.log(code);
        const response = axios.get(`http://localhost:9005/api/v1/auth/activate/${code}`);
        console.log(response.data);
        // store.isActivate(response.data)
    }, [])

    return <h1>Ваш аккаунт активирован</h1>;
};

export default observer(ActivatePage);
