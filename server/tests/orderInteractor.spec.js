const chai = require("chai")
const { expect } = chai
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
const {
    getOrderInfo,
    updateOrderInfo,
    getOrderHistory,
    getOrderQueue,
    getQueueStats,
    addCustomerOrder,
    cancelCustomerOrder,
    getCustomerOrderHistory
} = require('../interactors/order');

describe('Order Interactors', () => {
    let OrderModelStub;
    let CustomerModelStub;
    let WalletModelStub;
    let ItemModelStub;

    beforeEach(() => {
        OrderModelStub = {
            findById: sinon.stub(),
            findByIdAndUpdate: sinon.stub(),
            find: sinon.stub(),
            create: sinon.stub()
        };
        CustomerModelStub = {
            findById: sinon.stub()
        };
        WalletModelStub = {
            findById: sinon.stub()
        };
        ItemModelStub = {
            find: sinon.stub()
        };
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('getOrderInfo', () => {
        it('should return the order if it exists', async () => {
            const orderId = 'validOrderId';
            const orderData = { _id: orderId, status: 'pending' };
            OrderModelStub.findById.withArgs(orderId).resolves(orderData);
    
            const order = await getOrderInfo({ id: orderId, OrderModel: OrderModelStub });
    
            expect(order).to.deep.equal(orderData);
        });
    
        it('should return null if order does not exist', async () => {
            const orderId = 'invalidOrderId';
            OrderModelStub.findById.withArgs(orderId).resolves(null);
    
            const order = await getOrderInfo({ id: orderId, OrderModel: OrderModelStub });
    
            expect(order).to.be.null;
        });
    
        it('should handle errors from database query', async () => {
            const orderId = 'errorOrderId';
            const errorMessage = 'Database error';
            OrderModelStub.findById.withArgs(orderId).rejects(new Error(errorMessage));
            await expect(getOrderInfo({ id: orderId, OrderModel: OrderModelStub })).to.eventually.be.rejectedWith(Error, errorMessage);
        });
    });
    

    describe('updateOrderInfo', () => {
        it('should update the status of an order to "cancelled"', async () => {
            const orderInfo = { _id: 'validOrderId', status: 'cancelled' };
            const originalOrder = { _id: 'validOrderId', status: 'pending' };
            const transaction = { amount: 10, orderId : 'validOrderId' }; 
            const customer = { wallet_id: 'walletId' }; 
        
            OrderModelStub.findById.resolves(originalOrder);
            OrderModelStub.findByIdAndUpdate.resolves({status : "cancelled"});
            CustomerModelStub.findById.resolves(customer);
            WalletModelStub.findById.resolves({ transactions: [transaction], balance: 100, save : () =>{} }); 
        
            const updatedOrder = await updateOrderInfo({
                orderInfo,
                OrderModel: OrderModelStub,
                CustomerModel: CustomerModelStub,
                WalletModel: WalletModelStub
            });
        
            expect(updatedOrder.status).to.equal('cancelled');
        });
        
    
        it('should throw an error if the order is already cancelled', async () => {
            const orderInfo = { _id: 'cancelledOrderId', status: 'cancelled' };
            const originalOrder = { _id: 'cancelledOrderId', status: 'cancelled' };
    
            OrderModelStub.findById.resolves(originalOrder);
    
            await expect(updateOrderInfo({
                orderInfo,
                OrderModel: OrderModelStub,
                CustomerModel: CustomerModelStub,
                WalletModel: WalletModelStub
            })).to.eventually.be.rejectedWith(Error, 'Order already cancelled');
        });
    
        it('should handle errors from database query', async () => {
            const orderInfo = { _id: 'errorOrderId', status: 'cancelled' };
    
            OrderModelStub.findById.rejects(new Error('Database error'));
    
            await expect(updateOrderInfo({
                orderInfo,
                OrderModel: OrderModelStub,
                CustomerModel: CustomerModelStub,
                WalletModel: WalletModelStub
            })).to.eventually.be.rejectedWith(Error, 'Database error');
        });
    });
    
    describe('getOrderHistory', () => {
        it('should return the last 30 delivered orders sorted by time', async () => {
            const mockOrderHistory = [
                { _id: 'order1', status: 'delivered', time: new Date('2024-02-18T12:00:00') },
                { _id: 'order2', status: 'delivered', time: new Date('2024-02-18T13:00:00') },
            ];
    
            const findQuery = sinon.stub().resolves(mockOrderHistory);
            const sortStub = sinon.stub().returns({ limit: sinon.stub().resolves(mockOrderHistory) });
            const OrderModelStub = { find: findQuery };
            OrderModelStub.find.returns({ sort: sortStub });
    
            const orderHistory = await getOrderHistory({ OrderModel: OrderModelStub });
    
            expect(orderHistory).to.deep.equal(mockOrderHistory);
        });
    
        it('should return an empty array if no delivered orders are found', async () => {
            const findQuery = sinon.stub().resolves([]);
            const sortStub = sinon.stub().returns({ limit: sinon.stub().resolves([]) });
            const OrderModelStub = { find: findQuery };
            OrderModelStub.find.returns({ sort: sortStub });
    
            const orderHistory = await getOrderHistory({ OrderModel: OrderModelStub });
    
            expect(orderHistory).to.be.an('array').that.is.empty;
        });
    });
    describe('getOrderQueue', () => {
        it('should return the pending order queue sorted by time', async () => {
            const mockOrderQueue = [
                { _id: 'order1', status: 'pending', time: new Date('2024-02-18T12:00:00') },
                { _id: 'order2', status: 'pending', time: new Date('2024-02-18T13:00:00') },
            ];
    
            const findQuery = sinon.stub().resolves(mockOrderQueue);
            const OrderModelStub = { find: findQuery };
            OrderModelStub.find.returns({ sort: () => mockOrderQueue });
    
            const orderQueue = await getOrderQueue({ OrderModel: OrderModelStub });
            expect(orderQueue).to.deep.equal(mockOrderQueue);
        });

        it('should return an empty array if no pending orders are found', async () => {
            const OrderModel = {
                find : function(){ return {sort  : () => []}}
            };
            const response =  await  getOrderQueue({OrderModel})
            expect(response).to.be.an('array').that.is.empty;
          });
    });
    
});

