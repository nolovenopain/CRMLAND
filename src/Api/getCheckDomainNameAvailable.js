import Config from "react-native-config";

const URL = Config.API_URL + 'website/check-domain-address';

const getCheckDomainNameAvailable = (token, domainName) => (
    fetch(URL + '?domain=' + domainName , 
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

export default getCheckDomainNameAvailable;
