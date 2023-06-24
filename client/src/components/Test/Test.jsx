import React, { useEffect, useState } from "react";
import axios from "axios";
import { async } from "q";

const Test = () => {
    const [tests, setTest] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:9005/test/user1").then((resp) => {
            const testsss = resp.data;
            console.log(resp)
            setTest(testsss);
        }).catch(e =>{
            console.log(e)
        });
    },[]);
    return (
        <div>
            <div>{tests.id}</div>
            <div>{tests.name}</div> 
            <div>{tests.email}</div>
        </div>
    );
};

export default Test;
