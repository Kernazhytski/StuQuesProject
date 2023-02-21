const Router = require('express');
const QuestionController = require('../controllers/questionsController')

const authMiddleware = require('../middlewares/authMiddleware')

const router = new Router();



router.post('/add',authMiddleware,QuestionController.add);
router.get("/list",authMiddleware,QuestionController.list);
router.get("/getQuestion/:id",authMiddleware,QuestionController.getQues)
router.get("/getMyQuestion",authMiddleware,QuestionController.getMy)
router.post('/addAnswer',authMiddleware,QuestionController.addAnswer);

module.exports = router;