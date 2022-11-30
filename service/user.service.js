const User = require('../dataBase/User');

module.exports = {
    findByParams: async (filter = {}) => {
        return User.find(filter)
    },
    findOneByParams: async (filter={}) => {
        return User.findOne(filter)
    },

    findByIdWithCars: async (userId) => {
        const info=await User.aggregate([
            {
                $match: {_id: userId},
            },
            {
                $lookup:{
                    from: 'cars',
                    localField: '_id',
                    foreignField: 'user',
                    as:'cars'
                }
            }
        ]);
        return info[0];
    },
    updateOne: async (userId, newInfo) => {
        return User.findByIdAndUpdate(userId, newInfo,{new:true})
    },
    create: async (userInfo) => {
        return User.create(userInfo)
    },
    deleteOne: async (userId) => {
        return User.deleteOne({_id: userId})
    },

}