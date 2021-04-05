import Config from "react-native-config";

const URL = Config.API_URL + 'project/delete/';

const postDeleteProject = (token, projectId) => (
    fetch(URL + projectId,
        {
            method: 'POST',
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

export default postDeleteProject;
