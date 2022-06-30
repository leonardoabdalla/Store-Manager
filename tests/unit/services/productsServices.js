const sinon = require('sinon');
const { expect } = require('chai');

const productService = require('../../../services/productsService');
const productModel = require('../../../models/productsModel');

describe('Testando as camadas de service/models', () => {
  describe('getAll do model', () => {
    before(() => {
      const products = [
        {
          id: 1,
          name: 'Martelo de Thor',
        },
        {
          id: 2,
          name: 'product02',
        },
      ];
      sinon.stub(productModel, 'getAll').resolves([products]);
    });

    after(() => {
      productModel.getAll.restore();
    });

    it('Certifica o retorno de getAll', async () => {
      const retorno = await productService.getAll();
      expect(retorno).to.not.be.empty;
    });
  });
  describe('Lista o produto através da getById', () => {
    const id = 1;
    before(() => {
      const products = {
        id: 1,
        name: 'Martelo de Thor',
      };

      sinon.stub(productModel, 'getById').resolves([products]);
    });

    after(() => {
      productModel.getById.restore();
    });
    it('Return dos products getById', async () => {
      const retorno = await productService.getAll(id);
      expect(retorno).to.not.be.empty;
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
        expect(err.message).to.be.equals('Product not found');
      }
    });
  });

  // describe('Testando a função add', () => {
  //   const produto = {
  //     "name": "Martelo de Thor",
  //     "quantity": 10
  //   }

  //   before(() => {
  //     const retorno =  {
  //      "id": 1,
  //      "name": "Martelo de Thor",
  //     "quantity": 10
  //     }
  //     sinon.stub(productModel, 'createNewProduct').resolves(retorno);
  //     sinon.stub(productModel, 'getByName').resolves([[], []]);
  //   });

  //   after(() => {
  //     productModel.createNewProduct.restore();
  //     productModel.getByName.restore();
  //   });

  //   it("verifica se é objeto", async () => {
  //     const result = await productService.add(produto);

  //     expect(result).to.be.an('object');
  //   });

  //   it("Verifica o retorno", async () => {
  //     const result = await productService.add(produto);
  //     expect(result).to.include.all.keys("id", "name", "quantity");
  //   });
  // });
  describe('Caso o produto já exista', () => {
    const produto = {
      name: 'Martelo de Thor',
    };
    before(() => {
      const retorno = {
        name: 'Martelo de Thor',
      };
      sinon.stub(productModel, 'createNewProduct').resolves([produto]);
      sinon.stub(productModel, 'getByName').resolves([retorno]);
    });

    after(() => {
      productModel.createNewProduct.restore();
      productModel.getByName.restore();
    });

    it('Retorna um objeto com mensagem de erro', async () => {
      try {
        await productService.add();
      } catch (error) {
        expect(error).to.be.instanceOf(Error);
      }
    });
  });
  describe('Products Service - Atualizar produto', () => {
    before(() => {
      const MODEL_RESPONSE_BY_ID = {
        id: 1,
        name: 'Martelo de Thor',
      };
      const MODEL_RESPONSE_UPDATE = {
        id: 1,
        name: 'Martelo de Thor',
      };

      sinon
        .stub(productModel, 'getById')
        .onCall(0)
        .resolves(undefined)
        .onCall(1)
        .resolves(MODEL_RESPONSE_BY_ID)
        .onCall(2)
        .resolves(MODEL_RESPONSE_BY_ID);

      sinon.stub(productModel, 'update').resolves(MODEL_RESPONSE_UPDATE);
    });

    after(() => {
      productModel.getById.restore();
      productModel.update.restore();
    });

    describe('quando a requisição é feita corretamente', () => {
      //   it('deve retornar um objeto', async () => {
      //     const response = await productService.update([{
      //       id: 1, name: 'Martelo de Thor', quantity: 30
      //     }]);

      //     expect(response).to.be.an('array');
      //     expect(response).to.be.not.empty;
      //   });

      // it('o objeto deve conter as chaves "id", "name" e "quantity"', async () => {
      //   const response = await productService.update({
      //     id: 1,
      //     name: 'Martelo de Thor',
      //   });

      //   expect(response).to.be.an.true;
      // });
    });
  });
});
