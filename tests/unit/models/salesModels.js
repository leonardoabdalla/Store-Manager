const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../db/connection');
const { getAll, getById } = require('../../../models/salesModel');

describe('Testa se o Banco de Dados faz a busca dos produtos', () => {
  describe('Caso não exista nenhum produto cadastrado', () => {
    before(async () => {
      sinon.stub(connection, 'execute').resolves([[]]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Testa se retorna um array', async () => {
      const result = await getAll();
      expect(result).to.be.an('array');
    });
    it('Testa se retorna um array vazio', async () => {
      const result = await getAll();
      expect(result).to.be.a('array');
    });
  });
  describe('Caso exista produto cadastrado', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([
        {
          id: 1,
          name: 'Martelo do Thor',
          quantity: 4,
        },
      ]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Testa se é um objeto', async () => {
      const result = await getAll();
      expect(result).to.be.an('array');
    });

    it('Testa se não está vazio', async () => {
      const result = await getAll();
      expect(result).to.not.be.empty;
    });

    it('Testa se contém as propriedades id, name, quantity', async () => {
      const result = await getAll();
      expect(result).to.be.a('array');
    });
  });
});

describe('Testa se o Banco de Dados procura o produto pelo id', () => {
  describe("Caso encontre o produto pelo id", () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([
        {
          id: 1,
          name: 'Martelo do Thor',
          quantity: 4,
        },
      ]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Testa se é um objeto', async () => {
      const [result] = await getById(1);
      expect(result).to.be.an('object');
    });

    it('Testa se não está vazio', async () => {
      const [result] = await getById(1);
      expect(result).to.not.be.empty;
    });
  });
});
