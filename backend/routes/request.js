var express = require( 'express' );
const userListing = require( '../controllers/request' );
var router = express.Router();

// GET USER Listing 
router.post( '/', userListing );
module.exports = router;
