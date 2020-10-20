var express = require('express');
var router = express.Router();

var VesselsController = require('./vessels.controller');

router.get('/', VesselsController.getAll)
router.post('/', VesselsController.arriveAtDoc)
router.delete('/', VesselsController.leaveDoc)

module.exports = router;