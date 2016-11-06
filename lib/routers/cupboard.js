var router = require('express').Router(),
    business = require('../business/cupboard');

router.patch('/:code/open', (req, res) => {
    business.open(req, res);
});

router.patch('/:code/release', (req, res) => {
    business.release(req, res);
})

module.exports = router; 