const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const ApiError = require("../error/ApiError");
const {tokenTypeEnum} = require("../enum");
const {
    ACCESS_SECRET,
    REFRESH_SECRET,
    CONFIRM_ACCOUNT_ACTION_TOKEN_SECRET,
    FORGOT_PASSWORD_ACTION_TOKEN_SECRET
} = require("../config/config");
const {FORGOT_PASS} = require("../config/email.actions.enum");
const tokenTypes = require('../config/token.actions.enum');

module.exports = {
    hashPassword: (password) => bcrypt.hash(password, 10),

    comparePasswords: async (hashPassword, password) => {
        const isPasswordsSame = await bcrypt.compare(password, hashPassword);

        if (!isPasswordsSame) {
            throw new ApiError('Wrong email or password', 400)
        }
    },
    generateAccessTokenPair: (dataToSign = {}) => {
        const accessToken = jwt.sign(dataToSign, 'secretWord', {expiresIn: '15m'});
        const refreshToken = jwt.sign(dataToSign, 'secretWordRefresh', {expiresIn: '30d'});

        return {
            accessToken,
            refreshToken
        }
    },
    // checkToken: (token = '', tokenType = tokenTypeEnum.accessType) => {
    //     try {
    //         let secret = '';
    //         if (tokenType === tokenTypeEnum.accessType) secret = ACCESS_SECRET;
    //         else if (tokenType === tokenTypeEnum.refreshType) secret = REFRESH_SECRET;
    //
    //         return jwt.verify(token, secret)
    //
    //     } catch (e) {
    //         throw new ApiError('Token not valid', 401)
    //     }
    //
    // },
    generateActionToken: (actionType, dataToSign = {}) => {
        let secretWord = '';

        switch (actionType) {
            case tokenTypes.CONFIRM_ACCOUNT:
                secretWord = CONFIRM_ACCOUNT_ACTION_TOKEN_SECRET;
                break;
            case tokenTypes.FORGOT_PASSWORD:
                secretWord = FORGOT_PASSWORD_ACTION_TOKEN_SECRET;
                break;
        }
        return jwt.sign(dataToSign, secretWord, {expiresIn: '7d'})


    },
    checkActionToken: (token, actionType) => {
        try {
            let secretWord = '';

            switch (actionType) {
                case tokenTypes.CONFIRM_ACCOUNT:
                    secretWord = CONFIRM_ACCOUNT_ACTION_TOKEN_SECRET;
                    break;
                case tokenTypes.FORGOT_PASSWORD:
                    secretWord = FORGOT_PASSWORD_ACTION_TOKEN_SECRET;
                    break;


            }
            jwt.verify(token,secretWord)

        } catch (e){
            throw new ApiError('Token not valid', 401)
        }
    }
}