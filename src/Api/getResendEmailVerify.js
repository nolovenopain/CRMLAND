import Config from "react-native-config";

const URL = Config.API_URL + 'user/resent-verify';

const getResendEmailVerify = (token) => ( 
    fetch(URL, 
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

export default getResendEmailVerify;
