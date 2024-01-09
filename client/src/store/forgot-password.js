import {makeAutoObservable} from 'mobx'

class StoreForgot{
    openModalForgot = false;


    constructor(){
        makeAutoObservable(this);
    }

    setOpenModalForgot(bool){
        this.openModalForgot = bool;
    }

}

const storeForgot = new StoreForgot();

export default storeForgot;