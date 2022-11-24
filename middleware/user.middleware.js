const User = require('../dataBase/User');
const ApiError = require('../error/ApiError');

module.exports={
    checkIsUserExist: async (req, res, next) => {
        try {
            const {userId} = req.params;
            const user = await User.find(userId);

            if (!user) {
                throw new ApiError('user not found', 404);
            }
            req.user = user;
            next()

        } catch (e) {
            next(e)
        }

    },
    checkIsEmailExist:async(req,res,next)=>{
        try{
            const {email} = req.body;

            if (!email){
                throw new ApiError('email not present', 400);
            }

            const user = await User.findOne({email});

            if (user) {
                throw new ApiError('User with this email already exist', 409);
            }

            next()

        }catch (e){
            next(e)
        }
    }
}