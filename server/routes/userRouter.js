const router = require('express').Router();
const userController = require('../controller/userController');

router.post('/singup', userController.register);
router.post('/login', userController.login);

module.exports = router; 