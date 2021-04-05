import Config from "react-native-config";

const URL = Config.API_URL + 'customer/group/list?query[keyword]=';

const getSearchGroupOfCustomer = (token, search) => ( 
    fetch(URL + search, 
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

export default getSearchGroupOfCustomer;
