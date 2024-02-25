var express = require('express');
const getHomePage = require( '../controllers/oauth' );
var router = express.Router();

/* GET home page. */
router.get('/',getHomePage);

module.exports = router;
