const router = require('express').Router();

router.use('/chats', require('./chat'));
router.use('/dictionaries', require('./dictionary'));
router.use('/words', require('./word'));

module.exports = router;
