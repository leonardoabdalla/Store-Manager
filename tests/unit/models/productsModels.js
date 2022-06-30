const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../db/connection');
const productsModel = require('../../../models/productsModel');

describe('Testando a camada de models dos prdutos', () => {
  describe('Testando getAll', () => {
    before(async () => {
      const products = [
        {
          id: 2,
          name: 'Traje de encolhimento',
          quantity: 20,
        },
        {
          id: 3,
          name: 'Escudo do Capitão América',
          quantity: 30,
        },
      ];

      sinon.stub(connection, 'execute').resolves([products]);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('Verifica retorno getAll', async () => {
      const [row] = await productsModel.getAll();
      expect(row).to.not.be.empty;
    });

    it('Verifica se o retorno de getAll é um array', async () => {
      const [row] = await productsModel.getAll();
      expect(row).to.be.a("array");
    });
  });
  describe('Resgata um produto por ID utilizando a função getById', () => {
    const id = 2;
    before(async () => {
      const products = {
        id: 2,
        name: 'Traje de encolhimento',
        quantity: 20,
      };

      sinon.stub(connection, 'execute').resolves([products]);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('Verifica resposta ao retorno da getById', async () => {
      const [row] = await productsModel.getById(id);
      expect(row).to.not.be.empty;
    });

    it('Verifica se o retorno da getById é um objeto', async () => {
      const [row] = await productsModel.getById(id);
      expect(row).to.be.a('object');
    });
  });
  describe('Verifica produto pelo nome através da função getByName', () => {
    const name = 'Escudo do Capitão América';
    before(async () => {
      const products = [
        {
          id: 3,
          name: 'Escudo do Capitão América',
          quantity: 30,
        },
      ];

      sinon.stub(connection, 'execute').resolves([products]);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('Verifica se exite um retorno de getByName', async () => {
      const [row] = await productsModel.getByName(name);
      expect(row).to.not.be.empty;
    });
    it('Verifica se o retorno é um objeto', async () => {
      const [row] = await productsModel.getByName(name);
      expect(row).to.be.a('object');
    });
  });
  describe('Adiciona um produto através da função createNewProduct', () => {
    const objEnviado = { name: 'produto', quantity: 10 };
    before(async () => {
      const retorno = {
        fieldCount: 0,
        affectedRows: 1,
        insertId: 4,
        info: "",
        serverStatus: 2,
        warningStatus: 0,
      };

      sinon.stub(connection, 'execute').resolves([retorno]);
    });

    after(async () => {
      connection.execute.restore();
    });
    it('Verifica o retorno creatNewProduct', async () => {
      const row = await productsModel.createNewProduct(objEnviado);
      expect(row).to.be.a('object');
    });
  });
  describe('Atualiza um item no banco de dados através da função update', () => {
    const objEnviado = { name: "produto", quantity: 10 };
    before(async () => {
      const retorno = {
        fieldCount: 0,
        affectedRows: 1,
        insertId: 4,
        info: "",
        serverStatus: 2,
        warningStatus: 0,
      };

      sinon.stub(connection, 'execute').resolves([retorno]);
    });

    after(async () => {
      connection.execute.restore();
    });
    it('Verifica o retorno da função update', async () => {
      const response = await productsModel.update(objEnviado);
      expect(response).to.be.an('number');
    });
  });
  describe('Deleta um item do banco de dados através da função remove', () => {
    const id = 1;
    before(async () => {
      const retorno = {
        fieldCount: 0,
        affectedRows: 1,
        insertId: 0,
        info: "",
        serverStatus: 2,
        warningStatus: 0,
      };

      sinon.stub(connection, 'execute').resolves([retorno]);
    });
    after(async () => {
      connection.execute.restore();
    });

    it('Verifica o retorno dos dados', async () => {
      const [row] = await productsModel.remove(id);
      expect(row).to.not.be.empty;
      expect(row.affectedRows).to.equals(1);
    });
  });
});
