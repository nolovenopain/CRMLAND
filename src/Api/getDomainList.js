import Config from "react-native-config";

const URL = Config.API_URL + 'website/list';

const getDomainList = (token, page) => ( 
    fetch(URL + "?pagination[page]=" + page , 
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

export default getDomainList;
