import Config from "react-native-config";
const URL = Config.API_URL + 'register';

const postRegisterPersonal = (
        name,
        email,
        phone,
        password,
        password_confirmation,
        type,
        agree ) => (
            
    fetch(URL, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
                name,
                email,
                phone,
                password,
                password_confirmation,
                type,
                agree
            })
        })
    .then(res => {
            return res;
        })
    .catch(err => console.log(err))
);

const postRegisterBussiness = (
    company_name,
    company_email,
    company_phone,
    company_tax_code,
    company_address,
    company_password,
    company_password_confirmation,
    type,
    agree ) => (
        
    fetch(URL, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
                company_name,
                company_email,
                company_phone,
                company_tax_code,
                company_address,
                company_password,
                company_password_confirmation,
                type,
                agree
            })
        })
    .then(res => { 
            return res;
        })
    .catch(err => console.log(err))
);

export { postRegisterPersonal, postRegisterBussiness };