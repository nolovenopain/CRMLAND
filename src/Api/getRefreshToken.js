import Config from "react-native-config";

const URL = Config.API_URL + 'refresh-token';

const getRefreshToken = (token, refresh_token) => ( 
    fetch(URL, 
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: token
            },
            body: JSON.stringify({ refresh_token })
        })
    .then(res => {
        return res;
    })
    .catch(err => console.log(err))
);

export default getRefreshToken;
