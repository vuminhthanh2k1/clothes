"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = require("../helpers/knex");
const native_sql_1 = require("../helpers/native-sql");
module.exports = function (Contact) {
    // Contact.beforeRemote("**", async (ctx: HttpContext<Contact>) => {
    //   console.log("methodString: ", ctx.methodString);
    // });
    Contact.afterRemote("find", async (ctx) => {
        try {
            const pg = (0, knex_1.knex)('contact').count().toString();
            const data = await (0, native_sql_1.executeNativeSql)(Contact.app.dataSources.postgres.connector, pg, []);
            if (data && data.length > 0) {
                ctx.result = {
                    data: ctx.result,
                    total: Number(data[0].count)
                };
            }
        }
        catch (error) {
            console.log(error);
        }
    });
};
//# sourceMappingURL=contact.js.map