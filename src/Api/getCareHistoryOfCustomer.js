import Config from "react-native-config";

const URL = Config.API_URL + 'customer';

const getFullListCareHistoryOfCustomer = (
    token, 
    page, 
    customerId ) => (

    fetch(URL + '/' + customerId + "/care-history?page=" + page , 
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

const getReduceListCareHistory = (token, customerId) => (
    fetch(URL + '/' + customerId + '/care-history?page=1' , 
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

export { getFullListCareHistoryOfCustomer, getReduceListCareHistory };
