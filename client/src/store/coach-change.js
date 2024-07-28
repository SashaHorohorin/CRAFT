import {makeAutoObservable} from 'mobx'

export default class CoachChange{
    coaches = []
    openModalCoachCreate = false;
    openModalCoachChange = false;
    coachIdChange = -1
    coachChange= {}


    constructor(){
        makeAutoObservable(this);
    }

    setCoaches(arr){
        console.log(arr)
        this.coaches = arr;
    }

    setOpenModalCoachCreate(bool){
        this.openModalCoachCreate = bool;
    }
    setOpenModalCoachChange(bool){
        this.openModalCoachChange = bool;
    }

    setCoachIdChange(id){
        this.coachIdChange = id;
    }

    setCoachChange(change){
        this.coachChange = change;
    }


}