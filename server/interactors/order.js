const {creditWallet, debitWallet} = require('./wallet');

async function getOrderInfo({id, OrderModel}){
    const order = await OrderModel.findById(id)
    return order
}

async function updateOrderInfo({orderInfo, OrderModel, CustomerModel, WalletModel}){
    if(orderInfo.status == 'cancelled'){
        const order = await OrderModel.findById(orderInfo._id)
        if(order.status === orderInfo.status) throw Error('Order already cancelled')
        const customer = await CustomerModel.findById(order.userId)
        const wallet   = await WalletModel.findById(customer.wallet_id)
        const transaction = wallet.transactions.find(transaction => transaction.orderId == orderInfo._id);
        wallet.balance += transaction.amount;
        wallet.transactions.push({
            type: 'credit',
            amount: transaction.amount,
            message: `Refund for order ${orderInfo._id}`,
            orderId: orderInfo._id
        });
        await wallet.save();
    }
    const order = await OrderModel.findByIdAndUpdate(orderInfo._id, { $set: orderInfo }, { new: true});
    return order
}

async function getOrderHistory({OrderModel}){
    const orderHistory = await OrderModel.find({ status: 'delivered' }).sort({ time: -1 }).limit(30);
    return orderHistory;
}

async function getOrderQueue({OrderModel}){
    const  orderQueue = await OrderModel.find({ status: 'pending' }).sort({ time: 1 });
    return orderQueue;    
}

async function getQueueStats({OrderModel, ItemModel}){
    const queue = await OrderModel.find({ status: 'pending' }).sort({ time: 1 });
    const items = queue.reduce((prev, order)=>{ return prev.concat(order.items)}, [])
    var data = {}

    items.forEach(item => {
        data[item.item] 
            ? data[item.item].quantity += item.quantity
            : data[item.item] = {name : item.name, quantity : item.quantity}
    });

    const images = await ItemModel.find({_id : {$in : Object.keys(data)}}, {image : 1})
    images.forEach(image => data[image._id].image = image.image )
    const stats = Object.values(data)
    return { queue, stats }
}

async function addCustomerOrder({ order, walletId,  userId, userName, OrderModel, WalletModel }) {
    const createOrder = async () => {
            const createdOrder = await OrderModel.create({...order, userId, userName});
            return createdOrder
    }

    const response = debitWallet({amount : order.cost, walletId, WalletModel, createOrder})
    return response;
}

async function cancelCustomerOrder({ orderId, wallet_id: walletId, WalletModel, OrderModel }) {
    const order = await OrderModel.findById(orderId);
    if (!order) {
        return { success: false, message: "Order not found." };
    }
    if (order.status === 'cancelled') {
        return { success: false, message: "Order is already cancelled." };
    }
    order.status = 'cancelled';
    await creditWallet({wallet_id: walletId, amount : order.cost, WalletModel})
    await order.save();
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
    getCustomerOrderHistory,
    getQueueStats
}