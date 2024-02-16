const { expect } = require('chai');
const sinon = require('sinon');

const {
    getAllItems,
    getItem,
    addItem,
    updateItemInfo,
    deleteItem
} = require('../interactors/item'); 

describe('Item Interactor', () => {
    let ItemModelMock;
    let storageMock;

    beforeEach(() => {
        ItemModelMock = {
            find: sinon.stub(),
            findById: sinon.stub(),
            create: sinon.stub(),
            findByIdAndUpdate: sinon.stub(),
            deleteOne: sinon.stub()
        };

        storageMock = {
            uploadImage: sinon.stub()
        };
    });

    describe('getAllItems', () => {
        it('should return all items', async () => {
            const mockItems = [{ _id: '1', name: 'Item 1' }, { _id: '2', name: 'Item 2' }];
            ItemModelMock.find.resolves(mockItems);

            const items = await getAllItems({ ItemModel: ItemModelMock });
            expect(items).to.deep.equal(mockItems);
            expect(ItemModelMock.find.calledOnce).to.be.true;
        });
    });

    describe('getItem', () => {
        it('should return an item by ID', async () => {
            const mockItem = { _id: '1', name: 'Item 1' };
            ItemModelMock.findById.withArgs('1').resolves(mockItem);

            const item = await getItem({ itemId: '1', ItemModel: ItemModelMock });
            expect(item).to.deep.equal(mockItem);
            expect(ItemModelMock.findById.calledOnceWithExactly('1')).to.be.true;
        });
    });

    describe('addItem', () => {
        it('should add an item', async () => {
            const newItem = { name: 'New Item', description: 'Description', price: 10 };
            const uploadedImage = 'path/to/image.jpg';
            storageMock.uploadImage.resolves(uploadedImage);

            await addItem({ items: newItem, imageName: 'image.jpg', imagePath: 'path/to/image.jpg', ItemModel: ItemModelMock, storage: storageMock });

            expect(storageMock.uploadImage.calledOnceWithExactly({ imageName: 'image.jpg', imagePath: 'path/to/image.jpg' })).to.be.true;
            expect(ItemModelMock.create.calledOnceWithExactly({ ...newItem, image: uploadedImage })).to.be.true;
        });
    });

    describe('updateItemInfo', () => {
        it('should update item information', async () => {
            const updatedItem = { _id: '1', name: 'Updated Item', description: 'Updated Description', price: 20 };
            ItemModelMock.findByIdAndUpdate.withArgs('1', { $set: updatedItem }).resolves(updatedItem);

            const item = await updateItemInfo({ itemInfo: updatedItem, ItemModel: ItemModelMock });
            expect(item).to.deep.equal(updatedItem);
            expect(ItemModelMock.findByIdAndUpdate.calledOnceWithExactly('1', { $set: updatedItem }, { new: false })).to.be.true;
        });
    });

    describe('deleteItem', () => {
        it('should delete an item', async () => {
            await deleteItem({ itemId: '1', ItemModel: ItemModelMock });

            expect(ItemModelMock.deleteOne.calledOnceWithExactly({ _id: '1' })).to.be.true;
        });
    });
});
