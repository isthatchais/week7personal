const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');



router.use('/patients', require('./patientsRoute'));

router.use('/users', require('./usersRoute'));

router.use('/', require('./swagger'));

router.get("/", auth.ensureGuest, (req, res) => {
    res.render('login', {
        layout: 'login',
    })
})

router.get("/dashboard", auth.ensureAuth, (req, res) => {
    
    res.render('dashboard', {
        displayName: req.user.displayName
    })
})


module.exports = router;
