import Config from "react-native-config";

const URL = Config.API_URL + 'logout';

const postLogOut = (token, deviceToken) => (
    fetch(URL,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: token
            },
            body: JSON.stringify({ token: deviceToken })
        })
    .then(res => {
        return res;
    })
    .catch(err => console.log(err))
);

export default postLogOut;
