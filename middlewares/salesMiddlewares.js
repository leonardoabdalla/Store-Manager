const productIdSales = (req, res, next) => {
  const { productId } = req.body;
  if (productId === undefined) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  return next();
};

const quantitySales = (req, res, next) => {
  const { quantity } = req.body;
  if (!quantity) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  if (quantity <= 0) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  return next();
};

module.exports = {
  productIdSales,
  quantitySales,
};
