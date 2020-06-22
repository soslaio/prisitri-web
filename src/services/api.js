
import { getOptions, postOptions } from '../config';

export const getApi = async url => {
    return fetch(url, getOptions)
        .then(data => data.json());
}

export const postApi = async (url, data) => {
    const options = postOptions(data);
    return fetch(url, options)
        .then(data => data.json());
}

export const getResourceDetails = async (resourceId) => {
    const url = `http://localhost:8000/resources/${resourceId}/`;
    return getApi(url);
};

export const getAvailableSchedules = async (resourceId, scheduleTypeId) => {
    const url = `http://localhost:8000/resources/${resourceId}/availabilities/${scheduleTypeId}`;
    return getApi(url);
};

export const postOrderWithSchedules = async data => {
    const url = `http://localhost:8000/orders/`;
    return postApi(url, data);
};
