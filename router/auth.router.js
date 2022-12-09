const router = require('express').Router();

const controller = require('../controller/auth.controller');
const middleware = require('../middleware/auth.middleware');
const userMiddleware = require('../middleware/user.middleware');

router.post('/login', middleware.checkIsBodyValid, userMiddleware.getUserDynamically('email'), controller.login);

router.post('/password/forgot',userMiddleware.getUserDynamically('email'),controller.forgotPassword)
router.put('/password/forgot',middleware.checkActionToken,controller.setPasswordAfterForgot)



module.exports = router;
