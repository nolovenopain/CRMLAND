import Config from "react-native-config";

const URL = Config.API_URL + 'popup/active/';

const postActivePopup = (
        token, 
        popupLinkId, 
        type, 
        active ) => (
       
    fetch(URL + popupLinkId,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: token
            },
            body: JSON.stringify({ type, active })
        })
    .then(res => {
        return res;
    })
    .catch(err => console.log(err))
);

export default postActivePopup;
