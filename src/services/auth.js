
const ACCESS_TOKEN = '@auth-token';
const USERNAME = '@username';

export function getToken() {
    return sessionStorage.getItem(ACCESS_TOKEN);
}

export function setToken(token) {
    sessionStorage.setItem(ACCESS_TOKEN, token);
}

export function setUsername(username) {
    sessionStorage.setItem(USERNAME, username);
}

export function getUsername() {
    return sessionStorage.getItem(USERNAME);
}

export function isAuthenticated() {
    return sessionStorage.getItem(ACCESS_TOKEN) !== null;
}
