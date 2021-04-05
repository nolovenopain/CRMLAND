import Config from "react-native-config";

const URL = Config.API_URL + 'user/update-profile';

const createFormData = (avatar, body) => {
    const data = new FormData();
  
    if(avatar != null) {
        data.append("avatar", {
            name: avatar.filename,
            type: avatar.mime,
            uri:
                Platform.OS == "android" ? avatar.path : avatar.path.replace("file://", "")
        });
    }
    
    Object.keys(body).forEach(key => {
        data.append(key, body[key]);
    });

    return data;
};
  
const postUpdateUserInfoPersonal = (
        token, 
        name,
        phone,
        address,
        avatar ) => (

    fetch(URL,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                Accept: 'application/json',
                Authorization: token
            },
            body: avatar == null ? createFormData(null, { name, phone, address }) : createFormData(avatar, { name, phone, address })
        })
    .then(res => {
        return res;
    })
    .catch(err => console.log(err))
);

const postUpdateUserInfoBusiness = (
        token, 
        name,
        phone,
        address,
        avatar,
        company_buyer,
        company_name,
        company_tax_code,
        company_address,
        company_phone,
        company_represent_person,
        company_position ) => (

    fetch(URL,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                Accept: 'application/json',
                Authorization: token
            },
            body: avatar == null ? 
                createFormData(null, { 
                    name, 
                    phone, 
                    address,
                    'company[buyer]' : company_buyer,
                    'company[name]' : company_name,
                    'company[tax_code]' : company_tax_code,
                    'company[address]' : company_address,
                    'company[phone]' : company_phone,
                    'company[represent_person]' : company_represent_person,
                    'company[position]' : company_position
                }) 
                    : 
                createFormData(avatar, { 
                    name, 
                    phone, 
                    address,
                    'company[buyer]' : company_buyer,
                    'company[name]' : company_name,
                    'company[tax_code]' : company_tax_code,
                    'company[address]' : company_address,
                    'company[phone]' : company_phone,
                    'company[represent_person]' : company_represent_person,
                    'company[position]' : company_position 
                })
        })
    .then(res => {
        return res;
    })
    .catch(err => console.log(err))
);

export { postUpdateUserInfoPersonal, postUpdateUserInfoBusiness };