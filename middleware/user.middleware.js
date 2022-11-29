const User = require('../dataBase/User');
const ApiError = require('../error/ApiError');
const userValidator = require('../validator/user.validator');
const commonValidator = require('../validator/common.validator');

module.exports = {
    checkIsEmailExist: async (req, res, next) => {
        try {
            const {email} = req.body;

            if (!email) {
                throw new ApiError('email not present', 400);
            }

            const user = await User.findOne({email});

            if (user) {
                throw new ApiError('User with this email already exist', 409);
            }

            next()

        } catch (e) {
            next(e)
        }
    },
    getUserDynamically:(fieldName,from='body',dbField=fieldName)=> async (req, res, next) => {
        try {
            const fieldToSearch = req[from][fieldName];

            const user = await User.findOne({[dbField]: fieldToSearch});

            if (!user) {
                throw new ApiError('user not found', 404);
            }
            req.user = user;

            next();
        } catch (e) {
            next(e);
        }

    },

    isNewUserValid: async (req, res, next) => {
        try {

            const body = req.body;

            const validate = userValidator.newUserValidator.validate(body);
            if (validate.error) {
                throw new ApiError(validate.error.message, 400);
            }

            req.body = validate.value

            next();
        } catch (e) {
            next(e)
        }
    },

    isEditUserValid: async (req, res, next) => {
        try {

            const body = req.body;

            const validate = userValidator.editUserValidator.validate(body);
            if (validate.error) {
                throw new ApiError(validate.error.message, 400);
            }

            req.body = validate.value

            next();
        } catch (e) {
            next(e)
        }
    },
    isUserIdValid: async (req, res, next) => {
        try {
            const {userId} = req.params;

            const validate = commonValidator.idValidator.validate(userId);

            if (validate.error) {
                throw new ApiError(validate.error.message, 400);
            }

            next();
        } catch (e) {
            next(e);
        }
    }

}
