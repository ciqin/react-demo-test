const USERINFO_LOGIN = 'USERINFO_LOGIN';
const ADD_CONCENT = 'ADD_CONCENT';

export function login(data) {
    return {
        type: USERINFO_LOGIN,
        data
    }
}

export function addUpdate(data) {
    return {
        type: ADD_CONCENT,
        data
    }
}