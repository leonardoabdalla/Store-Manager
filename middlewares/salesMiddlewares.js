const productIdSales = (req, res, next) => {
  const [productId2] = req.body;

  if (!productId2.productId) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  return next();
};

const quantitySales = (req, res, next) => {
  const [quantity2] = req.body;
  if (quantity2.quantity === undefined) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  const zero = 0;
  if (quantity2 <= zero) {
    return res
      .status(422)
      .json({ message: '"quantity" must be greater than or equal to 1' });
  }
  return next();
};

module.exports = {
  productIdSales,
  quantitySales,
};
