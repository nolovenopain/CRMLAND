import Config from "react-native-config";

const URL = Config.API_URL + 'login';

const postLogin = (email, password) => (
    fetch(URL,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({ email, password })
        })
    .then(res => {
        return res
    })
    .catch(err => console.log(err))
);

export default postLogin;
