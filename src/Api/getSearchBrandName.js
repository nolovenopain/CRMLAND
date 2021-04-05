import Config from "react-native-config";

const URL = Config.API_URL + 'sms/brand-name';

const getSearchBrandName = (token, searchText) => (
    fetch(URL + '?query[keyword]=' + searchText, 
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

export default getSearchBrandName;
