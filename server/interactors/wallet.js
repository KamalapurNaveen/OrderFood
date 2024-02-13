async function getTransactions({walletId, WalletModel}){
    const wallet = await WalletModel.findById(walletId)
    return wallet
}

module.exports = {
    getTransactions
}