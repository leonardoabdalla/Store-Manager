const nameProducts = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }
  if (name.length < 5) {
    return res.status(422).json({
      message: '"name" length must be at least 5 characters long',
    });
  }
  return next();
};

// const quantityProducts = (req, res, next) => {
//   const { quantity } = req.body;
//   if (!quantity) {
//     return res.status(400).json({ message: '"quantity" is required' });
//   }
//   if (quantity <= 0) {
//     return res
//       .status(422)
//       .json({ message: '"quantity" must be greater than or equal to 1' });
//   }
//   if (Number.isInteger(quantity) === false) {
//     return res
//       .status(422)
//       .json({ message: '"quantity" must be greater than or equal to 1' });
//   }
//   return next();
// };

module.exports = {
  nameProducts,
  // quantityProducts,
};
