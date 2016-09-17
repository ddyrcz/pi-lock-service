var router = require('express').Router();

router.post('/cupboards/:code/open', (req, res) => {
    // check is the cupborad available
    // 200 if so
    // 423 else
    res.end(req.params.code);
});

module.exports = router; 