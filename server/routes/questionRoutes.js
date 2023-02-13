const Router = require('express');
const QuestionController = require('../controllers/questionsController')

const router = new Router();


router.post('/add',QuestionController.add);
router.get("/list",QuestionController.list);
router.get("/getQuestion/:id",QuestionController.getQues)

module.exports = router;