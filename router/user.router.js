const router = require('express').Router();

const controller = require('../controller/user.controller');
const middleware = require('../middleware/user.middleware');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/', controller.getAllUsers);
router.post('/',middleware.isNewUserValid,middleware.checkIsEmailExist, controller.create);

router.put(
    '/:userId',
    middleware.isUserIdValid,
    middleware.isEditUserValid,
    middleware.getUserDynamically('userId','params','_id'),
    controller.updateUser
);
router.get(
    '/:userId',
    middleware.isUserIdValid,
    authMiddleware.checkAccessToken,
    middleware.getUserDynamically('userId','params','_id'),
    controller.getUserById
);
router.delete('/:userId',authMiddleware.checkAccessToken,controller.deleteUser)


module.exports = router;