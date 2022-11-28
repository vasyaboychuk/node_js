const router = require('express').Router();

const {userController} = require('../controller');
const middleware = require('../middleware/user.middleware');

router.get('/', userController.getAllUsers);
router.post('/',middleware.isBodyValidCreate,middleware.userNormalizator,middleware.checkIsEmailExist, userController.create);

router.put('/:userId',middleware.isBodyValidUpdate,middleware.userNormalizator ,userController.updateUser);
router.get('/:userId',middleware.checkIsUserExist, userController.getUserById);
router.delete('/:userId',userController.deleteUser)


module.exports = router;