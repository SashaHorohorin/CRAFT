import {makeAutoObservable} from 'mobx'

export default class TrainingChange{
    training = []
    openModalTrainingCreate = false;
    openModalTrainingChange = false;
    trainIdChange = -1
    trainChange = {}


    constructor(){
        makeAutoObservable(this);
    }

    setTraining(arrTrain){
        this.training = arrTrain;
    }

    setOpenModalTrainingCreate(bool){
        this.openModalTrainingCreate = bool;
    }
    setOpenModalTrainingChange(bool){
        this.openModalTrainingChange = bool;
    }

    setTrainIdChange(id){
        this.trainIdChange = id;
    }

    setTrainChange(changeTrain){
        this.trainChange = changeTrain;
    }


}