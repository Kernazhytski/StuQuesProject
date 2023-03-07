const Router = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = new Router()


router.get('/getAllUsers',  userController.getAllUsers);
router.post('/editUser/:id', authMiddleware, userController.editProfile);

router.get('/:id', userController.getOneUser);
router.get('/banUser/:id', userController.banUser);
router.get('/unbannUser/:id', userController.unbannUser);

router.post('/getNick', userController.getNick);


module.exports = router