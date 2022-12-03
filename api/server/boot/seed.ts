import { App, PersistedModelStatic } from '../../common/helpers/loopback';
import {
  Account,
  Role,
  RoleMapping,
  Contact,
  Tag,
  Blog,
  Feedback,
  CategoryProduct,
  Cart,
  CartClothes,
  Clothes,
  FavorisClothes
} from '../../codegen/api/fetch/api';

module.exports = function (app: App) {
  const withoutId = (it: any) => Object.assign({}, it, { id: undefined });

  const automigrate = (dataSource: string) => (model: string) => {
    return new Promise<PersistedModelStatic<any>>((resolve, reject) => {
      app.dataSources[dataSource].automigrate(model, function (err: Error) {
        if (err) {
          return reject(err);
        }
        resolve(app.models[model]);
      });
    });
  };

  const autoupdate = (dataSource: string) => (model: string) => {
    return new Promise<PersistedModelStatic<any>>((resolve, reject) => {
      app.dataSources[dataSource].autoupdate(model, function (err: Error) {
        if (err) {
          return reject(err);
        }
        resolve(app.models[model]);
      });
    });
  };
  // return;
  // auto update

  (async () => {
    const [
      ACL,
      AccountToken,
      RoleMapping,
      Role,
      Account,
      Tag,
      Blog,
      Contact,
      Feedback,
      CategoryProduct,
      Cart,
      CartClothes,
      Clothes,
      FavorisClothes

    ] = await Promise.all(
      [
        'ACL',
        'AccountToken',
        'RoleMapping',
        'Role',
        'Account',
        'Tag',
        'Blog',
        'Contact',
        'Feedback',
        'CategoryProduct',
        'Cart',
        'CartClothes',
        'Clothes',
        'FavorisClothes'
      ].map(
        process.env.NODE_ENV === 'production'
          ? autoupdate('postgres')
          : automigrate('postgres'),
      ),
    );

    // return;
    if (process.env.NODE_ENV === 'production') {
      return;
    }
    console.log('Seeding start...');

    const roles: Role[] = [
      { id: 1, name: 'SUPERADMIN', description: '' },
      { id: 2, name: 'ADMIN', description: '' },
      { id: 3, name: 'USER', description: '' },
      { id: 4, name: 'UNKNOWN', description: '' },
    ];

    for (const role of roles) {
      await Role.create(withoutId(role));
    }

    const accounts: Account[] = [];
    accounts.push({
      id: 1,
      username: `super-admin`,
      email: 'super-admin@bfast-vn.net',
      password: '1',
      firstName: 'Adams',
      lastName: 'Ansel',
      city: 1,
      district: 1,
      phoneNumber: 123456789
    } as Account);

    accounts.push({
      id: 2,
      username: `admin`,
      email: 'admin@bfast-vn.net',
      password: '1',
      firstName: 'Elizabeth',
      lastName: 'Queen',
      city: 1,
      district: 1,
      phoneNumber: 123456789

    } as Account);

    accounts.push({
      id: 3,
      username: `userstandard`,
      email: 'userstandard@bfast-vn.net',
      password: '1',
      firstName: 'Great',
      lastName: 'Britain',
      city: 1,
      district: 1,
      phoneNumber: 123456789

    } as Account);

    accounts.push({
      id: 4,
      username: `minhthanh`,
      email: 'minhthanh@bfast-vn.net',
      password: '1',
      firstName: 'Vu Minh',
      lastName: 'Thanh',
      city: 1,
      district: 1,
      phoneNumber: 123456789

    } as Account);

    accounts.push({
      id: 5,
      username: `thanh`,
      email: 'thanh@bfast-vn.net',
      password: '1',
      firstName: 'Minh',
      lastName: 'Thanh',
      city: 1,
      district: 1,
      phoneNumber: 123456789

    } as Account);



    for (let account of accounts) {
      const item = await Account.create(withoutId(account));

      const roleId = (() => {
        switch (item.id) {
          case 1:
            return 1;
          case 2:
            return 2;
          case 4:
            return 1;
          case 5:
            return 1;
          default:
            return 3;
        }
      })();

      const roleMapping: RoleMapping = {
        principalId: item.id,
        principalType: 'USER',
        roleId: roleId,
      };
      await RoleMapping.create(roleMapping);
    }

    console.log('Seeding end!!!');
  })().catch((e) => {
    console.log(e);
  });
};
