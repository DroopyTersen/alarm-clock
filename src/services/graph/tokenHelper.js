// var request = require("./httpRequest");
var request = require("request-promise-native");
var urlUtils = require("url");
var qs = require("querystring");

var getAppOnlyToken = exports.getAppOnlyToken = function(clientId, clientSecret, tenantId) {
    // var url = "https://login.microsoftonline.com/common/oauth2/v2.0/token";
    var url = `https://login.microsoftonline.com/${tenantId}/oauth2/token`
    var body  = {
        grant_type: "client_credentials",
        client_id: clientId,
        client_secret: clientSecret,
        resource: "https://graph.microsoft.com"
    };
    var params = {
        url: url,
        body: qs.stringify(body),
        method: "POST"
    }
    return request(params)
        .then(resp => JSON.parse(resp).access_token)
        .catch(function(err){
            console.log(err)
        });
}

var getAdminConsentUrl = exports.getAdminConsentUrl = function(clientId, tenantId, redirect) {
    return `https://login.microsoftonline.com/common/adminconsent?client_id=${clientId}&state=12345&redirect_uri=${redirect}`
};
