import {makeAutoObservable} from 'mobx'

export default class EventStore{
    flagOpenModal = false;

    constructor(){
        makeAutoObservable(this);
    }

    setFlagOpenModal(bool){
        this.flagOpenModal = bool;
    }
}