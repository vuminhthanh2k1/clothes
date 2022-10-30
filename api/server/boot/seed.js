"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = function (app) {
    const withoutId = (it) => Object.assign({}, it, { id: undefined });
    const automigrate = (dataSource) => (model) => {
        return new Promise((resolve, reject) => {
            app.dataSources[dataSource].automigrate(model, function (err) {
                if (err) {
                    return reject(err);
                }
                resolve(app.models[model]);
            });
        });
    };
    const autoupdate = (dataSource) => (model) => {
        return new Promise((resolve, reject) => {
            app.dataSources[dataSource].autoupdate(model, function (err) {
                if (err) {
                    return reject(err);
                }
                resolve(app.models[model]);
            });
        });
    };
    return;
    // auto update
    (async () => {
        const [ACL, AccountToken, RoleMapping, Role, Account, Tag, Blog, Contact, Feedback, CategoryProduct, Product, Order, OrderProduct, Banner] = await Promise.all([
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
            'Product',
            'Order',
            'OrderProduct',
            'Banner'
        ].map(process.env.NODE_ENV === 'production'
            ? autoupdate('postgres')
            : automigrate('postgres')));
        // return;
        if (process.env.NODE_ENV === 'production') {
            return;
        }
        console.log('Seeding start...');
        const roles = [
            { id: 1, name: 'SUPERADMIN', description: '' },
            { id: 2, name: 'ADMIN', description: '' },
            { id: 3, name: 'USER', description: '' },
            { id: 4, name: 'UNKNOWN', description: '' },
        ];
        for (const role of roles) {
            await Role.create(withoutId(role));
        }
        const accounts = [];
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
        });
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
        });
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
        });
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
        });
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
        });
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
            const roleMapping = {
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
//# sourceMappingURL=seed.js.map