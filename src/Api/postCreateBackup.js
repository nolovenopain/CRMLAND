import Config from "react-native-config";

const URL = Config.API_URL + 'website/backup/';

const postCreateBackup = (token, domainId) => (
       
    fetch(URL + domainId + '/create',
        {
            method: 'POST',
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

export default postCreateBackup;
