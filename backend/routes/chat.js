const { ChatController } = require('../controllers');

const router = require('express').Router();

router.get('/', ChatController.getChats);
router.get('/:id', ChatController.getChat);
router.post('/', ChatController.updateChat);
router.delete('/:id', ChatController.deleteChat);

module.exports = router;
