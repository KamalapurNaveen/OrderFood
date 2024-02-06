async function getOrderInfo({_id, OrderModel}){
    const order = await OrderModel.findById(_id).exec()
    return order
}

async function updateOrderInfo({orderInfo, OrderModel}){
    const order = await OrderModel.findByIdAndUpdate(orderInfo._id, { $set: orderInfo }, { new: true});
    return order
}

async function getOrderHistory({OrderModel}){
    const orderHistory = await OrderModel.find({ status: 'delivered' }).sort({ time: -1 }).limit(20);
    return orderHistory;
}

async function getOrderQueue({}){
    const orderQueue = await OrderModel.find({ status: 'pending' }).sort({ time: 1 }).limit(20);
    return orderQueue;    
}

module.exports = {
    getOrderInfo,
    updateOrderInfo,
    getOrderHistory,
    getOrderQueue,
}