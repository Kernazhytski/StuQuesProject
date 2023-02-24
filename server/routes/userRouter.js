const Router = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = new Router()


router.get('/getAllUsers', authMiddleware, userController.getAllUsers);
router.post('/editUser/:id', authMiddleware, userController.editProfile);
router.get('/:id', userController.getOneuser);
router.post('/getNick', userController.getNick);

module.exports = router