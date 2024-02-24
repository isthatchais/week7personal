const express = require('express');

const router = express.Router();

router.use('/patients', require('./patientsRoute'));

router.use('/', require('./swagger'));

module.exports = router;
