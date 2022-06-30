const sinon = require('sinon');
const { expect } = require('chai');
const salesService = require('../../../services/salesServices');
const salesControler = require('../../../controllers/salesControler');

describe('getAll', () => {
  const response = {};
  const request = {};
  const allSales = [
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
  beforeEach(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
    sinon.stub(salesService, 'getAll').resolves(allSales);
  });

  afterEach(() => {
    salesService.getAll.restore();
  });

  it('status 200', async () => {
    await salesControler.salesGetAll(request, response);
    expect(response.status.calledWith(200)).to.be.equal(true);
  });

  it('erro', async () => {
    await salesControler.salesGetAll(request, response);
    expect(response.json.calledWith(allSales)).to.be.equal(false);
  });
});

describe('função getById', () => {
  describe('Quando o id existe', () => {
    const response = {};
    const request = {};
    const sales = [
      {
        date: '2021-09-09T04:54:29.000Z',
        productId: 1,
        quantity: 2,
      },
      {
        date: '2021-09-09T04:54:54.000Z',
        productId: 2,
        quantity: 2,
      },
    ];
    before(() => {
      request.params = { id: 1 };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(salesControler, 'salesGetId').resolves(sales);
    });

    it('status 200', async () => {
      await salesControler.salesGetId(request, response);
      expect(response.status.calledWith(200)).to.be.equal(false);
    });
  });

  describe('Quando o id não existe', () => {
    const response = {};
    const request = {};
    before(() => {
      request.params = { id: 20 };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(salesService, 'getAll').resolves([]);
    });

    after(() => {
      salesControler.salesGetId.restore();
    });

    it('status 404', async () => {
      await salesControler.salesGetId(request, response);
      expect(response.status.calledWith(404)).to.be.equal(false);
    });
  });
});
