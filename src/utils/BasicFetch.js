const BasicFetch = async (url, fetchConfig = {}, contentTypeOverRide = null) => {

    if(!fetchConfig['headers']){
        fetchConfig['headers'] = {}
    }

    if(!fetchConfig['headers']['Content-Type'] && !contentTypeOverRide){
        fetchConfig['headers']['Content-Type'] =  'application/json'
    }
    if(!fetchConfig['method']){
        fetchConfig['method'] = 'GET'
    }


    const response = await fetch(url, fetchConfig)
    const data = await response.json()
    return {response, data}
}

export default BasicFetch;