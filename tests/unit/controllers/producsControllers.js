const { expect } = require('chai');
const sinon = require('sinon');

const productController = require('../../../controllers/productsController');
const productService = require('../../../services/productsService');

const req = {};
const res = {};

const produtos = [
  {
    id: 1,
    name: 'Martelo de Thor',
    quantity: 10,
  },
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

describe('Testando a camada cntroller', () => {
  describe('getAll', () => {
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'getAll').resolves(produtos);
    });

    after(() => {
      productService.getAll.restore();
    });

    it('status 200', async () => {
      await productController.productsGetAll(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });
  describe('produto inexistente', () => {
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'getAll').resolves([[]]);
    });

    after(() => {
      productService.getAll.restore();
    });

    it('Retorna um array vazio', async () => {
      await productController.productsGetAll(req, res);
      expect(res.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });
  describe('getById', () => {
    before(() => {
      req.params = { id: 1 };
      const products = [
        {
          id: 1,
          name: 'Martelo de Thor',
          quantity: 10,
        },
      ];
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'getAll').resolves([products]);
    });

    after(() => {
      productService.getAll.restore();
    });

    it('status 200', async () => {
      await productController.productsGetId(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });
  describe('Função newProduct', () => {
    const objeto = {
      name: 'Martelo de Thor',
      quantity: 10,
    };
    before(() => {
      req.body = objeto;
      const products = {
        id: 1,
        name: 'Martelo de Thor',
        quantity: 10,
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'add').resolves(products);
    });

    after(() => {
      productService.add.restore();
    });

    it('Retorna o status 201', async () => {
      await productController.newProduct(req, res);
      expect(res.status.calledWith(201)).to.be.equal(true);
    });
  });
  describe('Testando Update', () => {
    const obj = {
      name: 'Martelo de Thor',
      quantity: 10,
    };
    const retorno = {
      id: 2,
      name: 'product2',
      quantity: 20,
    };

    before(() => {
      req.params = { id: 4 };
      req.body = obj;
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'update').resolves(retorno);
    });

    after(() => {
      productService.update.restore();
    });

    it('status 200', async () => {
      await productController.update(req, res);

      expect(res.status.calledWith(200)).to.be.true;
    });
  });

  describe('testando função remove', () => {
    const res = {};
    const req = { params: { id: 1 } };
    beforeEach(async () => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();
      res.end = sinon.stub();
      next = sinon.stub();
    });
    it('product inexistente', async () => {
      await productController.remove(req, res, next);
      // expect(next.calledWith({ message: 'Product not found', status: 404 })).to.be.true;
      // productService.remove.restore();
      // productService.getAll.restore();
    });

    //  it('encontru product', async() => {
    //    expect(res.status.calledWith(204)).to.be.false;
    //    productService.remove.restore();
    //    productService.getAll.restore()
    //  })
  });

  describe('função remove', () => {
    const res = {};
    const req = { params: { id: 1 } };
    beforeEach(async () => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();
      res.end = sinon.stub();
      next = sinon.stub();
    });
    //  it('product não existe', async() => {
    //   await productController.remove(req, res, next);
    //   expect(next.calledWith({ message: 'Product not found', status: 404 })).to.be.false;
    //   productService.remove.restore();
    //   productService.getAll.restore();
    //  })

    //  it('product OK', async() => {
    //    sinon.stub(productService, 'getAll').resolves([{productId: 1, name: 'teste', quantity: 1}]);
    //   //  sinon.stub(productService, 'remove').resolves();
    //    await productController.remove(req, res, next);
    //    expect(res.status.calledWith(204)).to.be.true;
    //    expect(res.end.calledWith()).to.be.true;
    //   //  productService.remove.restore();
    //    productService.getAll.restore()
    //  })
  });
});
