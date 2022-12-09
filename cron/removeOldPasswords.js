const {CronJob} = require('cron');
const dayjs = require('dayjs');
const OldPassword = require("../dataBase/OldPassword");
const utc = require('dayjs/plugin/utc');

dayjs.extend(utc);

module.exports = new CronJob(
    '0   * * * * *',
    async function () {
        try {

            //subtract віднімає,тобто ми тут знацшли дату місяць назад
            const yearAgo = dayjs().utc().subtract(1, 'year');

            await OldPassword.deleteMany({createdAt: {$lte: yearAgo }})

        } catch (e) {
            console.error(e)
        }
    },
);