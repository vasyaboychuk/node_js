const oauthService = require("../service/oauth.service");
const emailService = require("../service/email.service");
const ActionToken = require('../dataBase/ActionToken');
const Oauth = require("../dataBase/Oauth");
const User = require('../dataBase/User');
const {WELCOME, FORGOT_PASS} = require("../config/email.actions.enum");
const {FORGOT_PASSWORD} = require("../config/token.actions.enum");
const {FRONTEND_URL} = require("../config/config");
module.exports = {
    login: async (req, res, next) => {
        try {
            const {user, body} = req;

            await emailService.sendEmail('boychuk98vasya@gmail.com', WELCOME, {userName: user.name})

            await oauthService.comparePasswords(user.password, body.password);

            const tokenPair = oauthService.generateAccessTokenPair({id: user._id});

            await Oauth.create({...tokenPair, _user_id: user._id})

            res.json({
                user,
                ...tokenPair
            })
        } catch (e) {
            next(e);
        }
    },
    forgotPassword: async (req, res, next) => {
        try {
            const user = req.user;
            const actionToken = oauthService.generateActionToken(FORGOT_PASSWORD, {email: user.email});

            const forgotPassFEUrl = `${FRONTEND_URL}/password/new?token=${actionToken}`;
            await ActionToken.create({token:actionToken,tokenType:FORGOT_PASSWORD,_user_id:user._id,})

            await emailService.sendEmail(user.email, FORGOT_PASS, {url: forgotPassFEUrl})

            res.json('ok');
        } catch (e) {
            next(e);
        }

    },
    setPasswordAfterForgot: async (req, res, next) => {
        try {
            const { user, body } = req;

            const hashPassword = await oauthService.hashPassword(body.password);

            await ActionToken.deleteOne({ token: req.get('Authorization') });
            await User.updateOne({ _id: user._id }, { password: hashPassword });


            res.json('ok');
        } catch (e) {
            next(e);
        }

    }

}