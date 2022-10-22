import { Contact, Feedback } from "../../codegen/api/fetch/api";
import { knex } from "../helpers/knex";
import { PersistedModelStatic } from "../helpers/loopback";
import { executeNativeSql } from "../helpers/native-sql";

module.exports = function (Feedback: PersistedModelStatic<Feedback>) {
  // Contact.beforeRemote("**", async (ctx: HttpContext<Contact>) => {
  //   console.log("methodString: ", ctx.methodString);
  // });



  Feedback.afterRemote("find", async (ctx: any) => {
    try {
      const pg = knex('feedback').count().toString();
      const data = await executeNativeSql(Feedback.app.dataSources.postgres.connector, pg, []);
      if (data && data.length > 0) {
        ctx.result = {
          data: ctx.result,
          total: Number(data[0].count)
        }
      }
    } catch (error) {
      console.log(error);
    }
  })


}