
export const selectedCompanyId = '89f518bc-2943-476b-8b60-2edd1ee60ad4';
export const loggedExtendedUserId = '0bcd16bc-5e39-4054-90c7-67f69d8d853c';
export const loggedUserJwtToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTkyODMzMzk2LCJqdGkiOiJmZDE2YjI3ZDY0ZGQ0NDY1YjVhYzA5YTc0MTZmZDg2NiIsInVzZXJfaWQiOjJ9.c0eS1iT480HqRo7fxhvJHRdosOpFeoO5JKi8Zr5_K34';
export const fetchOptions = {
    method: 'GET',
    headers: new Headers({
        'Authorization': `Bearer ${loggedUserJwtToken}`
    })
};
