import Config from "react-native-config";

const URL = Config.API_URL + 'ticket/reply';

const createFormData = (images, body) => {
    const data = new FormData();
    
    if(images != null) {
        images.forEach((image) => {
            const file = {
                name: image.filename,
                type: image.mime,
                uri:
                    Platform.OS == "android" ? image.path : image.path.replace("file://", "")
            };
            data.append('file[]', file)
        })
    }
     
    Object.keys(body).forEach(key => {
        data.append(key, body[key]);
    });
  
    return data;
};

const postCommentTicket = (
        token, 
        model_id,
        content, 
        images,
        closed ) => (

    fetch(URL,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                Accept: 'application/json',
                Authorization: token
            },
            body: images == null ? createFormData(null, { model_id, content, closed }) : createFormData(images, { model_id, content, closed })
        })
    .then(res => {
        return res;
    })
    .catch(err => console.log(err))
);

export default postCommentTicket;