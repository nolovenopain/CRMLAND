import Config from "react-native-config";

const URL = Config.API_URL + 'customer/create';

const postCreateCustomer = (
        token, 
        pronoun, 
        fullname, 
        birthday, 
        address, 
        phone, 
        email,
        project_id, 
        type_id, 
        group_id, 
        source_id ) => ( 

    fetch(URL,
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
                project_id, 
                type_id, 
                group_id, 
                source_id 
            })
        })
    .then(res => {
        return res;
    })
    .catch(err => console.log(err))
);

export default postCreateCustomer;
