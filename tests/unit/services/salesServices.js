const sinon = require('sinon');
const { expect } = require('chai');

const productService = require('../../../services/salesServices');
const productModel = require('../../../models/salesModel');

describe('Testando as camadas de service/models', () => {
  describe('getAll do model', () => {
    before(() => {
      const products = [
        {
          saleId: 1,
          date: '2021-09-09T04:54:29.000Z',
          productId: 1,
          quantity: 2,
        },
        {
          saleId: 1,
          date: '2021-09-09T04:54:54.000Z',
          productId: 2,
          quantity: 2,
        },
      ];
      sinon.stub(productModel, 'getAll').resolves([products]);
    });

    after(() => {
      productModel.getAll.restore();
    });

    it('Certifica o retorno de getAll', async () => {
      const retorno = await productService.getAll();
      expect(retorno).to.be.an('array');
    });
  });
  describe('Lista o produto através da getById', () => {
    const id = 1;
    before(() => {
      const products = [
        {
          saleId: 1,
          date: '2021-09-09T04:54:29.000Z',
          productId: 1,
          quantity: 2,
        },
      ];

      sinon.stub(productModel, 'getById').resolves([products]);
    });

    after(() => {
      productModel.getById.restore();
    });
    it('Return dos products getById', async () => {
      const retorno = await productService.getAll(id);
      expect(retorno).to.be.an('array');
    });
  });
  describe('Caso o produto não exista, retorna um erro', () => {
    before(() => {
      const retorno = [];
      sinon.stub(productModel, 'getById').resolves([retorno]);
    });

    after(() => {
      productModel.getById.restore();
    });
    it('Retorna um objeto com mensagem de erro', async () => {
      try {
        await productService.getAll(5);
      } catch (err) {
        expect(err.status).to.be.equals(404);
        expect(err.message).to.be.equals('Service not found');
      }
    });
  });

  describe('Testando a função add', () => {
    const produto = {
      name: 'Martelo de Thor',
      quantity: 10,
    };

    before(() => {
      const retorno = {
        saleId: 1,
        date: '2021-09-09T04:54:29.000Z',
        productId: 1,
        quantity: 2,
      };

      sinon.stub(productModel, 'addSale').resolves(retorno);
      sinon.stub(productModel, 'getById').resolves([[], []]);
    });

    after(() => {
      productModel.addSale.restore();
      productModel.getById.restore();
    });

    //   it("verifica se é objeto", async () => {
    //     const result = await productService.addSale(produto);

    //     expect(result).to.be.an('object');
    //   });

    //   it("Verifica o retorno", async () => {
    //     const result = await productService.add(produto);
    //     expect(result).to.include.all.keys("id", "name", "quantity");
    //   });
  });
  describe('Caso o produto já exista', () => {
    const produto = [
      {
        saleId: 1,
        date: '2021-09-09T04:54:29.000Z',
        productId: 1,
        quantity: 2,
      },
    ];
    before(() => {
      const retorno = {
        name: 'Martelo de Thor',
      };
      sinon.stub(productModel, 'addSale').resolves([produto]);
      sinon.stub(productModel, 'getById').resolves([retorno]);
    });

    after(() => {
      productModel.addSale.restore();
      productModel.getById.restore();
    });

    it('Retorna um objeto com mensagem de erro', async () => {
      try {
        await productService.addSale();
      } catch (error) {
        expect(error).to.be.instanceOf(Error);
      }
    });
  });
});
