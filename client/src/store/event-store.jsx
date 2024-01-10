import { makeAutoObservable } from "mobx";

export default class EventStore {
    flagOpenModalAddPair = false;
    flagOpenModalRequestAddPair= false;
    flagOpenModalInstruction = false;
    flagOpenModal = false;
    players = [];
    indexMap = 1

    maxCountImg = 11
    currentCountImg = 0
    // flagLoadAllImg = false;


    errorCompetition = ''
    flagErrorCompetition = false
    errorTraining = ''
    flagErrorTraining = false

    flagOpenModalSale = false;


    competition = {}

    constructor() {
        makeAutoObservable(this);
    }

    setCurrentCountImg(){
        this.currentCountImg = this.currentCountImg + 1;
    }
    setIndexMap(index){
        this.indexMap = index;
    }

    setErrorTraining(error){
        this.errorTraining = error;
    }
    setFlagErrorTraining(bool){
        this.flagErrorTraining = bool;
    }
    setErrorCompetition(error){
        this.errorCompetition = error;
    }
    setFlagErrorCompetition(bool){
        this.flagErrorCompetition = bool;
    }

    setFlagOpenModalRequestAddPair(bool){
        this.flagOpenModalRequestAddPair = bool;
    }
    setCompetition(competition){
        this.competition = competition;
    }
    setFlagOpenModal(bool) {
        this.flagOpenModal = bool;
    }
    setFlagOpenModalAddPair(bool) {
        this.flagOpenModalAddPair = bool;
    }
    setFlagOpenModalInstruction(bool) {
        this.flagOpenModalInstruction = bool;
    }
    setPlayers(sportsmens) {
        this.players = sportsmens;
    }
    setFlagOpenModalSale(bool){
        this.flagOpenModalSale = bool;
    }

    coord(event, sportsmens) {
        const modal = document.querySelector(".people-actions__list");
        
        this.setPlayers(sportsmens);
        // console.log(this.players[0].id);
        if (sportsmens.length !== 0) {
            const button = event.target.closest(".actions-workout__people");
            let t = button.getBoundingClientRect().top + window.pageYOffset;
            let l = button.getBoundingClientRect().left + window.pageXOffset;
            
        
            modal.style.top = t + "px";
            modal.style.left = l + "px";
            // const item = document.querySelector(".people-actions__item");
            // setTimeout(() => {
                // let heightItem = modal.children[1].getBoundingClientRect().height;
            modal.style.height = (37 * this.players.length + 10) + 'px'

            // }, 5)
            modal.style.display = "block";
            // let height = element.getBoundingClientRect();

        }
    }
    closePlaers(event){
        const modal = document.querySelector(".people-actions__list");
        // console.log();
        if(!(event.target.closest(".actions-workout__people"))){
            if (!(event.target.closest(".people-actions__list")) || event.target.closest(".people-actions__exit")){
                modal.style.display = 'none'
            }
        }
    }
}
