const productIdSales = (req, res, next) => {
  const productId = req.body[0].productId;
  if (!productId) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  return next();
};

const quantitySales = (req, res, next) => {
    const quantity = req.body[0].quantity;
  if (quantity === undefined) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  const zero = 0;
  if (quantity <= zero) {
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
