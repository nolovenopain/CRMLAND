import Config from "react-native-config";

const URL = Config.API_URL + 'customer/send-email';

const postSendEmail = (
        token, 
        email_sender_id, 
        reply_to, 
        customers_id, 
        subject, 
        content,
        attachments ) => (
            
    fetch(URL,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: token
            },
            body: JSON.stringify({ 
                email_sender_id, 
                reply_to, 
                customers_id, 
                subject, 
                content,
                attachments 
            })
        })
    .then(res => {
        return res;
    })
    .catch(err => console.log(err))
);

export default postSendEmail;
