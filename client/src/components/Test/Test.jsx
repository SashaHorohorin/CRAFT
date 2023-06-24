import React, { useEffect, useState } from "react";
import axios from "axios";

const Test = () => {
    const [tests, setTest] = useState([]);
    let func = () => {
        axios.get("http://localhost:9005/test/user1").then((resp) => {
            const testsss = resp.data;
            setTest(testsss);
        });
        console.log(tests);
    };
    return (
        <div>
            <div onClick={() => func()}>Кнопка</div>
            {/* {tests.map((test) => (
                <div>{test.name}</div>
            ))} */}
        </div>
    );
};

export default Test;
