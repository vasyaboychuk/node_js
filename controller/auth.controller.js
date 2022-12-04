const oauthService = require("../service/oauth.service");
const Oauth = require("../dataBase/Oauth");
const emailService = require("../service/email.service");
const {SECOND_BLOCK} = require("../config/email-actions.enum");
module.exports = {
    login: async (req, res, next) => {
        try {
            const {user, body} = req;

            await emailService.sendEmail('boychuk98vasya@gmail.com',SECOND_BLOCK,{user:'Vasya'})

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
    }

}