const salesService = require('../services/salesServices');

const salesGetAll = async (req, res) => {
  try {
    const [rows] = await salesService.getAll();
    res.status(200).json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'erro interno' });
  }
};

const salesGetId = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await salesService.getAll(id);
    if (rows.length === 0)
      return res.status(404).json({ message: 'Sale not found' });
    res.status(200).json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'erro interno' });
  }
};

const salesUpdate = async (req, res, next) => {
  console.log(req);
  try {
    const { id } = req.params;
    const itemUpdated = req.body;
    const json = await salesService.salesUpdate(id, itemUpdated);
    res.status(200).json(json);
  } catch (err) {
    next(err);
  }
};

const addSale = async (req, res) => {
  try {
    const sales = req.body;
    const rows = await salesService.addSale(sales);
    const result = {
      id: rows,
      itemsSold: sales.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
    };
    res.status(201).json(result);
  } catch (err) {
    res.status(422).json({ message: 'Such amount is not permitted to sell' });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await salesService.getAll(id);
    if (rows.length === 0)
      return res.status(404).json({ message: 'Sale not found' });
    await salesService.remove(id);
    res.status(204).end();
  } catch (err) {
    res.status(500).end();
  }
};

module.exports = {
  salesGetAll,
  salesGetId,
  salesUpdate,
  addSale,
  remove,
};
