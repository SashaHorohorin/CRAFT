import {makeAutoObservable} from 'mobx'

export default class CompetitionChange{
    competitions = []
    openModalCompetitionCreate = false;
    openModalCompetitionChange = false;
    competitionIdChange = -1
    competitionChange = {}


    constructor(){
        makeAutoObservable(this);
    }

    setCompetitions(arr){
        this.competitions = arr;
    }

    setOpenModalCompetitionCreate(bool){
        this.openModalCompetitionCreate = bool;
    }
    setOpenModalCompetitionChange(bool){
        this.openModalCompetitionChange = bool;
    }

    setCompetitionIdChange(id){
        this.competitionIdChange = id;
    }

    setCompetitionChange(change){
        this.competitionChange = change;
    }


}