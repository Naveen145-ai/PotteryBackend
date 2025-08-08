const expresscon = require('express');
const router = expresscon.Router();

const potController = require('../controller/potController');

router.post('/potAdmin', potController.potAdmin);
router.get('/getAllPots', potController.getAllPots);
router.put('/updatePot/:id', potController.updatePot);
router.delete('/deletePot/:id', potController.deletePot);

module.exports = router;