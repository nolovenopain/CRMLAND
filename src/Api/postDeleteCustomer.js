import Config from "react-native-config";

const URL = Config.API_URL + 'customer/delete/';

const postDeleteCustomer = (token, customerId) => (
    fetch(URL + customerId,
        {
            method: 'POST',
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

export default postDeleteCustomer;
