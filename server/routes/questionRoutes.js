const Router = require('express');
const QuestionController = require('../controllers/questionsController')

const authMiddleware = require('../middlewares/authMiddleware')

const router = new Router();



router.post('/add',authMiddleware,QuestionController.add);
router.get("/list",QuestionController.list);
router.get("/getQuestion/:id",QuestionController.getQues)
router.get("/getMyQuestion",QuestionController.getMy)
router.post('/addAnswer',authMiddleware,QuestionController.addAnswer);
router.post('/delete',authMiddleware,QuestionController.deleteQues);
router.post('/getAnswers',QuestionController.getAnswers);
router.post('/deleteAnswers',authMiddleware,QuestionController.deleteAnswers);
router.post('/setBestAnswer',authMiddleware,QuestionController.setBestAnswer);
router.get('/getMyAnswers',QuestionController.getMyAnswers)

module.exports = router;