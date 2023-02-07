const Router = require('express');
const QuestionController = require('../controllers/questionsController')

const router = new Router();


router.post('/add',QuestionController.add);
router.get("/list",QuestionController.list);

module.exports = router;