const Router = require('express');
const UserController = require('../controllers/userController')

const router = new Router();

router.post('/login');
router.post('/register',UserController.register);
router.post('/logout');
router.get('/activate/:link');
router.get('/refresh');

module.exports = router;