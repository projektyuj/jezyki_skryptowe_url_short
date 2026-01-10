const API_URL = 'https://jezyki-skryptowe-url-short-backend-dev.onrender.com';

export const createLinkRoute = API_URL + '/url';
const getMetricsRoute = API_URL + '/metrics';
//const getHealth = API_URL + '/health/';

const headers = {'content-type': 'application/json'};

export const createLink = async (body) => await fetch(createLinkRoute, {method: 'POST', body: JSON.stringify(body), headers});
export const getLink = async (id) => await fetch(createLinkRoute + '/' + id, {method: 'GET'});
export const getStats = async (id) => await fetch(getMetricsRoute + '/' + id, {method: 'GET'});
