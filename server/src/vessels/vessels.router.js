var express = require('express');
var router = express.Router();

var VesselsController = require('./vessels.controller');

router.get('/', VesselsController.getAll)
router.get('/:id', VesselsController.getById)
router.post('/', VesselsController.arriveAtDoc)
router.put('/:id', VesselsController.leaveDoc)
router.delete('/', VesselsController.leaveDoc)

module.exports = router;