import Config from "react-native-config";

const URL = Config.API_URL + 'project/update/';

const postUpdateProject = (
        token, 
        name, 
        description, 
        file_contract,
        file_design,
        file_marketing,
        projectId ) => (   

    fetch(URL + projectId,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: token
            },
            body: JSON.stringify({ 
                token, 
                name, 
                description,
                file_contract,
                file_design,
                file_marketing, 
            })
        })
    .then(res => {
        return res;
    })
    .catch(err => console.log(err))
);

export default postUpdateProject;
