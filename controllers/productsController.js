const productsServices = require('../services/productsService');

const productsGetAll = async (req, res) => {
  try {
    const [rows] = await productsServices.getAll();
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const productsGetId = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await productsServices.getAll(id);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    } 
    res.status(200).json(...rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'erro interno' });
  }
};

const newProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const result = await productsServices.add({ name, quantity });
    res.status(201).json(result);
  } catch (err) {
    res.status(409).json({ message: 'Product already exists' });
  }
};

const update = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const { id } = req.params;
    const result = await productsServices.update(name, quantity, id);
    // console.log('controler => ', result);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await productsServices.getAll(id);
    if (rows.length === 0) {  
      return res.status(404).json({ message: 'Product not found' });
    }  
    await productsServices.remove(id);
    res.status(204).end();
  } catch (err) {
    res.status(500).end();
  }
};

module.exports = {
  productsGetAll,
  productsGetId,
  newProduct,
  update,
  remove,
};
