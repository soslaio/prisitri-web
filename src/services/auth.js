
import { postLogin, getExtendedUserDetails } from './api';


const ACCESS_TOKEN = "@auth-token";

export function isAuthenticated() {
    return sessionStorage.getItem(ACCESS_TOKEN) !== null;
}

export function getToken() {
    return sessionStorage.getItem(ACCESS_TOKEN);
}

export async function login(username, password) {
    let fetchResult;

    try {
        fetchResult = await postLogin(username, password);
    }
    catch (e) {
        throw new Error('Não foi possível efetuar a autenticação');
    }

    if (fetchResult.hasOwnProperty('access')) {
        sessionStorage.setItem(ACCESS_TOKEN, fetchResult.access);

        const extendedUserDetails = getExtendedUserDetails()
    }
    else {
        throw new Error('Verifique seu usuário e senha');
    }
}
