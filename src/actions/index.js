
import { setToken, setUsername } from '../services/auth';
import { getUserDetails as apiUserDetails, postLogin } from '../services/api';


export const login = async (username, password) => {
    return postLogin(username, password)
        .then(data => data.access)
        .then(token => {
            if (token) {
                setToken(token);
                setUsername(username);
            }
            else {
                throw new Error('Verifique seu usuário e senha');
            }
        });
}

export const getUserDetails = username => {
    return async dispatch => {
        return apiUserDetails(username)
            .then(data => { return { type: 'SET_USER', payload: { user: data } } })
            .then(action => {
                dispatch(action);
                return action.payload.user;
            });
    }
};

export const setCompanyId = companyId => {
    return { type: 'SET_COMPANYID', payload: { companyId: companyId } }
}
