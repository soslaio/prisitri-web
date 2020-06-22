
import { getToken } from './auth';
import { loggedExtendedUserId, selectedCompanyId } from '../config';


const loggedUserJwtToken = getToken();
const apiServer = process.env.REACT_APP_API_SERVER;


// generics
export const getApi = async url => {
    const options = {
        method: 'GET',
        headers: new Headers({
            'Authorization': `Bearer ${loggedUserJwtToken}`
        })
    };
    return fetch(url, options)
        .then(data => data.json());
};

export const postApi = async (url, data) => {
    const options = {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${loggedUserJwtToken}`
        }),
        body: JSON.stringify(data)
    };

    return fetch(url, options)
        .then(data => data.json());
};

// post
export const postOrderWithSchedules = async data => {
    const url = `${apiServer}/orders/`;
    return postApi(url, data);
};

export const postLogin = async (username, password) => {
    const url = `${apiServer}/token/`;
    return postApi(url, {
        username,
        password
    });
};

// lists
export const getAvailableSchedules = async (resourceId, scheduleTypeId) => {
    const url = `${apiServer}/resources/${resourceId}/availabilities/${scheduleTypeId}`;
    return getApi(url);
};

// details
export const getExtendedUserDetails = async () => {
    const url = `${apiServer}/extendedusers/${loggedExtendedUserId}/`;
    return getApi(url);
};

export const getCompanyDetails = async () => {
    const url = `${apiServer}/companies/${selectedCompanyId}/`;
    return getApi(url);
};

export const getResourceTypeDetails = async resourceTypeId => {
    const url = `${apiServer}/resourcetypes/${resourceTypeId}/`;
    return getApi(url);
};

export const getResourceDetails = async resourceId => {
    const url = `${apiServer}/resources/${resourceId}/`;
    return getApi(url);
};
