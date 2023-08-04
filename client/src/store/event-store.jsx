import {makeAutoObservable} from 'mobx'

export default class EventStore{
    flagOpenModalAddPair = false;
    flagOpenModalInstruction = false;
    flagOpenModal = false;

    constructor(){
        makeAutoObservable(this);
    }

    setFlagOpenModal(bool){
        this.flagOpenModal = bool;
    }
    setFlagOpenModalAddPair(bool){
        this.flagOpenModalAddPair = bool;
    }
    setFlagOpenModalInstruction(bool){
        this.flagOpenModalInstruction = bool;
    }
}