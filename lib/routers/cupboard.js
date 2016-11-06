var router = require('express').Router(),
    business = require('../business/cupboard');

router.patch('/:code/open', (req, res) => {
    business.open(req, res);
});

module.exports = router; 