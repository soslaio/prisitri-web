
import { fetchOptions } from '../config';

export const fetchApi = async url => {
    return fetch(url, fetchOptions)
        .then(data => data.json());
}

export const fetchResourceDetails = async (resourceId) => {
    const url = `http://localhost:8000/resources/${resourceId}/`;
    return fetchApi(url);
};

export const fetchAvailableSchedules = async (resourceId, scheduleTypeId) => {
    const url = `http://localhost:8000/resources/${resourceId}/availabilities/${scheduleTypeId}`;
    return fetchApi(url);
};
