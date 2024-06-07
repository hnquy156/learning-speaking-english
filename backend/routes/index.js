const router = require('express').Router();

router.use('/chats', require('./chat'));
router.use('/dictionaries', require('./dictionary'));

module.exports = router;
