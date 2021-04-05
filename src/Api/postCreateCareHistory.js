import Config from "react-native-config";

const URL = Config.API_URL + 'customer/';

const postCreateCareHistory = (
    token,
    customerId,
    next_time,
    channel_id,
    description ) => (
       
    fetch(URL + customerId + '/history/create',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: token
            },
            body: JSON.stringify({
                next_time,
                channel_id,
                description
            })
        })
    .then(res => {
        return res;
    })
    .catch(err => console.log(err))
);

export default postCreateCareHistory;
