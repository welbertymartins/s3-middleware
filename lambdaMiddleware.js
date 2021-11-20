const getEnv = (key) => process.env[key]
const getRequestId = (event) => event["requestContext"]["requestId"]
const getBodyRequest = (event) => event["body"]
const getParam = (event, key) => event["queryStringParameters"][key]

const headers = { 
    public: {
        "Access-Control-Allow-Origin" : "*" 
    } 
}

const statusCodes = {
    ok: 200,
    notFound: 406,
    serviceUnavailable: 503
}

module.exports = { getEnv, getRequestId, getBodyRequest, getParam, headers, statusCodes }