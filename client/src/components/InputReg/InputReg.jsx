import React, { useEffect, useState } from "react";
import { IMaskInput } from "react-imask";

const PhoneMask = "+{7}(000)000-00-00";
const EmailMask = /^\S*@?\S*$/;

const InputReg = ({
    classField,
    nameLabel,
    setData,
    valueInp,
    obj,
    flagFill,
    ...arg
}) => {
    // let valueData = ''
    const [value, setValue] = useState('');
    const [valueEdit, setValueEdit] = useState('');
    let flag = false;
    if (arg.name === "agreementMailing") {
        flag = true;
    }
    // console.log(valueInp);
    const [checked, setChecked] = useState(flag);

    useEffect(() => {
        setValueEdit(obj[arg.name])
    }, [obj])

    useEffect(() => {
        if (arg.name === "agreementMailing") {
            setChecked(true);
        } else {
            setChecked(false);
        }
        setValue("");
    }, [valueInp]);

    // valueData = value;

    const handleFunction = (e) => {
        const name = e.target.name;
        console.log(e.target.checked);

        // let newObj = { ...obj };
        if (arg.type == "checkbox") {
            setChecked(!checked);
            let newObj = {
                ...obj,
                [name]: e.target.checked,
            };
            setData(newObj);
        } else {
            setValue(e.target.value);
            let newObj = {
                ...obj,
                [name]: e.target.value,
            };
            setData(newObj);
        }
    };

    return (
        <div
            className={classField ? `form__field ${classField}` : "form__field"}
        >
            {flagFill ? (
                arg.name == "phoneNumber" ? (
                    <IMaskInput
                        {...arg}
                        value={valueEdit}
                        onChange={(e) => handleFunction(e)}
                        mask={PhoneMask}
                        // onAccept={(value, mask) => console.log(value, mask)}
                    />
                ) : arg.name == "email" ? (
                    <IMaskInput
                        {...arg}
                        value={valueEdit}
                        onChange={(e) => handleFunction(e)}
                        mask={EmailMask}
                        // onAccept={(value, mask) => console.log(value, mask)}
                    />
                ) : (
                    <IMaskInput
                        {...arg}
                        value={valueEdit}
                        onChange={(e) => handleFunction(e)}
                        mask={/^[a-zа-я]+$/i}
                        // onAccept={(value, mask) => console.log(value, mask)}
                    />
                )
            ) : arg.name == "phoneNumber" ? (
                <IMaskInput
                    {...arg}
                    value={value}
                    onChange={(e) => handleFunction(e)}
                    mask={PhoneMask}
                    // onAccept={(value, mask) => console.log(value, mask)}
                />
            ) : arg.name == "email" ? (
                <IMaskInput
                    {...arg}
                    value={value}
                    onChange={(e) => handleFunction(e)}
                    mask={EmailMask}
                    // onAccept={(value, mask) => console.log(value, mask)}
                />
            ) : arg.type == "password" ? (
                <IMaskInput
                    {...arg}
                    value={value}
                    onChange={(e) => handleFunction(e)}
                    // mask={/^[a-z0-9]+$/i}
                    // onAccept={(value, mask) => console.log(value, mask)}
                />
            ) : arg.type == "checkbox" ? (
                <input
                    {...arg}
                    onChange={(e) => handleFunction(e)}
                    checked={checked}
                />
            ) : arg.name == "code" ? (
                <IMaskInput
                    {...arg}
                    value={value}
                    onChange={(e) => handleFunction(e)}
                    maxlength="6"
                    mask={/^[0-9]+$/i}
                    // onAccept={(value, mask) => console.log(value, mask)}
                />
            ) : (
                <IMaskInput
                    {...arg}
                    value={value}
                    onChange={(e) => handleFunction(e)}
                    mask={/^[a-zа-я]+$/i}
                    // onAccept={(value, mask) => console.log(value, mask)}
                />
            )}
            {flagFill ? (
                <label onClick={() => test()} className="form__label">
                    {nameLabel.split("").map((latter, index) => (
                        <span
                            key={index}
                            style={{ transitionDelay: `${index * 50}ms` }}
                        >
                            {latter}
                        </span>
                    ))}
                </label>
            ) : arg.type != "checkbox" ? (
                <label onClick={() => test()} className="form__label">
                    {nameLabel.split("").map((latter, index) => (
                        <span
                            key={index}
                            style={{ transitionDelay: `${index * 50}ms` }}
                        >
                            {latter}
                        </span>
                    ))}
                </label>
            ) : (
                <label htmlFor={arg.id}>{nameLabel}</label>
            )}
        </div>
    );
};

export default InputReg;
