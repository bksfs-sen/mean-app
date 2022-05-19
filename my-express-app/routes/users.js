var express = require('express');
var router = express.Router();
var Users = require('../controllers/userController')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/getUsers', Users.getUsers);
module.exports = router;