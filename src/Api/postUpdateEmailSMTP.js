import Config from "react-native-config";

const URL = Config.API_URL + 'email/server/update/';

const postUpdateEmailSMTP = (
        token, 
        name, 
        host, 
        smtp_username,
        smtp_password,
        smtp_port,
        smtp_protocol,
        type,
        emailId ) => (

    fetch(URL + emailId,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: token
            },
            body: JSON.stringify({ 
                name, 
                host, 
                smtp_username,
                smtp_password,
                smtp_port,
                smtp_protocol,
                type 
            })
        })
    .then(res => {
        return res;
    })
    .catch(err => console.log(err))
);

export default postUpdateEmailSMTP;
