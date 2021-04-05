import Config from "react-native-config";

const URL = Config.API_URL + 'register-device';

const postRegisterTokenDevice = (token, device) => (
    fetch(URL, 
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: token
            },
            body: JSON.stringify({ device })
        })
    .then(res => {
        return res;
    })
    .catch(err => console.log(err))
);

export default postRegisterTokenDevice;