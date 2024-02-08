async function getOrderInfo({id, OrderModel}){
    const order = await OrderModel.findById(id)
    console.log(order)
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

async function getOrderQueue({OrderModel}){
    const orderQueue = await OrderModel.find({ status: 'pending' }).sort({ time: 1 }).limit(20);
    return orderQueue;    
}

async function addCustomerOrder({ order, walletId,  userId, userName, OrderModel, WalletModel }) {
    const wallet = await WalletModel.findById(walletId);
    if (wallet.balance < order.cost) {
        return { balanceAvailable: false, message: "Insufficient balance." };
    }
    const createdOrder = await OrderModel.create({...order, userId, userName});
    wallet.balance -= order.cost;
    wallet.transactions.push({
        type: 'debit',
        amount: order.cost,
        message: `Payment for order ${createdOrder._id}`,
        orderId: createdOrder._id
    });
    await wallet.save();
    return { balanceAvailable: true, orderId: createdOrder._id, message: "Order placed successfully." };
}

async function cancelCustomerOrder({ orderId, walletId, WalletModel, OrderModel }) {
    const order = await OrderModel.findById(orderId);
    if (!order) {
        return { success: false, message: "Order not found." };
    }
    if (order.status === 'cancelled') {
        return { success: false, message: "Order is already cancelled." };
    }
    order.status = 'cancelled';
    const wallet = await WalletModel.findById(walletId);
    wallet.balance += order.cost;
    wallet.transactions.push({
        type: 'credit',
        amount: order.cost,
        message: `Refund for cancelled order ${order._id}`,
        orderId: order._id
    });
    await order.save();
    await wallet.save();
    return { success: true, message: "Order cancelled successfully." };

}

async function getCustomerOrderHistory({ walletId, WalletModel, OrderModel }) {
    const wallet = await WalletModel.findById(walletId);
    if (!wallet) {
        return { success: false, message: "Wallet not found." };
    }
    const orders = await OrderModel.find({ _id: { $in: wallet.transactions.map(transaction => transaction.orderId) } });
    return orders;
}

module.exports = {
    getOrderInfo,
    updateOrderInfo,
    getOrderHistory,
    getOrderQueue,
    addCustomerOrder,
    cancelCustomerOrder,
    getCustomerOrderHistory
}