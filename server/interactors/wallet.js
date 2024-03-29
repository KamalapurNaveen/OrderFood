async function createWallet({amountToAdd}){
    const wallet = await WalletModel.create({
        balance: amountToAdd,
        transactions: [{
            type: 'credit',
            amount: amountToAdd,
            message: `Recharged wallet with ₹${amountToAdd}`,
            time: new Date() 
        }]
    });
    return wallet
}

async function addMoneyToWallet({walletId, amount, WalletModel, message}){
    const wallet = await WalletModel.findById(walletId)
    const updatedAmount = Number(wallet.balance) + Number(amount);
    wallet.balance = updatedAmount;
    wallet.transactions.push({
        type: 'credit',
        amount: amount,
        message
    });
    await wallet.save();
}

async function rechargeWallet({wallet_id, amount, WalletModel}){
    const message =  `Recharged wallet with ₹${amount}`
    await addMoneyToWallet({walletId : wallet_id, amount, WalletModel, message})
}

async function creditWallet({walletId, amount, WalletModel, orderId}){
    const message = `Refund for cancelled order ${orderId}`
    await addMoneyToWallet({walletId, amount, WalletModel, message})
}

async function debitWallet({amount, walletId, WalletModel, createOrder}){
    const wallet = await WalletModel.findById(walletId);
    if (wallet.balance < amount) {
        return { balanceAvailable: false, message: "Insufficient balance." };
    }
    const createdOrder = await createOrder()
    wallet.balance -= amount;
    wallet.transactions.push({
        type: 'debit',
        amount: amount,
        message: `Payment for order ${createdOrder._id}`,
        orderId: createdOrder._id
    });
    await wallet.save();
    
    return { balanceAvailable: true, orderId: createdOrder._id, message: "Order placed successfully." };
}

async function getTransactions({walletId, WalletModel}){
    const wallet = await WalletModel.findById(walletId)
    return wallet
}

module.exports = {
    createWallet,
    creditWallet,
    rechargeWallet,
    debitWallet,
    getTransactions,
}