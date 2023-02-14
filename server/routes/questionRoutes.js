const Router = require('express');
const QuestionController = require('../controllers/questionsController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = new Router();


router.post('/addQuestion', authMiddleware, QuestionController.add);
router.get('/getAllQuestions', authMiddleware, QuestionController.list);
router.get('/getMyQuestions', authMiddleware, QuestionController.list);

module.exports = router;