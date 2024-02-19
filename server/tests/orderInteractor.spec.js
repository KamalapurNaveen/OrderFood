const { expect } = require('chai');
const sinon = require('sinon');

const { getOrderInfo, updateOrderInfo } = require('../interactors/order')

describe('Item Interactor', () => {
    let OrderModel
    let CustomerModel
    let WalletModel

    beforeEach(() => {
        OrderModel = {
            findById : sinon.stub(),
            findByIdAndUpdate : sinon.stub()
        }
    })

    afterEach(() => {
        sinon.reset()
    })

    describe('getOrderInfo', () => {
        it('should return the order', async () => {
            OrderModel.findById.resolves(null)
                const order = await getOrderInfo({
                    id : '',
                    OrderModel
                })
                if(order !== null){
                    throw new Error('unexpected order')
                }
        })
    })

    describe('updateOrderInfo', () => {
        it('should return the updated order', async () => {
            const orderInfo = {status : 'delivered'}
            OrderModel.findByIdAndUpdate.resolves(orderInfo)
            const order = await updateOrderInfo({
                orderInfo,
                OrderModel,
                CustomerModel,
                WalletModel
            })
            if (order !== orderInfo){
                throw new Error('unexpected success!')
            }
        })
    })
})