const {userService} = require("../service");

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await userService.findByParams();

            res.json(users)
        } catch (e) {
            next(e)
        }

    },
    getUserById: (req, res, next) => {
        try {
            res.json(req.user);
        } catch (e) {
            next(e)
        }

    },
    updateUser: async (req, res, next) => {
        try {
            const newUserInfo = req.body;
            const userId = req.params.userId;

            const user = await userService.updateOne(userId, newUserInfo);

            res.status(201).json(user);
        } catch (e) {
            next(e)
        }
    },
    create: async (req, res, next) => {
        try {
            await userService.create(req.body)
            res.json('ok')
        } catch (e) {
            next(e)
        }
    },
    deleteUser: async (req, res, next) => {
        try {
            const userId = req.params.userId;

            await userService.deleteOne(userId);
            res.json('deleted')
        } catch (e) {
            next(e)
        }
    }

}