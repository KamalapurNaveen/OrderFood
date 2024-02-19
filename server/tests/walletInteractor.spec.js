const { expect } = require('chai');
const sinon = require('sinon');
const { getTransactions } = require('../interactors/wallet');

describe('Transaction Interactor', () => {
    let WalletModelStub;

    beforeEach(() => {
        WalletModelStub = sinon.stub();
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('getTransactions', () => {
        it('should return the wallet transactions if wallet exists', async () => {
            const walletId = 'validWalletId';
            const mockWallet = { _id: walletId, transactions: [{ id: 'transaction1', amount: 50 }, { id: 'transaction2', amount: 100 }] };
            WalletModelStub.findById = sinon.stub().resolves(mockWallet);

            const transactions = await getTransactions({ walletId, WalletModel: WalletModelStub });

            expect(transactions).to.deep.equal(mockWallet);
            expect(WalletModelStub.findById.calledOnceWith(walletId)).to.be.true;
        });

        it('should return null if wallet does not exist', async () => {
            const walletId = 'invalidWalletId';
            WalletModelStub.findById = sinon.stub().resolves(null);

            const transactions = await getTransactions({ walletId, WalletModel: WalletModelStub });

            expect(transactions).to.be.null;
            expect(WalletModelStub.findById.calledOnceWith(walletId)).to.be.true;
        });

        it('should handle errors from database query', async () => {
            const walletId = 'errorWalletId';
            const errorMessage = 'Database error';
            WalletModelStub.findById = sinon.stub().rejects(new Error(errorMessage));

            await expect(getTransactions({ walletId, WalletModel: WalletModelStub })).to.be.rejectedWith(Error, errorMessage);
            expect(WalletModelStub.findById.calledOnceWith(walletId)).to.be.true;
        });
    });
});
