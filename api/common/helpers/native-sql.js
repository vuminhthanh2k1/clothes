"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeNativeSql = void 0;
async function executeNativeSql(connector, sql, params) {
    return new Promise((resolve, reject) => {
        connector.execute(sql, params, function (error, rows) {
            if (error) {
                reject(error);
            }
            else {
                resolve(rows);
            }
        });
    }).catch(error => {
        console.log(error);
    });
}
exports.executeNativeSql = executeNativeSql;
//# sourceMappingURL=native-sql.js.map