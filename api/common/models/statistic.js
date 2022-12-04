"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = function (Statistic) {
    Statistic.statisticClothes = async function (ctx) {
        const year = ctx.req.query.year;
        const Cart = Statistic.app.models.Cart;
        const CartClothes = Statistic.app.models.CartClothes;
        const Clothes = Statistic.app.models.Clothes;
        let dayOfFeburary = 0;
        if (year % 4 == 0) {
            dayOfFeburary = 29;
        }
        else {
            dayOfFeburary = 28;
        }
        let resp = [];
        // let monthJanurary = await Statistic.find({
        //   where: {
        //     and: [
        //       { createdAt: { gt: new Date(year, 0, 1) } },
        //       { createdAt: { lt: new Date(year, 0, 31) } },
        //     ],
        //   },
        //   include: {
        //     relation: "cart",
        //     scope: {
        //       include: {
        //         relation: "cartClothes",
        //       },
        //     },
        //   },
        // }).then((result) => {
        //   return result
        //   // console.log(result);
        // });
        await Statistic.find({
            // where: {
            //   and: [
            //     { createdAt: { gt: new Date(year, 0, 1) } },
            //     { createdAt: { lt: new Date(year, 0, 31) } },
            //   ],
            // },
            include: {
                relation: "cart",
                scope: {
                    include: {
                        relation: "cartClothes",
                    },
                },
            },
        }).then((result) => {
            console.log("result", result);
            // console.log(result);
        });
        let monthFeburary = await Statistic.find({
            where: {
                and: [
                    { createdAt: { gt: new Date(year, 1, 1) } },
                    { createdAt: { lt: new Date(year, 1, dayOfFeburary) } },
                ],
            },
        });
        let monthMatch = await Statistic.find({
            where: {
                and: [
                    { createdAt: { gt: new Date(year, 2, 1) } },
                    { createdAt: { lt: new Date(year, 2, 31) } },
                ],
            },
        });
        let monthApril = await Statistic.find({
            where: {
                and: [
                    { createdAt: { gt: new Date(year, 3, 1) } },
                    { createdAt: { lt: new Date(year, 3, 30) } },
                ],
            },
        });
        let monthMay = await Statistic.find({
            where: {
                and: [
                    { createdAt: { gt: new Date(year, 4, 1) } },
                    { createdAt: { lt: new Date(year, 4, 31) } },
                ],
            },
        });
        let monthJune = await Statistic.find({
            where: {
                and: [
                    { createdAt: { gt: new Date(year, 5, 1) } },
                    { createdAt: { lt: new Date(year, 5, 30) } },
                ],
            },
        });
        let monthJuly = await Statistic.find({
            where: {
                and: [
                    { createdAt: { gt: new Date(year, 6, 1) } },
                    { createdAt: { lt: new Date(year, 6, 31) } },
                ],
            },
        });
        let monthAugust = await Statistic.find({
            where: {
                and: [
                    { createdAt: { gt: new Date(year, 7, 1) } },
                    { createdAt: { lt: new Date(year, 7, 31) } },
                ],
            },
        });
        let monthSeptember = await Statistic.find({
            where: {
                and: [
                    { createdAt: { gt: new Date(year, 8, 1) } },
                    { createdAt: { lt: new Date(year, 8, 30) } },
                ],
            },
        });
        let monthOctober = await Statistic.find({
            where: {
                and: [
                    { createdAt: { gt: new Date(year, 9, 1) } },
                    { createdAt: { lt: new Date(year, 9, 31) } },
                ],
            },
        });
        let monthNovember = await Statistic.find({
            where: {
                and: [
                    { createdAt: { gt: new Date(year, 10, 1) } },
                    { createdAt: { lt: new Date(year, 10, 30) } },
                ],
            },
        });
        let monthDecember = await Statistic.find({
            where: {
                and: [
                    { createdAt: { gt: new Date(year, 11, 1) } },
                    { createdAt: { lt: new Date(year, 11, 31) } },
                ],
            },
        });
        return [];
    };
};
//# sourceMappingURL=statistic.js.map