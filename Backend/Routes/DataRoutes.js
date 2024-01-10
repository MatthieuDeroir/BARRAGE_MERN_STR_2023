const express = require('express');
const router = express.Router();
const dataController = require('../Controllers/DataController');

// Définition des routes pour les datas
router.post('/', dataController.addData);
router.get('/', dataController.getDatas);
router.delete('/:id', dataController.deleteData);
router.put('/', dataController.updateDatas);

module.exports = router;
