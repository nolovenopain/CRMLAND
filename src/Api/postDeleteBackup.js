import Config from "react-native-config";

const URL = Config.API_URL + 'website/backup/';

const postDeleteBackup = (
        token, 
        websiteId, 
        fileName ) => ( 

    fetch(URL + websiteId + '/delete/' + fileName, 
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

export default postDeleteBackup;