import Config from "react-native-config";

const URL = Config.API_URL;

const getListCustomerSMSOfCampaign = (token, campaignId) => ( 
    fetch(URL +  "marketing/campaign/report/" + campaignId, 
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

const getListCustomerEmailOfCampaign = (token, campaignId) => (
    fetch(URL + "marketing/campaign/email/report/" + campaignId, 
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

export { getListCustomerSMSOfCampaign, getListCustomerEmailOfCampaign };
