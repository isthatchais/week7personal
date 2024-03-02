const express = require('express');
const router = express.Router();

const validation = require('../middleware/validate');
const auth = require('../middleware/auth');

const patientsController = require('../controllers/patientsController')

router.get('/', auth.ensureAuth, patientsController.getAllPatients);

router.get('/:id',auth.ensureAuth, patientsController.getOnePatient);

router.post('/', auth.ensureAuth, validation.savePatient, patientsController.addPatient);

router.put('/:id', auth.ensureAuth, validation.savePatient, patientsController.updatePatient);

router.delete('/:id', auth.ensureAuth, patientsController.deletePatient);

module.exports = router;
