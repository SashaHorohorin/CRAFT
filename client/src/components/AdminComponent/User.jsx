import React, { useState } from "react";
import { useFetching } from "../../hooks/useFetching";
import DataService from "../../API/DataService";

const User = ({ user }) => {
    const [userInfo, setUserInfo] = useState({})
    const [flagInfo, setFlagInfo] = useState(false)
    const [fetchingUser, isLoadingUser, errorUser] =
        useFetching(async (username) => {
            const response = await DataService.getAdminUser(username);
            console.log(response.data);
            setUserInfo(response.data)
            // setUsers(response.data)
            
        });
    const moreInfo = (username) => {
        setFlagInfo(!flagInfo)
        fetchingUser(username)
    }
    return (
        <>
            <div className="users-admin__user admin-user">
                <div className="admin-user__name">
                    {user.firstName + " " + user.lastName}
                </div>
                {!user.haveFirstTrain ? (<div className="admin-user__name">
                    Есть пробная тренировка
                </div>) : null}
                
                <div
                    onClick={() => moreInfo(user.username)}
                    className="admin-user__info"
                >
                    {flagInfo ? "Скрыть" : "Подробнее"}
                </div>
            </div>
            <div className={flagInfo ? "users-admin__info active" : "users-admin__info"}>
                <div className="users-admin__text"><span>Username: </span>{userInfo.username}</div>
                <div className="users-admin__text"><span>Email: </span>{userInfo.email}</div>
                <div className="users-admin__text"><span>Phone: </span>{userInfo.phoneNumber}</div>
                <div className="users-admin__text"><span>LabID: </span>{userInfo.labId}</div>
            </div>
        </>
    );
};

export default User;
