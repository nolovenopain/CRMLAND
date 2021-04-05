import { API_URL } from '../Helpers/Constants';
const URL = API_URL + 'list-domain';

function getDomain(token) {
    return fetch(URL)
        .then(res => res.json())
        .then(resJSON => resJSON.data);
}

export default getDomain;
