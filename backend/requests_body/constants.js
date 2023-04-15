const token = 'API_KEY_TEST'

const get_brands_body = {
    method: 'post',
    url: 'https://app.socialinsider.io/api',
    data: {
        "jsonrpc": "2.0", 
        "id": 0,
        "method": "socialinsider_api.get_brands", 
        "params": {
            "projectname": "API_test"
        }
    },
    headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}
}

const get_profile_body = (id, profile_type) => {
    return {
    method: 'post',
    url: 'https://app.socialinsider.io/api',
    data:{
        "id" : 1,
        "method" : "socialinsider_api.get_profile_data",
        "params":{
            "id":id,
            "profile_type": profile_type,
            "date": {
                "start": 1608209422374,
                "end": 1639745412436,
                "timezone": "Europe/London"
            }
        }
    },
    headers: {'Content-Type': 'application/json', 
              'Authorization': `Bearer ${token}`
            }
        }
}

module.exports = {get_brands_body, get_profile_body}