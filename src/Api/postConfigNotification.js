import Config from "react-native-config";

const URL = Config.API_URL + 'user/config-notification-mobile';

const postConfigNotification = (
        token,
        key,
        value ) => (

    fetch(URL,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: token
            },
            body: JSON.stringify({
                key, 
                value
            })
        })
    .then(res => {
        return res;
    })
    .catch(err => console.log(err))
);

export default postConfigNotification;
