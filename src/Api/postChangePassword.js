import Config from "react-native-config";

const URL = Config.API_URL + 'user/update-password';

const postChangePassword = (
        token, 
        current_password, 
        password, 
        password_confirmation ) => (

    fetch(URL, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: token
        },
        body: JSON.stringify({ 
            current_password,
            password, 
            password_confirmation
        })
    })
    .then(res => {
        return res;
    })
    .catch(err => console.log(err))
);

export default postChangePassword;