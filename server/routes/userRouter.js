const router = require('express').Router();
const userController = require('../controller/userController');
// const { check, validationResult } = require('express-validator');

router.post('/singup', userController.register);

module.exports = router; 