async function getTransactions({walletId, WalletModel}){
    const wallet = await WalletModel.findById(walletId)
    return wallet.transactions
}

module.exports = {
    getTransactions
}