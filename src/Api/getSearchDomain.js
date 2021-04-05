import Config from "react-native-config";

const URL = Config.API_URL + 'website/list?query[domain]=';

const getSearchDomain = (token, searchText) => ( 
    fetch(URL + searchText, 
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: token
            },
        })
    .then(res => {
        return res;
    })
    .catch(err => console.log(err))
);

export default getSearchDomain;
