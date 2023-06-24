import React, { useEffect, useState } from "react";
import axios from "axios";

const Test = () => {
    const [tests, setTest] = useState([]);
    useEffect(() => {
        axios.get("192.168.110.62:9005/test/fill-db").then((resp) => {
            const testsss = resp.data;
            console.log(testsss);
            setTest(testsss);
        });
        // console.log(tests);
    }, []);
    return (
        <div>
            {tests.map((test) => (
                <div>{test.name}</div>
            ))}
        </div>
    );
};

export default Test;
