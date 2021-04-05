import Config from "react-native-config";

const URL = Config.API_URL + 'ticket/';

const getTicketDetail = (token, ticketId) => ( 
    fetch(URL + ticketId + '/detail' , 
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

export default getTicketDetail;
