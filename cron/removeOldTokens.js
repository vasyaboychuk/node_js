const {CronJob} = require('cron');
const dayjs = require('dayjs');
const Oauth = require("../dataBase/OAuth");
const utc = require('dayjs/plugin/utc');

dayjs.extend(utc);

module.exports = new CronJob(
    '* * * * * *',
    async function () {
        try {

            //subtract віднімає,тобто ми тут знацшли дату місяць назад
            const monthAgo = dayjs().utc().subtract(1, 'month');

            await Oauth.deleteMany({createdAt: {$lte: monthAgo}})

        } catch (e) {
            console.error(e)
        }
    },
);