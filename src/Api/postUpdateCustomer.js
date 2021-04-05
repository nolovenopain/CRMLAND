import Config from "react-native-config";

const URL = Config.API_URL + 'customer/update/';

const postUpdateCustomer = (
        token, 
        pronoun, 
        fullname, 
        birthday, 
        address, 
        phone, 
        email,
        projects_id, 
        type_id, 
        groups_id,
        source_id, 
        customerId ) => (
            
    fetch(URL + customerId,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: token
            },
            body: JSON.stringify({ 
                pronoun, 
                fullname, 
                birthday, 
                address, 
                phone, 
                email, 
                projects_id, 
                type_id, 
                groups_id,
                source_id 
            }),
        })
    .then(res => {
        return res;
    })
    .catch(err => console.log(err))
);

export default postUpdateCustomer;
