import Config from "react-native-config";

const URL = Config.API_URL + 'website/suspend/';

const postChangeStatusSuspend = (
        token, 
        domainId, 
        type ) => (
         
    fetch(URL + domainId + '/' + type,
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

export default postChangeStatusSuspend;
