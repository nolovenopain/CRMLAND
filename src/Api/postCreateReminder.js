import Config from "react-native-config";

const URL = Config.API_URL + 'reminder/create';

const postCreateReminder = (
        token, 
        title, 
        alarm_at, 
        content ) => (

    fetch(URL,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: token
            },
            body: JSON.stringify({ 
                title, 
                alarm_at, 
                content })
        })
    .then(res => {
        return res;
    })
    .catch(err => console.log(err))
);

export default postCreateReminder;
