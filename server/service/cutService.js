

module.exports = function (list,res,page,limit)  {
    const resposeQuestions = list.slice((+page - 1) * +limit, ((+page - 1) * +limit) + +limit);
    res.setHeader('Access-Control-Expose-Headers', 'x-total-count')
    res.setHeader('x-total-count', list.length);
    res.send(resposeQuestions).json
}