var request = require('request-promise-native');
var tokenHelper = require("./tokenHelper");

var GraphService = function (clientId, clientSecret, tenantId) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.tenantId = tenantId;
    this.baseUrl = "https://graph.microsoft.com"
    this.ensureToken();
};

GraphService.prototype.ensureToken = function() {
    var fortyFiveMinutes = (1000 * 60 * 45 );
    // if there is no token or its older than 45 minutes
    if (!this.tokenTimestamp || !this.accessToken || new Date() - this.tokenTimestamp > fortyFiveMinutes) {
        return this._getToken();
    } else {
        return Promise.resolve(this.accessToken);
    }
};
GraphService.prototype._getToken = function() {
    return tokenHelper.getAppOnlyToken(this.clientId, this.clientSecret, this.tenantId)
        .then(token => this.accessToken = token)
        .then(token => this.tokenTimestamp = new Date());
};

GraphService.prototype.get = function(url) {
    return this.ensureToken().then(() => this._request( { url, method: "GET" }));
};
GraphService.prototype.post = function(url, body) {
    return this.ensureToken().then(() => this._request({ url, body, method: "POST" }));
};

GraphService.prototype._request = function(opts) {
    // opts param should at least have url and method
    if (!opts || !opts.url || !opts.method) throw new Error("You need to pass url and method property to _request");
    
    // if it was a relative url, prefix it with the base url
    if (!opts.url.startsWith("http")) {
        opts.url = this.baseUrl + opts.url;
    }

    var defaults = {
        json:true,
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + this.accessToken
        }
    };
    var opts = Object.assign({}, defaults, opts);
    return request(opts);
};



module.exports = GraphService;