import Config from "react-native-config";

const URL = Config.API_URL + 'marketing/automation/detail/';

const getAutomationDetail = (token, automationId) => ( 
    fetch(URL + automationId , 
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

export default getAutomationDetail ;
