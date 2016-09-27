'use strict';

import express from 'express';

const router = express.Router();

/* GET home page. */

router.get('/', (req, res) => {
    res.render('index', {
        title: 'Low Poly Cloud Demo'
    });
});

module.exports = router;