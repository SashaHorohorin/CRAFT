import React, { useEffect } from 'react'

const Workouts = ({workouts, date}) => {
    const workLog = () => {
        console.log(workouts[0]?.type);
    }
  return (
    <div className='workouts'>
        <div onClick={() => workLog()} className="workouts__date date-workouts">
            <div className="date-workouts__week">ПН</div>
            <div className="date-workouts__day">{`${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}.${date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth()}`}</div>
        </div>
        <div className="workouts__items items-workouts">
            {
                workouts.map((workout, index) => (
                    <div>{workout?.id}</div>
                ))
            }
            {/* <div className="workouts__item item-workouts">
                <div className="item-workouts__row">
                    <div className="item-workouts__column">
                        <div className="item-workouts__name">Тренировка для начинающих и продолжающих</div>
                        <div className="item-workouts__btn btn-workout">подробнее</div>
                        
                    </div>
                    <div className="item-workouts__column"></div>
                    <div className="item-workouts__column"></div>
                    
                </div>
                
            </div> */}
        </div>
        
    </div>
  )
}

export default Workouts