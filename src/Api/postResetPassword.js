import Config from "react-native-config";
const URL = Config.API_URL + 'request-reset-password';

const postResetPassword = (email) => (
    fetch(URL, 
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email })
        })
    .then(res => {
        return res;
    })
    .catch(err => console.log(err))
);

export default postResetPassword;