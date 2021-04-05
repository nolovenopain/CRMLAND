import Config from "react-native-config";

const URL = Config.API_URL + 'customer?query[keyword]=';

const getSearchCustomer = (token, searchText) => ( 
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

export default getSearchCustomer;
