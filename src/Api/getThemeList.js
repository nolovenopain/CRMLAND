import Config from "react-native-config";

const URL = Config.API_URL + 'website/themes';

const getThemeListCategory_1 = (token, page) => ( 
    fetch(URL + "?page=" + page + "&&category_id=1", 
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

const getThemeListCategory_2 = (token, page) => ( 
    fetch(URL + "?page=" + page + "&&category_id=2", 
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


export { getThemeListCategory_1, getThemeListCategory_2 };
