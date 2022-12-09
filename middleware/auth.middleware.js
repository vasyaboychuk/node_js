const authValidator = require('../validator/auth.validator');
const ApiError = require("../error/ApiError");
const oauthService = require('../service/oauth.service');
const {FORGOT_PASSWORD} = require("../config/token.actions.enum");
const ActionToken = require('../dataBase/ActionToken');

module.exports={
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
    checkActionToken:async(req,res,next)=>{
    try{
        const actionToken = req.get('Authorization');

        if (!actionToken) {
            throw new ApiError('No token', 401);
        }
        oauthService.checkActionToken(actionToken, FORGOT_PASSWORD);
        const tokenInfo = await ActionToken
            .findOne({token: actionToken, tokenType: FORGOT_PASSWORD})
            .populate('_user_id');

        if (!tokenInfo) {
            throw new ApiError('Token not valid', 401);
        }
        req.user = tokenInfo._user_id;

        next();
     }catch(e){
       next(e);
     }

    }

}