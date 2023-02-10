const Router = require('express');
const QuestionController = require('../controllers/questionsController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = new Router();


router.post('/add', authMiddleware, QuestionController.add);
router.get('/list', QuestionController.list);

module.exports = router;