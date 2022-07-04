const connection = require('../db/connection');

const getAll = async () => {
  const conexaoDB = await connection.execute(`SELECT sp.sale_id AS saleId, 
    s.date, sp.product_id AS productId, sp.quantity
    FROM StoreManager.sales_products AS sp
    INNER JOIN StoreManager.sales AS s
    ON sp.sale_id = s.id
    INNER JOIN StoreManager.products AS p
    ON sp.product_id = p.id
    ORDER BY sp.sale_id ASC, sp.product_id`);
  return conexaoDB;
};

const getById = async (id) => {
  const conexaoBD = await connection.execute(
    `SELECT s.date, sp.product_id AS productId, 
    sp.quantity
    FROM StoreManager.sales_products AS sp
    INNER JOIN StoreManager.sales AS s
    ON sp.sale_id = s.id AND s.id = ?;`,
    [id],
  );
  return conexaoBD;
};

// const getByProductId = async (sale) => {

// }
const salesUpdate = async (id, { productId, quantity }) => {
  const [rows] = await connection.execute(
    `UPDATE StoreManager.sales_products
    SET quantity = ?
    WHERE sale_id = ? AND product_id = ?`,
    [quantity, id, productId],
  );

  return rows.affectedRows;
};

const addSale = async (sale) => {
  // console.log(sale);
  const queryInsert = 'INSERT INTO StoreManager.sales (date) VALUES (NOW())';
  const result = await connection.execute(queryInsert);
  const query = `
      INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) 
  VALUES ( ?, ?, ?);
    `;
  const resultado = await Promise.all(
    sale.map(async (infoProduct) =>
      await connection.execute(query, [result[0].insertId, infoProduct.productId, infoProduct.quantity])
    )
  );
  console.log('result ==> ', result);
  const queryId = 'SELECT id FROM StoreManager.sales ORDER BY id DESC LIMIT 1';
  console.log('resultado ==> ', resultado);
  
  const [id] = await connection.execute(queryId);
  console.log('id ==> ', id);
  console.log(result[0].insertId);
  return result[0].insertId;
};

const remove = async (id) => {
  const [quantityId] = await connection.execute(`SELECT (quantity) FROM
    StoreManager.sales_products
    WHERE StoreManager.sales_products.sale_id = ${id}`);
  // console.log('quantity => ', quantityId);
  const [salesProductsId] = await connection.execute(`SELECT (product_id) FROM
    StoreManager.sales_products
    WHERE StoreManager.sales_products.sale_id = ${id}`);
  // console.log('product_id => ', salesProductsId);
  await connection.execute(`UPDATE StoreManager.products
    SET quantity = StoreManager.products.quantity + ${quantityId[0].quantity}
    WHERE StoreManager.products.id = ${salesProductsId[0].product_id}`);
  await connection.execute('DELETE FROM StoreManager.sales WHERE id=?', [id]);
};

module.exports = {
  getAll,
  getById,
  salesUpdate,
  addSale,
  remove,
};