const productsModel = require('../models/productsModel');

const getAll = (id = null) => {
  if (id) {
    return productsModel.getById(id);
  }
  return productsModel.getAll();
};

const add = async ({ name }) => {
  const [rows] = await productsModel.getByName(name);
  const result = await productsModel.createNewProduct(name);
  if (rows !== undefined) {
    throw new Error('mensagem teste');
  }
  return result;
};

const update = async (name, quantity, id) => {
  const [rows] = await productsModel.getById(id);
  if (rows.length === 0) {
    throw new Error('Product not found');
  }
  await productsModel.update(name, quantity, id);
  const newProductUpdate = {
    id: rows[0].id,
    name,
    quantity,
  };
  return newProductUpdate;
};

const remove = (id) => productsModel.remove(id);

module.exports = {
  getAll,
  add,
  update,
  remove,
};
