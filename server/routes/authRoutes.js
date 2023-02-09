const Router = require('express');
const AuthController = require('../controllers/authController');
//const {body} = require('express-validator');

const router = new Router();


router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.post('/logout', AuthController.logout);
router.get('/activate/:link', AuthController.activate);
router.get('/refresh', AuthController.refresh);


module.exports = router;