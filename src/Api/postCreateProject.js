import Config from "react-native-config";

const URL = Config.API_URL + 'project/create';

const postCreateProject = (
        token, 
        name, 
        description, 
        file_contract,
        file_design,
        file_marketing ) => (
                  
    fetch(URL,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: token
            },
            body: JSON.stringify({ 
                name, 
                description,
                file_contract,
                file_design,
                file_marketing 
            })
        })
    .then(res => {
        return res;
    })
    .catch(err => console.log(err))
);

export default postCreateProject;
