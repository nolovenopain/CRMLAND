import Config from "react-native-config";
const URL = Config.API_URL + 'website/restore/';

const postRestoreWebsite = (token, websiteId) => (
    fetch(URL + websiteId, 
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: token
            },
        })
    .then(res => {
        return res;
    })
    .catch(err => console.log(err))
);

export default postRestoreWebsite;