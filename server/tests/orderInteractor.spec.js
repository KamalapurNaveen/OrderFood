const { expect } = require('chai');
const sinon = require('sinon');

const { getOrderInfo, updateOrderInfo } = require('../interactors/order')

describe('Item Interactor', () => {
    let OrderModel
    let CustomerModel
    let WalletModel

    beforeEach(() => {
        OrderModel = {
            findById : sinon.stub()
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
            OrderModel.findById.resolves(null)
            const order = await updateOrderInfo({
                orderInfo : {},
                OrderModel,
                CustomerModel,
                WalletModel
            })
        })
    })
})