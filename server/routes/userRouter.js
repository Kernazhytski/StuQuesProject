const Router = require('express');
const userController = require('../controllers/userController');

const router = new Router()


router.get('getAllUsers', userController.getAllUsers)
router.get('getAllUsers/:id', userController.getOneuser)