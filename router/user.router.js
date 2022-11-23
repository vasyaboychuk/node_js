const router = require('express').Router();
const userDb = require('dataBase/users');

router.get('/',(req,res)=>{
    res.json(userDb);
})
router.get('/:userId',(req,res)=>{
    const {userId} = req.params;

    res.json(userDb[userId]);

})

module.exports = router;