const express = require('express');
const router = express.Router();
const potController = require('../controller/potController');

router.post('/potAdmin', potController.addPot);
router.get('/getAllPots', potController.getAllPots);
router.put('/updatePot/:id', potController.updatePot);
router.delete('/deletePot/:id', potController.deletePot);

module.exports = router;
