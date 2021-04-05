import Config from "react-native-config";

const URL = Config.API_URL + 'website/renewal/';

const postWebsiteRenewable = (
        token, 
        domainId, 
        item_id ) => ( 

    fetch(URL + domainId,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: token
            },
            body: JSON.stringify({ item_id })
        })
    .then(res => { 
        return res;
    })
    .catch(err => console.log(err))
);

export default postWebsiteRenewable;
