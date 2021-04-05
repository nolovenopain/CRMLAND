import Config from "react-native-config";

const URL = Config.API_URL + 'customer/';

const postSendInfoProject = (
        token, 
        project_id, 
        email_server_id, 
        file_contract,
        file_design,
        file_marketing,
        type, 
        customerId ) => (
            
    fetch(URL + customerId + '/send-info-project',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: token
            },
            body: JSON.stringify({ 
                project_id, 
                email_server_id, 
                file_contract,
                file_design,
                file_marketing,
                type 
            })
        })
    .then(res => { 
        return res;
    })
    .catch(err => console.log(err))
);

export default postSendInfoProject;
