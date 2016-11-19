// This file is NOT included in source control and must be manually added (for security purposes). See Andrew Petersen
var config = require("../../../app.config");
var GraphService = require("./GraphService");
require("./events");

module.exports = new GraphService(config.clientId, config.clientSecret, config.tenantId);

