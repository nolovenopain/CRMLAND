import Config from "react-native-config";

const URL = Config.API_URL + 'sms/brand-name/register';

const createFormData = (files, body) => {
    const data = new FormData();
    
    if(files != null) {
        files.forEach((file) => {
            const fileObj = {
                name: file.name,
                type: file.type,
                uri:
                    Platform.OS == "android" ? file.uri : file.uri.replace("file://", "")
            };
            data.append('file', fileObj)
        })
    }
     
    Object.keys(body).forEach(key => {
        data.append(key, body[key]);
    });
    return data;
};

const postCreateBrandName = (
        token, 
        name,  
        files ) => (
        
    fetch(URL,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                Accept: 'application/json',
                Authorization: token
            },
            body: createFormData(files, { name })
        })
    .then(res => {
        return res;
    })
    .catch(err => console.log(err))
);

export default postCreateBrandName;
