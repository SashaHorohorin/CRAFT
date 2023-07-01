import React from "react";
import './FollowingBtn.scss'

const FollowingBtn = () => {
    return (
        <div className="following-btn">
            <div className="following-btn__btn">Записаться!</div>
            <div className="following-btn__img">
                <img src="./images/HomePage/following-btn.svg" alt="" />
            </div>
        </div>
    );
};

export default FollowingBtn;
