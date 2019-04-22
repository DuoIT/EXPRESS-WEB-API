var express = require('express');
var router = express.Router();
var controller = require('../controllers/user.controller');

/* GET detail page */ 

router.post('/signup',controller.postSignUp);
router.post('/signin',controller.postSignIn )

module.exports = router;



