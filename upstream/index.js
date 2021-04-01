//import * as https from https;

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    const https = require('https');
    const Agent = require('agentkeepalive');
    const rp = require('request-promise');
    require("request");
    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    const keepaliveagent = new https.Agent({
            keepAlive: true,
            maxSockets: 40,
            timeout: 3000,
            maxFreeSockets: 20,
    });
    var uri = "http://localhost:7071/api/downstream";
    option = {
        method: 'GET',
        uri: uri,
        timeout: 3000,
        pool: keepaliveagent
    }

    for (let i = 0; i <= 400; i++) {
       await rp(option);
    }
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}