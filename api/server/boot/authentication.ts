// Copyright IBM Corp. 2016,2019. All Rights Reserved.
// Node module: loopback-workspace
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';

import { App } from '../../common/helpers/loopback';
import * as loopback from 'loopback';

module.exports = function enableAuthentication(server: App) {
  // enable authentication
  server.use(
    loopback.token({
      model: server.models.AccountToken,
    }),
  );

  server.enableAuth();
};
