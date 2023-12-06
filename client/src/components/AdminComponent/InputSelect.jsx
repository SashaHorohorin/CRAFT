import React from "react";

const InputSelect = ({handleFunction, optionValue, ...arg}) => {
    return (
        <select {...arg} onChange={(e) => handleFunction(e)}>
            {
                arg.id == 'trainer' ? (
                    optionValue.map((val, index) => (
                        index == 0 ? (
                            <option selected key={index} value={val.id}>{val.name}</option>
                        ) : (
                            <option key={index} value={val.id}>{val.name}</option>
                        )
                        
                    ))
                ) : (
                    optionValue.map((val, index) => (
                        index == 0 ? (
                            <option selected key={index} value={val}>{val}</option>
                        ) : (
                            <option key={index} value={val}>{val}</option>
                        )

                    ))
                )
            }
        </select>
    );
};

export default InputSelect;
