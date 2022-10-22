// Copyright IBM Corp. 2016,2019. All Rights Reserved.
// Node module: loopback-workspace
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const loopback = require("loopback");
module.exports = function enableAuthentication(server) {
    // enable authentication
    server.use(loopback.token({
        model: server.models.AccountToken,
    }));
    server.enableAuth();
};
//# sourceMappingURL=authentication.js.map