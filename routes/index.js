var express = require('express');
var router = express.Router();
var controller = require('../controllers/index.controller');

/* GET home page. */
router.get('/', controller.getHome);

//Detail
router.get('/detail/:id', controller.detail);

module.exports = router;
