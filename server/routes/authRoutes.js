const Router = require('express');

const router = new Router();

router.post('/login');
router.post('/register');
router.post('/logout');
router.get('/activate/:link');
router.get('/refresh');

module.exports = router;