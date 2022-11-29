const User = require("../dataBase/User");
const oauthService = require("../service/oauth.service");

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await User.find();
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

            await User.findByIdAndUpdate(userId, newUserInfo)
            res.json('updated');
        } catch (e) {
            next(e)
        }
    },
    create: async (req, res, next) => {
        try {

            const hashPassword = await oauthService.hashPassword(req.body.password);

            const newUser = await User.create({...req.body, password: hashPassword});

            res.status(201).json(newUser)
        } catch (e) {
            next(e)
        }
    },
    deleteUser: async (req, res, next) => {
        try {
            const userId = req.params.userId;

            await User.findByIdAndDelete(userId);
            res.json('deleted')
        } catch (e) {
            next(e)
        }
    }

}