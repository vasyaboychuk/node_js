const {fileService} = require("../service");


module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await fileService.reader();
            res.json(users);
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

    }

}