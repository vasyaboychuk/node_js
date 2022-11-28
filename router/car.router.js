const router = require('express').Router();

const {carController} = require('../controller/');


router.get('/', carController.getAllCars);
router.post('/', carController.createCar);

router.get('/:carId',carController.findOne);
// router.get('/:carId', controller.getCarById);
// router.delete('/:carId',controller.deleteCar)


module.exports = router;