const express = require('express');
const router = express.Router();

const validation = require('../middleware/validate');
const auth = require('../middleware/auth');

const usersController = require('../controllers/usersController')

router.get('/', auth.ensureAuth, usersController.getAllUsers);

router.get('/:id', auth.ensureAuth, usersController.getOneUser);

router.post('/', auth.ensureAuth, validation.saveUser, usersController.addUser);

router.put('/:id', auth.ensureAuth, validation.saveUser, usersController.updateUser);

router.delete('/:id', auth.ensureAuth, usersController.deleteUser);

module.exports = router;