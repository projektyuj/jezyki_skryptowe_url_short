
const API_URL = "localhost:8080";

const createLinkRoute = API_URL + '/';
const getStatsRoute = API_URL + '/statistics/';

export const createLink = async(body) => await fetch(createLinkRoute, {method: "POST", body});
export const getLink = async(id) => await fetch (createLinkRoute+id, {method: "GET"});
export const getStats = async(id) => await fetch (getStatsRoute+id, {method: "GET"});