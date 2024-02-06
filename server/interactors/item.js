async function getAllItems({ItemModel}){
    const items = await ItemModel.find({})
    return items
}
async function addItem({ items, ItemModel }){
    await ItemModel.create(items)
}

async function updateItem({}){}

async function deleteItem({ itemId, ItemModel}){
    await ItemModel.deleteOne({_id : itemId})
}

module.exports = {
    getAllItems,
    addItem,
    deleteItem,
}