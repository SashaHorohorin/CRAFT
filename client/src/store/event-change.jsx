import {makeAutoObservable} from 'mobx'

export default class EventsChange{
    events = []
    openModalEventCreate = false;
    openModalEventChange = false;
    eventIdChange = -1
    eventChange = {}
    countPage = 0;


    constructor(){
        makeAutoObservable(this);
    }

    setEvents(arr){
        this.events = arr;
    }

    setOpenModalEventCreate(bool){
        this.openModalEventCreate = bool;
    }
    setOpenModalEventChange(bool){
        this.openModalCEventChange = bool;
    }

    setEventIdChange(id){
        this.eventIdChange = id;
    }

    setEventChange(change){
        this.eventChange = change;
    }

    setCountPage(){
        this.countPage = this.countPage + 1;
    }


}