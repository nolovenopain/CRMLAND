import Config from "react-native-config";

const URL = Config.API_URL + 'upload-many';

const postUpLoadFile = (
        token, 
        files,
        data ) => (

    files.forEach((file) => {
        data.append('files', {
            uri: file.uri,
            type: file.type,
            name: file.fileName
        })
    }),

    fetch(URL,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                Accept: 'application/json',
                Authorization: token
            },
            body: data
        })
    .then(res => {
        return res;
    })
    .catch(err => console.log(err))
);

export default postUpLoadFile;
