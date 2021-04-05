import Config from "react-native-config";

const URL = Config.API_URL + 'upload-many';

const createFormData = (files) => {
    const data = new FormData();
    
    files.forEach((file) => {
        const singleFile = {
            name: file.name,
            type: file.type,
            uri:
                Platform.OS == "android" ? file.uri : file.uri.replace("file://", "")
        };
        data.append('files[]', singleFile)
    })
  
    return data;
};

const postUpLoadManyFiles = (
        token, 
        files ) => (
                 
    fetch(URL,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                Accept: 'application/json',
                Authorization: token
            },
            body: createFormData(files)
        })
    .then(res => {
        return res;
    })
    .catch(err => console.log(err))
);

export default postUpLoadManyFiles;
