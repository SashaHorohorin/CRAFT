import axios from "axios";
import $api from "../http";

const host = "https://craft-bc-backend.online";
// const host = "craft-bc-backend.online:9005";
export default class DataService {
    static async getCardWhy() {
        const response = await axios.get(
            `http://${host}/user/get-all-actives-cards`
        );
        // console.log('uqweruwqr');
        return response;
    }
    static async getTrainingCalendar(count) {
        return await $api.get(`/api/v1/calendar/get?page=${count}`);
    }
    static async postRegister(obj) {
        return await $api.post(`/api/v1/auth/register`, obj);
    }
    static async postLogin(obj) {
        return await $api.post(`/api/v1/auth/login`, obj);
    }
    static async postFollowTrain(obj, trainId) {
        return await $api.post(
            `api/v1/train/${trainId}/add-user
        `,
            obj
        );
    }
    static async postUnFollowTrain(obj, trainId) {
        return await $api.post(
            `api/v1/train/${trainId}/remove-user
        `,
            obj
        );  
    }

    static async getEvents(countPage) {
        return await $api.get(`api/v1/news?page=${countPage}&size=6`);
    }
    static async getPrice(sportComplex) {
        return await $api.get(
            `/api/v1/price/get-by-sportcomplex/${sportComplex}`
        );
    }
    static async getСompetitions() {
        return await $api.get(`api/v1/competition/get-all`);
    }
    static async getProfile(username) {
        return await $api.get(`api/v1/profile/${username}`);
    }
    static async postCreateAndInvite(competitionId, obj) {
        console.log('DataService' + ' : ' + competitionId);
        return await $api.post(
            `api/v1/competition/${competitionId}/create-and-invite
        `,
            obj
        );
    }
    static async postCreatePair(competitionId) {
        // console.log('DataService' + ' : ' + competitionId);
        return await $api.post(
            `api/v1/competition/${competitionId}/create-pair
        `);
    }
    static async postSetLabId(obj) {
        return await $api.post(
            `api/v1/profile/set-lab-id
        `,
            obj
        );
    }
    static async postDeletePair(pairId) {
        return await $api.post(
            `api/v1/competition/delete-pair/${pairId}`);
    }
    static async postAcceptInvitePair(competitionPairId, obj) {
        return await $api.post(
            `api/v1/competition/pair/${competitionPairId}/accept-invite-request
        `,
            obj
        );
    }
    static async postRejectInvitePair(competitionPairId, obj) {
        return await $api.post(
            `api/v1/competition/pair/${competitionPairId}/reject-invite-request
        `,
            obj
        );
    }
    static async postRejectJoinPair(competitionPairId, obj) {
        return await $api.post(
            `api/v1/competition/pair/${competitionPairId}/reject-join-request
        `,
            obj
        );
    }
    static async postAcceptJoinPair(competitionPairId, obj) {
        return await $api.post(
            `api/v1/competition/pair/${competitionPairId}/accept-join-request
        `,
            obj
        );
    }
    static async getAllUsers() {
        return await $api.get(`api/v1/profile/find-all`);
    }
    static async getAdminUser(username) {
        return await $api.get(`api/v1/profile/${username}`);
    }
    static async getCompetitionById(id) {
        return await $api.get(`api/v1/competition/${id}`);
    }
    static async getRequestToInvite(competitionPairId, username) {
        return await $api.get(`api/v1/competition/pair/${competitionPairId}/request-to-invite/${username}`);
    }
    static async getRequestToJoin(competitionPairId) {
        return await $api.get(`api/v1/competition/pair/${competitionPairId}/request-to-join`);
    }
    static async postCreateTrain(obj) {
        return await $api.post(
            `api/v1/train/create`, obj);
    }
    static async postDeleteTrain(trainId) {
        return await $api.delete(
            `api/v1/train/${trainId}`);
    }
    static async postChangeTrain(trainId, obj) {
        return await $api.post(
            `api/v1/train/change/${trainId}`, obj);
    }
    static async getTrainingAll() {
        return await $api.get(`/api/v1/train/get-all`);
    }
    static async getTrainerAll() {
        return await $api.get(`api/v1/trainer/get-all`);
    }

    // ===================================================<COMPETITION>

    static async postCreateCompetition(obj) {
        return await $api.post(
            `api/v1/competition/create`, obj);
    }
    static async postDeleteCompetition(competitionId) {
        return await $api.post(
            `api/v1/competition/delete/${competitionId}`);
    }
    static async postChangeCompetition(competitionId, obj) {
        return await $api.post(
            `api/v1/competition/update/${competitionId}`, obj);
    }
    static async getCompetitionAll() {
        return await $api.get(`api/v1/competition/get-all`);
    }

    // ===================================================<COMPETITION>
    // ===================================================<EVENT>

    static async postCreateEvent(obj) {
        return await $api.post(
            `api/v1/news/create`, obj);
    }
    static async postDeleteEvent(id) {
        return await $api.delete(
            `api/v1/news/delete/${id}`);
    }
    static async postChangeEvent(id, obj) {
        return await $api.post(
            `api/v1/news/update/${id}`, obj);
    }
    static async getEventsAll(countPage) {
        return await $api.get(`api/v1/news?page=${countPage}&size=6`);
    }

    // ===================================================<EVENT>

    
    // ===================================================<ПОЛУЧЕНИЕ ВСЕХ ПОЛЬЗОВАТЕЛЕЙ НЕ ЗАРЕГЕСТРИРОВАННЫХ НА СОРЕВНОВАНИЯ>
    
    static async getUsersNotRegisterCompetition(competitionId) {
        return await $api.get(`api/v1/profile/find-all-in-competition-without-pair/${competitionId}`);
    }
    
    // ===================================================<ПОЛУЧЕНИЕ ВСЕХ ПОЛЬЗОВАТЕЛЕЙ НЕ ЗАРЕГЕСТРИРОВАННЫХ НА СОРЕВНОВАНИЯ>

    // ===================================================<РАССЫЛКИ>

    static async getMailingCompetition() {
        return await $api.get(`/api/v1/mailing/about-created-competitions`);
    }

    static async getMailingTraining() {
        return await $api.get(`/api/v1/mailing/about-created-trains`);
    }

    // ===================================================<РАССЫЛКИ>
    // ===================================================<ЦЕНЫ>

    static async postAddOrder(obj) {
        return await $api.post(
            `api/v1/subscription/add-order`, obj);
    }
    static async postAcceptOrder(obj) {
        return await $api.post(
            `api/v1/subscription/accept-order`, obj);
    }
    static async postCancelOrder(obj) {
        return await $api.post(
            `api/v1/subscription/cancel-order`, obj);
    }
    static async getAllOrders() {
        return await $api.get(`api/v1/subscription/all-orders`);
    }

    // ===================================================<ЦЕНЫ>

    static async postRegFirstTrain(obj) {
        return await $api.post(
            `api/v1/first-train-form/register`, obj);
    }

    
}
