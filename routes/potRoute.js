const expresscon = require('express');
const router = expresscon.Router();

const potController = require('../controller/potController');

router.post('/potAdmin', potController.potAdmin);

module.exports = router;