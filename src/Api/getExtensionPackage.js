import Config from "react-native-config";

const URL = Config.API_URL + 'item/renewal-website/';

const getExtensionPackage = (token, websiteId) => ( 
    fetch(URL + websiteId, 
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

export default getExtensionPackage;
