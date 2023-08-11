import React from "react";
import InputSelect from "./InputSelect";
import InputText from "./InputText";

const ModalTrain = ({handleFunctionDate, trainChange, trainers,  maxParticipant, handleFunction, type, funcBtn, flag, setFlag}) => {
    const sportComplex = ["DINAMIT", "ALEKSEEVA", "IMPULS"];
    const typeTrain = [
        "Игровая с тренером",
        "Тренировка для начинающих и продолжающих",
        "Игровая",
    ];
    const closeModal = (e) => {
        if (!e.target.closest(".modal-create-training")) {
            setFlag(false);
        }
    };
    const handleSubmit = (event) => {
        // alert('Отправленное имя: ' + this.state.value);
        event.preventDefault();
    };
    return (
        <div
            onClick={(e) => closeModal(e)}
            className={
                flag
                    ? "modal-create-training__bg active"
                    : "modal-create-training__bg"
            }
        >
            <div className="modal-create-training">
                <div className="modal-create-training__title">
                    Редактирование тренировки
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="modal-create-training__form"
                    action=""
                >
                    <label htmlFor="type">
                        Тип:
                        <InputSelect
                            name="type"
                            id="type"
                            handleFunction={(e) => handleFunction(e)}
                            optionValue={typeTrain}
                        />
                    </label>
                    <label htmlFor="sportCompex">
                        Тип:
                        <InputSelect
                            name="sportCompex"
                            id="sportCompex"
                            handleFunction={(e) => handleFunction(e)}
                            optionValue={sportComplex}
                        />
                    </label>
                    <label htmlFor="people-max">
                        Макс. кол-во чел.:
                        <InputText
                            handleFunction={(e) => handleFunction(e)}
                            value={maxParticipant}
                            name="maxParticipant"
                            type="number"
                            id="people-max"
                        />
                    </label>
                    <label htmlFor="trainer">
                        Тренер:
                        <InputSelect
                            name="trainersId"
                            id="trainer"
                            handleFunction={(e) => handleFunction(e)}
                            optionValue={trainers}
                        />
                    </label>
                    <label htmlFor="date">
                        Дата проведения:
                        <InputText
                            handleFunction={(e) => handleFunctionDate(e)}
                            name="date"
                            type="date"
                            id="date"
                        />
                    </label>
                    <label htmlFor="time">
                        Время проведения:
                        <InputText
                            handleFunction={(e) => handleFunctionDate(e)}
                            name="toTime"
                            type="time"
                            id="time"
                        />
                        -
                        <InputText
                            handleFunction={(e) => handleFunctionDate(e)}
                            name="fromTime"
                            type="time"
                            id="time"
                        />
                    </label>
                </form>
                <div className="modal-create-training__btns btns-create">
                    <div
                        onClick={() => funcBtn()}
                        className="btns-create__save"
                    >
                        {type == 'create' ? 'Создать' : 'Сохранить'}
                    </div>
                    <div onClick={() => setFlag(false)} className="btns-create__cancel">Отменить</div>
                </div>
            </div>
        </div>
    );
};

export default ModalTrain;
