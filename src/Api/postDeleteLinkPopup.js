import Config from "react-native-config";

const URL = Config.API_URL + 'popup/delete-link/';

const postDeleteLinkPopup = (token, popupId) => (
    fetch(URL + popupId,
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

export default postDeleteLinkPopup;
