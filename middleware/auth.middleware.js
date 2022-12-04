const authValidator = require('../validator/auth.validator');
const ApiError = require("../error/ApiError");
const oathService = require("../service/oauth.service");
const OAuth = require("../dataBase/Oauth");
const {tokenTypeEnum} = require("../enum");

module.exports = {
    checkIsBodyValid: async (req, res, next) => {
        try {
            const validate = authValidator.loginValidator.validate(req.body);

            if (validate.error) {
                throw  new ApiError(validate.error.message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    checkAccessToken: async (req, res, next) => {
        try {
            const accessToken = req.get('Authorization');

            if (!accessToken) {
                throw new ApiError('no token', 401);
            }
            oathService.checkToken(accessToken);

            const tokenInfo = await OAuth.findOne({accessToken});

            if (!tokenInfo) {
                throw new ApiError('Token not valid',401)
            }

            req.tokenInfo=tokenInfo

            next();
        } catch (e) {
            next(e);
        }
    },
    checkRefreshToken: async (req, res, next) => {
        try {
            const refreshToken = req.get('Authorization');

            if (!refreshToken) {
                throw new ApiError('no token', 401);
            }
            oathService.checkToken(refreshToken,tokenTypeEnum.refreshType);

            const tokenInfo = await OAuth.findOne({refreshToken});

            if (!tokenInfo) {
                throw new ApiError('Token not valid',401)
            }
            req.tokenInfo=tokenInfo

            next();
        } catch (e) {
            next(e);
        }
    }

}