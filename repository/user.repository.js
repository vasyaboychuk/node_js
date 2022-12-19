const User = require('../dataBase/User');

module.exports = {
    find: async (query) => {
        const {limit = 10, page = 1, name} = query;

        let findObj = {};
        if (name) {
            findObj = {
                ...findObj,
                name: {$regex: name}//це те саме ніби ми в файнд писали пошуковий фільтр
            }
        }
        

        // const users = await User.find(findObj).limit(limit).skip((+page - 1) * limit);
        // const count = await User.count(findObj);
        //можна так написати бо вони мають виконатися одночасно
        const [users, count] = await Promise.all([
                User.find(findObj).limit(limit).skip((+page - 1) * limit),
                User.count(findObj)
            ])
        ;
        return {
            users,
            page: +page,
            count
        }
    }
}