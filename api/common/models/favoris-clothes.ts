import { FavorisClothes } from "../../codegen/api/fetch/api";
import { knex } from "../helpers/knex";
import { PersistedModelStatic } from "../helpers/loopback";
import { executeNativeSql } from "../helpers/native-sql";

module.exports = function (FavorisClothes: PersistedModelStatic<FavorisClothes>) {
  
  FavorisClothes.afterRemote("find", async (ctx: any) => {
    try {
      const pg = knex('favorisclothes').count().toString();
      const data = await executeNativeSql(FavorisClothes.app.dataSources.postgres.connector, pg, []);
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