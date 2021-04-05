import Config from "react-native-config";

const URL = Config.API_URL + 'customer/detail/';

const getCustomerDetail = (token, customerId) => (
    fetch(URL + customerId , 
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

export default getCustomerDetail;
