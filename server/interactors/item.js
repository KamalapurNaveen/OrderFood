async function getAllItems({ItemModel}){
    const items = await ItemModel.find({is_available : true})
    return items
}
async function getItem({ itemId, ItemModel}){
    const item=await ItemModel.findById(itemId)
    return item;
}
async function addItem({items, imageName, imagePath, ItemModel, storage}){
    const image = await storage.uploadImage({imageName, imagePath})
    items = {...items, image}
    await ItemModel.create(items)
}
async function updateItemInfo({itemInfo, ItemModel}){
    const item = await ItemModel.findByIdAndUpdate(itemInfo._id, { $set: itemInfo }, { new: false});
    return item;
}

async function deleteItem({ itemId, ItemModel}){
    await ItemModel.deleteOne({_id : itemId})
}

async function searchItem({ query, ItemModel}){
    const items = ItemModel.aggregate(
        [
            {
              $search: {
                index: "default",
                wildcard: {
                  query: `*${query}*`,
                  path: ['name','description'],
                  allowAnalyzedField:true
                }
              }
            },
            {
                $match : {
                    is_available : true
                }
            },
        ]
    )

    return items;
}

module.exports = {
    getAllItems,
    addItem,
    getItem,
    deleteItem,
    updateItemInfo,
    searchItem,
}