import { Account } from "../../codegen/api/fetch/api";
import { LoopbackError } from "../helpers/error";
import { knex } from "../helpers/knex";
import { HttpContext, PersistedModelStatic } from "../helpers/loopback";
import { executeNativeSql } from "../helpers/native-sql";
import {
  sendResetPasswordEmail,
} from '../helpers/sendEmail';
import {
  NEW_PASSWORD_IS_DIFFERENT_FROM_OLD,
  NEW_PASSWORD_IS_DIFFERENT_FROM_OLD_MESSAGE,
  WEAK_PASSWORD_ERROR_MESSAGE,
  WEAK_PASSWORD_STATUS_CODE,
} from '../helpers/constants';

import { PasswordValidatorImpl } from '../helpers/PasswordValidatorHelper';
module.exports = function (Account: PersistedModelStatic<Account>) {
  const PasswordValidatorHelper = new PasswordValidatorImpl();
  // Account.beforeRemote("**", async (ctx: HttpContext<Account>) => {
  //   console.log("methodString: ", ctx.methodString);
  // });
  (Account as any).on('resetPasswordRequest', async (info: any) => {
    const Email = Account.app.models.Email;
    console.log(info)
    await sendResetPasswordEmail(Email, info);
  });

  (Account as any).beforeRemote('changePassword', async (ctx: any) => {
    let password = ctx.args.newPassword;
    let id = ctx.req.accessToken.userId;

    if (password) {
      const isValidPassword =
        PasswordValidatorHelper.validatePassword(password);
      if (!isValidPassword) {
        throw new LoopbackError(
          WEAK_PASSWORD_ERROR_MESSAGE,
          WEAK_PASSWORD_STATUS_CODE,
          WEAK_PASSWORD_ERROR_MESSAGE,
        );
      } else {
        let acc = await Account.app.models.Account.findOne({
          where: { id: id },
        });
        const hasPass = await acc.hasPassword(password);
        if (hasPass) {
          throw new LoopbackError(
            NEW_PASSWORD_IS_DIFFERENT_FROM_OLD_MESSAGE,
            WEAK_PASSWORD_STATUS_CODE,
            NEW_PASSWORD_IS_DIFFERENT_FROM_OLD,
          );
        }
      }
    }
  });

  (Account as any).getMe = async function (ctx: HttpContext<Account>) {

    const accessToken = ctx.req.accessToken;
    if (!accessToken) {
      throw new LoopbackError('Error logged-in user', 401);
    }
    const userId = accessToken.userId;
    const user = userId && (await Account.findById(userId, { include: 'roles' }));
    if (!user) {
      throw new LoopbackError('Error not user', 401);
    }
    return user;
  }

  Account.afterRemote("find", async (ctx: any) => {
    try {
      const pg = knex('account').count().toString();
      const data = await executeNativeSql(Account.app.dataSources.postgres.connector, pg, []);
      if (data && data.length > 0) {
        ctx.result = {
          data: ctx.result,
          total: Number(data[0].count)
        }
      }
    } catch (error) {
      console.log(error);
    }
  });

  (Account as any).changeRole = async function (ctx: any) {

    const accessToken = ctx.req.accessToken;
    if (!accessToken) {
      throw new LoopbackError('Error logged-in user', 401);
    };
    const userId = accessToken.userId;
    const user = userId && (await Account.findById(userId, {}));
    if (!user) {
      throw new LoopbackError('Error not user', 401);
    }
    const query = ctx.req.query;
    const { accountId, roleId } = JSON.parse(query.data);
    const CHANGE_ROLE = `
    UPDATE rolemapping
    SET roleid = ${roleId}
    WHERE principalid = '${accountId}'
    `
    executeNativeSql(Account.app.dataSources.postgres.connector, CHANGE_ROLE, []).then(() => {
      return true
    }).catch(() => {
      return false
    });
  };

  Account.afterRemote("create", async (ctx: any) => {
    try {
      const userId = ctx.result.id;
      const ADD_ROLE = `
      INSERT INTO rolemapping(principaltype,principalid,roleid)
      VALUES ('USER','${userId}',3) 
      `
      executeNativeSql(Account.app.dataSources.postgres.connector, ADD_ROLE, []).then(() => {

      }).catch(() => {
      });
    } catch (error) {
      console.log(error);
    }
  });

}