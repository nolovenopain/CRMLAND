import Config from "react-native-config";

const URL = Config.API_URL + 'email/sender/create';

const postCreateEmailSender = (token, name, email) => (
    fetch(URL,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: token
            },
            body: JSON.stringify({ name, email })
        })
    .then(res => {
        return res;
    })
    .catch(err => console.log(err))
);

export default postCreateEmailSender;
