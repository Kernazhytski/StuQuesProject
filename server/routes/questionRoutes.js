const Router = require('express');
const QuestionController = require('../controllers/questionsController')

const router = new Router();



router.post('/add',authMiddleware,QuestionController.add);
router.get("/list",authMiddleware,QuestionController.list);
router.get("/getQuestion/:id",authMiddleware,QuestionController.getQues)


module.exports = router;