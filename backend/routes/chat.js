const { ChatController } = require('../controller');

const router = require('express').Router();

router.get('/', ChatController.getChats);

module.exports = router;
