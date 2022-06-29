const salesModel = require("../models/salesModel");
const productsModel = require("../models/productsModel");

const getAll = (id = null) => {
  if (id) {
    return salesModel.getById(id);
  }
  return salesModel.getAll();
};

const salesUpdate = async (id, itemUpdated) => {
  console.log(itemUpdated);
  await salesModel.salesUpdate(id, itemUpdated[0]);

  if (!itemUpdated[0].quantity || itemUpdated[0].quantity <= 0) {
    throw new Error("quantity is required");
  }
  if (Number.isInteger(itemUpdated[0].quantity) === false) {
    throw new Error("quantity is required");
  }
  const retorno = { saleId: +id, itemUpdated };
  return retorno;
};

const addSale = async (sale) => {
  const [product] = await productsModel.getById(sale[0].productId);
  // console.log(product);
  const sales = await salesModel.addSale(sale);
  if (sale[0].quantity > product[0].quantity) {
    throw new "error"();
  }
  // console.log('retorno => ', sales, 'enviado => ', sale);
  return sales;
};

const remove = (id) => salesModel.remove(id);

module.exports = {
  getAll,
  salesUpdate,
  addSale,
  remove,
};
