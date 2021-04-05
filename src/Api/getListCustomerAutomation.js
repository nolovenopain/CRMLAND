import Config from "react-native-config";

const URL = Config.API_URL + 'marketing/automation/';

const getListCustomerAutomation = (token, automationId, date) => ( 
    fetch(URL + automationId + "/date/" + date , 
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

export default getListCustomerAutomation ;
