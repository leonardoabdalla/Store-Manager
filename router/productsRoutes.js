const express = require('express');

const middleware = require('../middlewares/productsMiddlewares');

const productsController = require('../controllers/productsController');

const router = express.Router();

router.get('/', productsController.productsGetAll);
router.get('/:id', productsController.productsGetId);
router.post(
  '/',
  middleware.nameProducts,
  // middleware.quantityProducts,
  productsController.newProduct,
);
router.put('/:id', productsController.update);
router.delete('/:id', productsController.remove);

module.exports = router;
