// const {CronJob} = require('cron');
// const dayjs = require('dayjs');
// const Tokens = require("../dataBase/OAuth");
// const Users=require('../dataBase/User')
// const utc = require('dayjs/plugin/utc');
//
// dayjs.extend(utc);
//
// module.exports = new CronJob(
//     '* 0 16 * * mon',
//     async function () {
//         try {
//
//             const weekAgo  = dayjs().utc().subtract(1, 'week');
//
//             const tokens = await Tokens.find({createdAt: {$lte: weekAgo}});
//             const users = Users.find();
//
//
//
//         } catch (e) {
//             console.error(e)
//         }
//     },
// );