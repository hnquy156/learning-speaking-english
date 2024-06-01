const router = require('express').Router();

router.use('/chats', require('./chat'));

module.exports = router;
