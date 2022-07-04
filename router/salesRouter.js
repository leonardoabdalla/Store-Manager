const express = require('express');

const salesController = require('../controllers/salesControler');
const salesMiddwares = require('../middlewares/salesMiddlewares');

const router = express.Router();

router.get('/', salesController.salesGetAll);
router.get('/:id', salesController.salesGetId);
router.put('/:id', salesController.salesUpdate);
router.post('/', salesMiddwares.productIdSales,
  salesMiddwares.quantitySales, salesController.addSale);
router.delete('/:id', salesController.remove);

module.exports = router;
