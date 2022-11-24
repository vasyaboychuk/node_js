const router = require('express').Router();

const controller = require('../controller/user.controller');
const middleware = require('../middleware/user.middleware');

router.get('/', controller.getAllUsers);
router.post('/',middleware.checkIsEmailExist, controller.create);

router.put('/:userId', controller.updateUser);
router.get('/:userId',middleware.checkIsUserExist, controller.getUserById);
router.delete('/:userId',controller.deleteUser)


module.exports = router;