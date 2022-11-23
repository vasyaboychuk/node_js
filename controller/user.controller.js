const userDb = require("../dataBase/users");

module.exports={
    getAllUsers: (req,res,next)=>{
        try{
            res.json(userDb);
        }catch (e){
            next(e)
        }

    },
    getUserById:(req,res,next)=>{
        try {
            res.json(req.user);
        }catch (e){
            next(e)
        }

    }

}