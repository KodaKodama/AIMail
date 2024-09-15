const router = require('express').Router();
const userController = require('../controller/userController');
const isAuthenticated = require('../middlewares/isAuth');

router.post('/singup', userController.register);
router.post('/login', userController.login);

module.exports = router; 