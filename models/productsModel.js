const connection = require('../db/connection');

const getAll = () =>
  connection.execute(
    "SELECT * FROM StoreManager" +
      ".products ORDER BY StoreManager.products.id ASC"
  );

const getById = async (id) => {
  const retornoBD = await connection.execute(
    `SELECT * FROM
    StoreManager.products WHERE id = ?`,
    [id]
  );
  return retornoBD;
};

const getByName = async (name) => {
  const [retornoBD] = await connection.execute(
    `SELECT * FROM 
    StoreManager.products WHERE name = ?`,
    [name]
  );
  return retornoBD;
};

const createNewProduct = async (name, quantity) => {
  const [row] = await connection.execute(
    `INSERT INTO
    StoreManager.products (name, quantity) VALUES (?, ?)`,
    [name, quantity]
  );
  const result = {
    id: row.insertId,
    name,
    quantity,
  };
  return result;
};

const update = async (name, quantity, id) => {
  const [result] = await connection.execute(
    `UPDATE StoreManager.
    products SET name=?, quantity=? WHERE id=?`,
    [name, quantity, id]
  );
  // console.log('modele => ', result);
  return result.affectedRows;
};

const remove = (id) =>
  connection.execute('DELETE FROM StoreManager.products WHERE id=?', [id]);

module.exports = {
  getAll,
  getById,
  getByName,
  createNewProduct,
  update,
  // updateSales,
  remove,
};
