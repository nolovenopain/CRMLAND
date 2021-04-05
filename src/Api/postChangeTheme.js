import Config from "react-native-config";

const URL = Config.API_URL + 'website/update/';

const postChangeTheme = (
        token, 
        domainId, 
        theme_id ) => ( 

    fetch(URL + domainId,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: token
            },
            body: JSON.stringify({ 
                theme_id,
                type: 2 
            })
        })
    .then(res => {
        return res;
    })
    .catch(err => console.log(err))
);

export default postChangeTheme;
