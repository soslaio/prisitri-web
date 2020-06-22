
import { postLogin, getUserDetails } from './api';


const ACCESS_TOKEN = '@auth-token';
const EXTENDED_USER = '@extended-user-id';

// storage queries
export function getToken() {
    return sessionStorage.getItem(ACCESS_TOKEN);
}

export function isAuthenticated() {
    return sessionStorage.getItem(ACCESS_TOKEN) !== null;
}

export function getExtendedUser(){
    return JSON.parse(sessionStorage.getItem(EXTENDED_USER));
}

export function getExtendedUserId() {
    const extendedUser = getExtendedUser();
    return extendedUser?.extended_user_id;
}

// storage changes
export async function login(username, password) {
    let loginResponse;

    try {
        loginResponse = await postLogin(username, password);
    }
    catch (e) {
        throw new Error('Não foi possível efetuar a autenticação');
    }

    if (loginResponse.hasOwnProperty('access')) {
        try {
            sessionStorage.setItem(ACCESS_TOKEN, loginResponse.access);

            const userDetailsResponse = await getUserDetails(username);
            sessionStorage.setItem(EXTENDED_USER, JSON.stringify(userDetailsResponse));
        }
        catch (e) {
            throw new Error('Não foi possível consultar os detalhes do usuário');
        }
    }
    else {
        throw new Error('Verifique seu usuário e senha');
    }
}
