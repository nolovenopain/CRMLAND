
const URL = '/api-statistics.php'

const getWebsiteUsage = (domainName) => ( 
    fetch('http://' + domainName + URL, 
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        })
    .then(res => {
        return res;
    })
    .catch(err => console.log(err))
);

export default getWebsiteUsage;