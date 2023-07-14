import React, { useContext, useState } from "react";
import InputReg from "../InputReg/InputReg";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import { useFetching } from "../../hooks/useFetching";
import DataService from "../../API/DataService";
import { useNavigate } from "react-router";

const FormLogin = ({fromPage}) => {
    const {store} = useContext(Context)
    const navigate = useNavigate()

    const [flagLog, setFlagLog] = useState(false)
    const [flagExeptionLog, setflagExeptionLog] = useState(false);
    const [objLog, setObjLog] = useState({
        email: "",
        password: "",
    });
    const [logFlagReset, setLogFlagReset] = useState(false);

    const [fetchingLogin, isLoadingLog, errorLog] = useFetching(async (obj) => {
        const response = await DataService.postLogin(obj);
        console.log(response.data.accessToken);
    });
    // валидация email
    function validate(email) {
        let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (reg.test(email) == false) {
            //    alert('Введите корректный e-mail');
            return false;
        }
    }

    const postLogin = async (obj) => {
        if (validate(obj.email) == false) {
            setflagExeptionLog(true);
            return;
        }
        setflagExeptionLog(false);
        if (obj.password == "") {
            return;
        }

        // fetchingLogin(obj);
        await store.login(obj);

        setObjLog({
            email: "",
            password: "",
        });
        setLogFlagReset(!logFlagReset);
        // setTimeout(()=>{
            if(store.isAuth === true){
                console.log('-----------IsAuth');
                navigate(fromPage, {replace: true});
            }
        // },100)
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };

   
    return (
        <div className="forms-registration__login login-form">
            <div className="login-form__title">Войти</div>
            <form onSubmit={handleSubmit} className="login-form__form form">
                <div className="form__fieldset">
                    <InputReg
                        type="text"
                        name="email"
                        valueInp={logFlagReset}
                        obj={objLog}
                        setData={(newObj) => setObjLog(newObj)}
                        classField={flagExeptionLog ? "login-email" : ""}
                        className="form__input email"
                        required
                        nameLabel="Email"
                    />
                    {flagExeptionLog ? (
                        <span className="exeption-email">
                            Введена неверная почта
                        </span>
                    ) : null}
                    {/* <span className="exeption-email">{}</span> */}
                    <InputReg
                        type="password"
                        name="password"
                        valueInp={logFlagReset}
                        obj={objLog}
                        setData={(newObj) => setObjLog(newObj)}
                        className="form__input"
                        required
                        nameLabel="Пароль"
                    />
                </div>
                <div className="form__buttons">
                    <button type="button" className="form__buttons-forgot">
                        Забыли пароль?
                    </button>
                    <input
                        onClick={() => postLogin(objLog)}
                        type="submit"
                        value="Войти"
                        className="form__button"
                    />
                </div>
            </form>
        </div>
    );
};

export default FormLogin;
