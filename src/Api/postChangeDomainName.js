import Config from "react-native-config";

const URL = Config.API_URL + 'website/update/';

const postChangeDomainName = (
        token, 
        domainId, 
        domain ) => ( 

    fetch(URL + domainId,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: token
            },
            body: JSON.stringify({ 
                domain,
                type: 1 
            })
        })
    .then(res => {
        return res;
    })
    .catch(err => console.log(err))
);

export default postChangeDomainName;
